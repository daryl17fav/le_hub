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
    signInWithPhone: (phone: string) => Promise<{ user: User | null; session: Session | null; weakPassword?: any }>;
    verifyOtp: (phone: string, token: string) => Promise<{ user: User | null; session: Session | null }>;
    signOut: () => Promise<void>;
    addProfile: (profile: { name: string; type: 'junior' | 'adult'; village: string; avatarIndex: number }) => Promise<string>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    profiles: [],
    signInWithPhone: async () => ({ user: null, session: null }),
    verifyOtp: async () => ({ user: null, session: null }),
    signOut: async () => { },
    addProfile: async () => '',
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // AbortController lets us cancel the in-flight fetch when React 18
        // Strict Mode unmounts + remounts the component (or when the effect
        // re-runs). Without this, the first cancelled fetch throws an
        // unhandled AbortError in the console.
        const controller = new AbortController();

        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (controller.signal.aborted) return; // stale run – bail out
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user?.phone) {
                    await loadProfiles(session.user.phone, controller.signal);
                }
            } catch (error: any) {
                if (error?.name === 'AbortError') return; // expected – ignore
                console.error("Error getting session:", error);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (controller.signal.aborted) return;
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user?.phone) {
                    await loadProfiles(session.user.phone, controller.signal);
                } else {
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
            const mappedProfiles: UserProfile[] = (fetchedProfiles || []).map((p: any) => ({
                id: p.id,
                account_id: p.account_id,
                full_name: p.full_name,
                path: p.role, // Mapping role to path
                role: p.role,
                village: p.villages?.name,
                village_id: p.village_id,
                points: p.points,
                avatar_url: p.avatar_url,
                created_at: new Date(p.created_at),
                // UI compatibility
                name: p.full_name,
                type: p.role
            }));
            setProfiles(mappedProfiles);
        } catch (e: any) {
            // DOMException properties aren't enumerable – logs as {}.
            // Guard on signal.aborted first (most reliable), then fall back to
            // the name/message string check.
            if (signal?.aborted || e?.name === 'AbortError' || e?.message?.includes('abort')) return;
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
        return data as { user: User | null; session: Session | null; weakPassword?: any };
    };

    const verifyOtp = async (phone: string, token: string) => {
        const { data, error } = await supabase.auth.verifyOtp({
            phone: phone,
            token: token,
            type: 'sms',
        });

        if (error) throw error;
        return data as { user: User | null; session: Session | null };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        // State updates will be handled by onAuthStateChange
    };

    const addProfileWrapper = async (profile: { name: string; type: 'junior' | 'adult'; village: string; avatarIndex: number }) => {
        if (!user?.phone) throw new Error("User not authenticated");

        // profile.village is already a UUID — AddProfile sets value={v.id} on the select
        const newProfile = await ProfileService.registerProfile(
            user.phone,
            profile.name,
            profile.type,
            profile.village
        );

        await loadProfiles(user.phone);
        return newProfile.id;
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, profiles, signInWithPhone, verifyOtp, signOut, addProfile: addProfileWrapper }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
