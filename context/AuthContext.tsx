"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProfileService } from '@/services/profileService';
import { UserProfile } from '@/lib/config';
import { User, Session } from '@supabase/supabase-js';

// Re-export UserProfile for convenience
export type { UserProfile };

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    profiles: UserProfile[];
    activeProfile: UserProfile | null;
    setActiveProfile: (profile: UserProfile | null) => void;
    signInWithPhone: (phone: string) => Promise<{ user: User | null; session: Session | null; weakPassword?: unknown }>;
    verifyOtp: (phone: string, token: string) => Promise<{ user: User | null; session: Session | null }>;
    signOut: () => Promise<void>;
    addProfile: (profile: { name: string; type: 'junior' | 'adult'; village: string; avatarId: string }) => Promise<string>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    profiles: [],
    activeProfile: null,
    setActiveProfile: () => { },
    signInWithPhone: async () => ({ user: null, session: null }),
    verifyOtp: async () => ({ user: null, session: null }),
    signOut: async () => { },
    addProfile: async () => '',
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [activeProfile, setActiveProfileState] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const setActiveProfile = (profile: UserProfile | null) => {
        setActiveProfileState(profile);
        if (profile) {
            localStorage.setItem('currentProfile', JSON.stringify(profile));
        } else {
            localStorage.removeItem('currentProfile');
        }
    };

    // Load active profile from storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('currentProfile');
        if (stored) {
            try {
                setActiveProfileState(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse stored profile", e);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let lastPhone: string | null = null;

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (controller.signal.aborted) return;
                
                const currentPhone = session?.user?.phone ?? null;
                setSession(session);
                setUser(session?.user ?? null);

                // Only fetch profiles if the phone number actually changed (or first load)
                if (currentPhone && currentPhone !== lastPhone) {
                    lastPhone = currentPhone;
                    await loadProfiles(currentPhone, controller.signal);
                } else if (!currentPhone) {
                    lastPhone = null;
                    setProfiles([]);
                    setLoading(false);
                }
            }
        );

        return () => {
            controller.abort();
            subscription.unsubscribe();
        };
    }, []);

    const loadProfiles = async (phone: string, signal?: AbortSignal) => {
        try {
            const fetchedProfiles = await ProfileService.getFamilyProfiles(phone, signal);
            if (signal?.aborted) return; // don't update state for a cancelled fetch
            // Map new schema to existing UserProfile type
            const mappedProfiles: UserProfile[] = (fetchedProfiles || []).map((p: unknown) => {
                const profile = p as {
                    id: string;
                    account_id: string;
                    full_name: string;
                    role: 'junior' | 'adult';
                    villages?: { name: string } | null;
                    village_id: string;
                    points: number;
                    lessons_finished: number;
                    avatar_url: string;
                    created_at: string;
                };
                return {
                    id: profile.id,
                    account_id: profile.account_id,
                    full_name: profile.full_name,
                    path: profile.role, // Mapping role to path
                    role: profile.role,
                    village: profile.villages?.name,
                    village_id: profile.village_id,
                    points: profile.points,
                    lessons_finished: profile.lessons_finished || 0,
                    avatar_url: profile.avatar_url,
                    created_at: new Date(profile.created_at),
                    // UI compatibility
                    name: profile.full_name,
                    type: profile.role
                };
            });
            setProfiles(mappedProfiles);
        } catch (e: unknown) {
            // DOMException properties aren't enumerable – logs as {}.
            // Guard on signal.aborted first (most reliable), then fall back to
            // the name/message string check.
            const isAbortError = e instanceof Error && (e.name === 'AbortError' || e.message.includes('abort'));
            if (signal?.aborted || isAbortError) return;
            console.error("Failed to load profiles", e);
        } finally {
            if (!signal?.aborted) setLoading(false);
        }
    };

    const signInWithPhone = async (phone: string) => {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone: phone,
        });

        if (error) throw error;
        // Supabase signInWithOtp returns { data: { user: null, session: null }, error: null } usually for SMS
        // But we return data to be consistent
        return data as { user: User | null; session: Session | null; weakPassword?: unknown };
    };

    const verifyOtp = async (phone: string, token: string) => {
        const { data, error } = await supabase.auth.verifyOtp({
            phone: phone,
            token: token,
            type: 'sms',
        });

        if (error) throw error;

        // Proactive Account Sync: Ensure the phone number exists in the public.accounts table
        // immediately after verification. This prevents "ghost" users.
        if (data.user?.phone) {
            await supabase.from('accounts').upsert({ phone_number: data.user.phone });
        }

        return data as { user: User | null; session: Session | null };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        // State updates will be handled by onAuthStateChange
    };

    const addProfileWrapper = async (profile: { name: string; type: 'junior' | 'adult'; village: string; avatarId: string }) => {
        if (!user?.phone) throw new Error("User not authenticated");

        // profile.village is already a UUID — AddProfile sets value={v.id} on the select
        const newProfile = await ProfileService.registerProfile(
            user.phone,
            profile.name,
            profile.type,
            profile.village,
            profile.avatarId
        );

        await loadProfiles(user.phone);
        return newProfile.id;
    };

    return (
        <AuthContext.Provider value={{
            user,
            session,
            loading,
            profiles,
            activeProfile,
            setActiveProfile,
            signInWithPhone,
            verifyOtp,
            signOut,
            addProfile: addProfileWrapper
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
