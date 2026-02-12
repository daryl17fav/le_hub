"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Backpack, Smartphone } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import AddProfile from '@/components/shared/AddProfile';
import { useAuth, UserProfile } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AVATAR_COLORS = [
    { bg: 'bg-purple-500', border: 'border-purple-600' },
    { bg: 'bg-orange-500', border: 'border-orange-600' },
    { bg: 'bg-blue-500', border: 'border-blue-600' },
    { bg: 'bg-green-500', border: 'border-green-600' },
    { bg: 'bg-pink-500', border: 'border-pink-600' },
    { bg: 'bg-yellow-500', border: 'border-yellow-600' },
];

export default function SelectProfilePage() {
    const { user, profiles, addProfile, loading } = useAuth();
    const [showAddProfile, setShowAddProfile] = useState(false);
    const router = useRouter();

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    const handleAddProfile = async (newProfile: {
        name: string;
        type: 'junior' | 'adult';
        village: string;
        avatarIndex: number
    }) => {
        try {
            await addProfile({
                name: newProfile.name,
                type: newProfile.type,
                village: newProfile.village,
                avatar: `avatar-${newProfile.avatarIndex}`
            });

            setShowAddProfile(false);

            // Navigate to appropriate dashboard
            if (newProfile.type === 'junior') {
                router.push('/junior');
            } else {
                router.push('/adult');
            }
        } catch (error) {
            console.error('Error adding profile:', error);
            alert('Échec de l\'ajout du profil. Veuillez réessayer.');
        }
    };

    const navigateToProfile = (profile: UserProfile) => {
        // Store selected profile
        localStorage.setItem('currentProfile', JSON.stringify(profile));

        // Navigate based on type
        if (profile.type === 'junior') {
            router.push('/junior');
        } else {
            router.push('/adult');
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-zinc-600 dark:text-zinc-400 font-bold">Chargement...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Image */}
            {/* <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
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
                    <h1 className="text-4xl md:text-5xl font-black text-brand-purple dark:text-white mb-3">
                        {profiles.length === 0 ? 'Bienvenue !' : 'Qui apprend aujourd\'hui ?'}
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        {profiles.length === 0
                            ? 'Créez votre premier profil pour commencer'
                            : 'Sélectionnez votre profil pour continuer'}
                    </p>
                </div>

                {/* Profiles Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {/* Existing Profiles */}
                    {profiles.map((profile: UserProfile) => {
                        const avatarColor = AVATAR_COLORS[parseInt(profile.id) % AVATAR_COLORS.length];
                        const Icon = profile.type === 'junior' ? Backpack : Smartphone;

                        return (
                            <button
                                key={profile.id}
                                onClick={() => navigateToProfile(profile)}
                                className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                            >
                                {/* Avatar Circle */}
                                <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${avatarColor.bg} border-4 ${avatarColor.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon size={40} className="text-white" />
                                </div>

                                {/* Name */}
                                <p className="font-black text-xl text-brand-purple dark:text-white mb-1 truncate">
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
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                                        {profile.village}
                                    </p>
                                )}
                            </button>
                        );
                    })}

                    {/* Add Profile Button */}
                    <button
                        onClick={() => setShowAddProfile(true)}
                        className="group relative bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 hover:from-brand-purple/20 hover:to-brand-orange/20 rounded-3xl p-6 border-4 border-dashed border-brand-purple/30 hover:border-brand-purple transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white dark:bg-zinc-800 border-4 border-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus size={40} className="text-brand-purple" />
                        </div>

                        <p className="font-black text-xl text-brand-purple dark:text-white">
                            Ajouter un Membre
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Créer un nouveau profil
                        </p>
                    </button>
                </div>

                {/* Family Info */}
                <div className="text-center text-sm text-zinc-500 dark:text-zinc-600">
                    <p>Compte Familial : {user.phoneNumber}</p>
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

            {/* Add Profile Modal */}
            {showAddProfile && (
                <AddProfile
                    onComplete={handleAddProfile}
                    onCancel={() => setShowAddProfile(false)}
                />
            )}
        </div>
    );
}
