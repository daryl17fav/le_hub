"use client";

import React, { useState, useEffect } from 'react';
import Logo from '@/components/shared/Logo';
import AddProfile from '@/components/shared/AddProfile';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const { user, profiles, addProfile, loading } = useAuth();
    const router = useRouter();

    // Protection: If profiles exist, go to select-profile
    useEffect(() => {
        if (!loading && user && profiles.length > 0) {
            router.push('/select-profile');
        }
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, profiles, loading, router]);

    const handleOnboardingComplete = async (newProfile: {
        name: string;
        type: 'junior' | 'adult';
        village: string;
        avatarId: string
    }) => {
        console.log('[Onboarding] Completion triggered with:', newProfile);
        try {
            const profileId = await addProfile({
                name: newProfile.name,
                type: newProfile.type,
                village: newProfile.village,
                avatarId: newProfile.avatarId // <--- Pass the avatarId string directly
            });
            console.log('[Onboarding] Profile created successfully:', profileId);
            
            // Success redirect
            router.push(newProfile.type === 'junior' ? '/junior' : '/adult');
        } catch (error: any) {
            console.error('[Onboarding] Error during profile creation:', error);
            alert(`Erreur: ${error.message || 'Échec de la création du profil. Réessayez.'}`);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-zinc-600 font-bold">Préparation de votre accueil...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 bg-[url('/images/pattern-bg.png')] bg-repeat">
            <div className="w-full max-w-4xl text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-center mb-8">
                    <Logo size="large" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-brand-purple mb-4">
                    Bienvenue dans la Famille !
                </h1>
                <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                    Le Hub est un espace d&apos;apprentissage pour tout le monde.
                    Commençons par créer votre premier profil.
                </p>
            </div>

            {/* Forced Add Profile flow for first-time users */}
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-500">
                <AddProfile
                    onComplete={handleOnboardingComplete}
                    onCancel={() => router.push('/auth')} // Back to auth if they cancel the only way forward
                />
            </div>

            <p className="mt-8 text-zinc-400 text-sm">
                Vous pourrez ajouter d&apos;autres membres de la famille plus tard.
            </p>
        </div>
    );
}
