"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
    onAuthStateChanged,
    User,
    ConfirmationResult
} from 'firebase/auth';
import {
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Define the shape of a user profile
export interface UserProfile {
    id: string;
    name: string;
    type: 'junior' | 'adult';
    village?: string | null;
    avatar?: string | null;
    createdAt: string;
}

// Define the shape of the context value
interface AuthContextType {
    user: User | null;
    profiles: UserProfile[];
    loading: boolean;
    signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
    confirmOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<User>;
    addProfile: (profileData: { name: string; type: 'junior' | 'adult'; village?: string; avatar?: string }) => Promise<UserProfile>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profiles: [],
    loading: true,
    signInWithPhone: async () => { throw new Error("Not implemented"); },
    confirmOtp: async () => { throw new Error("Not implemented"); },
    addProfile: async () => { throw new Error("Not implemented"); },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

interface FirebaseAuthProviderProps {
    children: ReactNode;
}

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier | null;
    }
}

export function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                try {
                    // Fetch user's profiles from Firestore
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setProfiles(userDoc.data().profiles || []);
                    } else {
                        // Create new user document if it doesn't exist
                        await setDoc(userDocRef, {
                            phoneNumber: firebaseUser.phoneNumber,
                            profiles: [],
                            createdAt: new Date().toISOString()
                        });
                        setProfiles([]);
                    }
                } catch (error) {
                    console.error('Firestore error:', error);
                    // If Firestore is offline or has permission issues, just set empty profiles
                    setProfiles([]);
                }
            } else {
                setUser(null);
                setProfiles([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Initialize reCAPTCHA verifier
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again
                    console.log('reCAPTCHA expired');
                }
            });
        }
    };

    // Send SMS code to phone number
    const signInWithPhone = async (phoneNumber: string) => {
        try {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;

            if (!appVerifier) {
                throw new Error("Recaptcha verifier not initialized");
            }

            // Make sure phone number includes country code (e.g., +229)
            const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);

            console.log('SMS sent successfully');
            return confirmationResult;
        } catch (error) {
            console.error('Error sending SMS:', error);

            // Reset reCAPTCHA on error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }

            throw error;
        }
    };

    // Verify OTP code
    const confirmOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
        try {
            const result = await confirmationResult.confirm(otp);
            console.log('User signed in successfully:', result.user);
            return result.user;
        } catch (error) {
            console.error('Error verifying OTP:', error);
            throw error;
        }
    };

    // Add a new profile to the family account
    const addProfile = async (profileData: { name: string; type: 'junior' | 'adult'; village?: string; avatar?: string }) => {
        if (!user) {
            throw new Error('User must be logged in to add a profile');
        }

        try {
            const userDocRef = doc(db, 'users', user.uid);
            const newProfile: UserProfile = {
                id: Date.now().toString(), // Simple ID generation
                name: profileData.name,
                type: profileData.type, // 'junior' or 'adult'
                village: profileData.village || null,
                avatar: profileData.avatar || null,
                createdAt: new Date().toISOString()
            };

            // Get current profiles or create new array
            const currentProfiles = [...profiles, newProfile];

            // Use setDoc with merge to create document if it doesn't exist
            await setDoc(userDocRef, {
                phoneNumber: user.phoneNumber,
                profiles: currentProfiles,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setProfiles(currentProfiles);
            return newProfile;
        } catch (error: unknown) {
            console.error('Error adding profile:', error);

            // If Firestore is offline, still update local state
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const e = error as any;
            if (e.code === 'unavailable' || e.message?.includes('offline')) {
                const newProfile: UserProfile = {
                    id: Date.now().toString(),
                    name: profileData.name,
                    type: profileData.type,
                    village: profileData.village || null,
                    avatar: profileData.avatar || null,
                    createdAt: new Date().toISOString()
                };
                setProfiles(prev => [...prev, newProfile]);
                console.warn('Profile added locally, will sync when online');
                return newProfile;
            }

            throw error;
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setProfiles([]);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value = {
        user,
        profiles,
        loading,
        signInWithPhone,
        confirmOtp,
        addProfile,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
