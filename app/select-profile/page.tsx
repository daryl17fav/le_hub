"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Backpack, Smartphone } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import AddProfile from '@/components/shared/AddProfile';
import { useAuth, UserProfile } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

import { AVATARS } from '@/components/shared/AvatarSelector';

export default function SelectProfilePage() {
    const { user, profiles, addProfile, setActiveProfile, loading } = useAuth();
    const [showAddProfile, setShowAddProfile] = useState(false);
    const router = useRouter();

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    // Registration State (No profiles) - Redirect to Onboarding
    useEffect(() => {
        if (!loading && user && profiles.length === 0) {
            router.push('/onboarding');
        }
    }, [profiles, loading, user, router]);

    const handleAddProfile = async (newProfile: {
        name: string;
        type: 'junior' | 'adult';
        village: string;
        avatarId: string;
    }) => {
        try {
            await addProfile(newProfile);
            setShowAddProfile(false);
        } catch (error: unknown) {
            const msg = error instanceof Error
                ? error.message
                : (error as { message?: string })?.message ?? JSON.stringify(error);
            console.error('Error adding profile:', msg, error);
            alert(`Échec de l'ajout du profil: ${msg}`);
        }
    };

    const navigateToProfile = (profile: UserProfile) => {
        setActiveProfile(profile);
        if (profile.path === 'junior' || profile.role === 'junior') {
            router.push('/junior');
        } else {
            router.push('/adult');
        }
    };

    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Chargement...</div>;
    if (!user) return null;
    if (profiles.length === 0) return null; // Avoid flicker while redirecting

    return (
        <div className="min-h-screen bg-zinc-50 bg-zinc-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Image */}
            {/* <div className="absolute inset-0 z-0 opacity-10 opacity-10">
                <Image
                    src="/images/select-profile-bg.jpg"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                />
            </div> */}

            <div className="w-full max-w-4xl relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Logo size="medium" />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-brand-purple text-zinc-900 mb-3">
                        {profiles.length === 0 ? "Bienvenue !" : "Qui apprend aujourd'hui ?"}
                    </h1>
                    <p className="text-xl text-zinc-600 text-zinc-600">
                        {profiles.length === 0
                            ? 'Créez votre premier profil pour commencer'
                            : 'Sélectionnez votre profil pour continuer'}
                    </p>
                </div>

                {/* Profiles Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {profiles.map((profile) => {
                        const isJunior = profile.path === 'junior' || profile.role === 'junior';
                        const themeColor = isJunior ? 'brand-purple' : 'brand-orange';
                        const borderColor = isJunior ? 'border-brand-purple' : 'border-brand-orange';
                        const bgColor = isJunior ? 'bg-brand-purple/20' : 'bg-brand-orange/20';
                        
                        // Find the avatar from the definition, fallback to icon if unknown
                        const roleAvatars = isJunior ? AVATARS.junior : AVATARS.adult;
                        const avatarDef = roleAvatars.find(a => a.id === profile.avatar_url);
                        const displayEmoji = avatarDef?.emoji;
                        const Icon = isJunior ? Backpack : Smartphone;

                        return (
                            <button
                                key={profile.id}
                                onClick={() => navigateToProfile(profile)}
                                className="group relative bg-white bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                            >
                                <div className={`w-32 h-32 mx-auto mb-4 rounded-full ${bgColor} border-4 ${borderColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl`}>
                                    {displayEmoji ? (
                                        <span className="text-6xl">{displayEmoji}</span>
                                    ) : (
                                        <Icon size={48} className={`text-${themeColor === 'brand-purple' ? 'brand-purple' : 'brand-orange'}`} />
                                    )}
                                </div>

                                {/* Name */}
                                <p className="font-black text-xl text-brand-purple text-zinc-900 mb-1 truncate">
                                    {profile.name}
                                </p>

                                {/* Type Badge */}
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${profile.type === 'junior'
                                    ? 'bg-brand-purple/10 text-brand-purple'
                                    : 'bg-brand-orange/10 text-brand-orange'
                                    }`}>
                                    {profile.type === 'junior' ? 'Junior' : 'Adulte'}
                                </span>

                                {/* Village */}
                                {profile.village && (
                                    <p className="text-sm text-zinc-600 text-zinc-600 mt-2">
                                        {profile.village}
                                    </p>
                                )}
                            </button>
                        )
                    })}

                    {/* Add Button */}
                    <button
                        onClick={() => setShowAddProfile(true)}
                        className="group flex flex-col items-center gap-4"
                    >
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white bg-zinc-100 border-4 border-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus size={40} className="text-brand-purple" />
                        </div>

                        <p className="font-black text-xl text-brand-purple text-zinc-900">
                            Ajouter un Membre
                        </p>
                        <p className="text-sm text-zinc-600 text-zinc-600 mt-1">
                            Créer un nouveau profil
                        </p>
                    </button>
                </div>

                {/* Family Info */}
                <div className="text-center text-sm text-zinc-500 dark:text-zinc-600">
                    <p>Compte Familial : {user.phone}</p>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            router.push('/auth');
                        }}
                        className="text-brand-purple dark:text-brand-orange hover:underline mt-2"
                    >
                        Changer de Numéro de Téléphone
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showAddProfile && (
                <AddProfile
                    onComplete={handleAddProfile}
                    onCancel={() => setShowAddProfile(false)}
                />
            )}
        </div>
    );
}
