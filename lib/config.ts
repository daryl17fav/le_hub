/**
 * Backend Configuration for The Hub
 * 
 * Choose either Firebase or Supabase based on your needs.
 * Uncomment the relevant section below and add your credentials.
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// Recommended for phone authentication (SMS OTP)
// 
// Setup Instructions:
// 1. Create a Firebase project at https://console.firebase.google.com
// 2. Enable Phone Authentication in Authentication > Sign-in method
// 3. Add your app's domain to authorized domains
// 4. Copy your config from Project Settings > General
// 5. Uncomment the code below and paste your config

/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Phone Auth Setup
// In your auth component, use:
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//   size: 'invisible'
// });
// const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
// await confirmationResult.confirm(code);
*/

// ============================================
// SUPABASE CONFIGURATION
// ============================================
// Alternative option for backend
//
// Setup Instructions:
// 1. Create a Supabase project at https://supabase.com
// 2. Get your URL and anon key from Project Settings > API
// 3. Uncomment the code below and paste your credentials

/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
*/

// ============================================
// FAMILY ACCOUNT STRUCTURE
// ============================================
// One phone number can have multiple profiles (family members)

export interface FamilyAccount {
    phoneNumber: string;
    verified: boolean;
    createdAt: Date;
}

export interface UserProfile {
    id: string;
    name: string;
    type: 'junior' | 'adult';
    avatarIndex: number; // 0-4 for different colors
    village: string;
    points: number;
    lessonsCompleted: number;
    createdAt: Date;
}

// Avatar color options
export const AVATAR_COLORS = [
    { bg: 'bg-purple-500', border: 'border-purple-600', name: 'Purple' },
    { bg: 'bg-orange-500', border: 'border-orange-600', name: 'Orange' },
    { bg: 'bg-blue-500', border: 'border-blue-600', name: 'Blue' },
    { bg: 'bg-green-500', border: 'border-green-600', name: 'Green' },
    { bg: 'bg-pink-500', border: 'border-pink-600', name: 'Pink' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getProfiles = async (phoneNumber: string): Promise<UserProfile[]> => {
    // TODO: Implement with Firebase or Supabase
    console.log('Getting profiles for:', phoneNumber);

    // Firebase example:
    // const profilesRef = collection(db, 'accounts', phoneNumber, 'profiles');
    // const snapshot = await getDocs(profilesRef);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));

    // For demo, return mock data
    return [];
};

export const createProfile = async (
    phoneNumber: string,
    profile: Omit<UserProfile, 'id' | 'createdAt' | 'points' | 'lessonsCompleted'>
): Promise<string> => {
    // TODO: Implement with Firebase or Supabase
    console.log('Creating profile:', { phoneNumber, profile });

    // Firebase example:
    // const profilesRef = collection(db, 'accounts', phoneNumber, 'profiles');
    // const docRef = await addDoc(profilesRef, {
    //   ...profile,
    //   points: 0,
    //   lessonsCompleted: 0,
    //   createdAt: new Date()
    // });
    // return docRef.id;

    return 'mock-profile-id';
};

export const updateProfile = async (
    phoneNumber: string,
    profileId: string,
    updates: Partial<UserProfile>
): Promise<void> => {
    // TODO: Implement with Firebase or Supabase
    console.log('Updating profile:', { phoneNumber, profileId, updates });

    // Firebase example:
    // const profileRef = doc(db, 'accounts', phoneNumber, 'profiles', profileId);
    // await updateDoc(profileRef, updates);
};

export const getProfile = async (
    phoneNumber: string,
    profileId: string
): Promise<UserProfile | null> => {
    // TODO: Implement with Firebase or Supabase
    console.log('Getting profile:', { phoneNumber, profileId });

    // Firebase example:
    // const profileRef = doc(db, 'accounts', phoneNumber, 'profiles', profileId);
    // const snapshot = await getDoc(profileRef);
    // return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as UserProfile : null;

    return null;
};

// Placeholder export
export const config = {
    backend: 'none', // Change to 'firebase' or 'supabase'
};
