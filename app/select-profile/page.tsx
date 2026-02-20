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
            await addProfile(newProfile);
            setShowAddProfile(false);
        } catch (error) {
            console.error('Error adding profile:', error);
            alert('Échec de l\'ajout du profil. Veuillez réessayer.');
        }
    };

    const navigateToProfile = (profile: UserProfile) => {
        localStorage.setItem('currentProfile', JSON.stringify(profile));
        if (profile.path === 'junior' || (profile as any).role === 'junior') {
            router.push('/junior');
        } else {
            router.push('/adult');
        }
    };

    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Chargement...</div>;
    if (!user) return null;

    // Registration State (No profiles)
    if (profiles.length === 0 && !showAddProfile) {
        // Auto-show add profile or show a landing state that leads to it
        // Prompt says: "If no profiles exist, show a form with..."
        // We can use the AddProfile component directly or trigger it.
        // Let's render a welcome screen that allows adding.
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                <Logo size="medium" />
                <h1 className="text-4xl font-black text-white mt-8 mb-4">Bienvenue sur The Hub</h1>
                <p className="text-zinc-400 mb-8 max-w-md">Commencez par ajouter votre premier membre de la famille.</p>
                <button
                    onClick={() => setShowAddProfile(true)}
                    className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all"
                >
                    Créer un Profil
                </button>

                {/* Add Profile Modal */}
                {showAddProfile && (
                    <AddProfile
                        onComplete={handleAddProfile}
                        onCancel={() => setShowAddProfile(false)}
                    />
                )}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center p-6">
            <div className="w-full max-w-5xl mt-8">
                <div className="flex justify-between items-center mb-12">
                    <Logo size="small" />
                    <button onClick={() => { localStorage.clear(); router.push('/auth'); }} className="text-sm text-zinc-500 hover:text-white">
                        Déconnexion ({user.phone})
                    </button>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-12">
                    Qui est-ce ?
                </h1>

                {/* Profiles Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {profiles.map((profile) => {
                        const isJunior = profile.path === 'junior' || (profile as any).role === 'junior';
                        const themeColor = isJunior ? 'brand-purple' : 'brand-orange';
                        const borderColor = isJunior ? 'border-brand-purple' : 'border-brand-orange';
                        const bgColor = isJunior ? 'bg-brand-purple/20' : 'bg-brand-orange/20';
                        const Icon = isJunior ? Backpack : Smartphone;

                        return (
                            <button
                                key={profile.id}
                                onClick={() => navigateToProfile(profile)}
                                className="group flex flex-col items-center gap-4"
                            >
                                <div className={`w-32 h-32 rounded-full ${bgColor} border-4 ${borderColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl`}>
                                    {/* Use Avatar or Icon */}
                                    <Icon size={48} className={`text-${themeColor === 'brand-purple' ? 'brand-purple' : 'brand-orange'}`} />
                                </div>
                                <span className={`text-xl font-bold text-white group-hover:text-${themeColor === 'brand-purple' ? 'brand-purple' : 'brand-orange'} transition-colors`}>
                                    {profile.full_name || (profile as any).name}
                                </span>
                            </button>
                        )
                    })}

                    {/* Add Button */}
                    <button
                        onClick={() => setShowAddProfile(true)}
                        className="group flex flex-col items-center gap-4"
                    >
                        <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-dashed border-zinc-700 flex items-center justify-center group-hover:border-white transition-all">
                            <Plus size={48} className="text-zinc-500 group-hover:text-white" />
                        </div>
                        <span className="text-xl font-bold text-zinc-500 group-hover:text-white transition-colors">
                            Ajouter
                        </span>
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
