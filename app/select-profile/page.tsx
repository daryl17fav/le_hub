"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Backpack, Smartphone } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import AddProfile from '@/components/shared/AddProfile';
import { UserProfile, AVATAR_COLORS, getProfiles, createProfile } from '@/lib/config';

export default function SelectProfilePage() {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [showAddProfile, setShowAddProfile] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        // Get phone number from session/localStorage
        const phone = localStorage.getItem('phoneNumber') || '+2348012345678';
        setPhoneNumber(phone);

        // Load profiles
        loadProfiles(phone);
    }, []);

    const loadProfiles = async (phone: string) => {
        const userProfiles = await getProfiles(phone);
        setProfiles(userProfiles);
    };

    const handleAddProfile = async (newProfile: {
        name: string;
        type: 'junior' | 'adult';
        village: string;
        avatarIndex: number
    }) => {
        // Create profile in database
        const profileId = await createProfile(phoneNumber, newProfile);

        // Add to local state
        const profile: UserProfile = {
            id: profileId,
            ...newProfile,
            points: 0,
            lessonsCompleted: 0,
            createdAt: new Date(),
        };

        setProfiles([...profiles, profile]);
        setShowAddProfile(false);

        // Navigate to appropriate dashboard
        navigateToProfile(profile);
    };

    const navigateToProfile = (profile: UserProfile) => {
        // Store selected profile
        localStorage.setItem('currentProfile', JSON.stringify(profile));

        // Navigate based on type
        if (profile.type === 'junior') {
            window.location.href = '/junior';
        } else {
            window.location.href = '/adult';
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
                <img
                    src="/images/select-profile-bg.jpg"
                    alt="Background Pattern"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full max-w-4xl relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Logo size="medium" />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-brand-purple dark:text-white mb-3">
                        Who is learning today?
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        Select your profile to continue
                    </p>
                </div>

                {/* Profiles Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {/* Existing Profiles */}
                    {profiles.map((profile) => {
                        const avatarColor = AVATAR_COLORS[profile.avatarIndex];
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
                                    {profile.type === 'junior' ? 'Junior' : 'Adult'}
                                </span>

                                {/* Points */}
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                                    {profile.points} points
                                </p>
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
                            Add Member
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Create new profile
                        </p>
                    </button>
                </div>

                {/* Family Info */}
                <div className="text-center text-sm text-zinc-500 dark:text-zinc-600">
                    <p>Family Account: {phoneNumber}</p>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/auth';
                        }}
                        className="text-brand-purple dark:text-brand-orange hover:underline mt-2"
                    >
                        Switch Phone Number
                    </button>
                </div>
            </div>

            {/* Add Profile Modal */}
            {showAddProfile && (
                <AddProfile
                    phoneNumber={phoneNumber}
                    onComplete={handleAddProfile}
                    onCancel={() => setShowAddProfile(false)}
                />
            )}
        </div>
    );
}
