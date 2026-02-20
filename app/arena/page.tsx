"use client";

import React from 'react';
import { Medal } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import VillageMap from '@/components/shared/VillageMap';
import LiveTicker from '@/components/shared/LiveTicker';

export default function ArenaPage() {
    const leaderboard = [
        { rank: 1, name: 'Amina K.', village: 'Kano Village', points: 2450, avatar: '👩🏾', badge: '👑' },
        { rank: 2, name: 'Chidi O.', village: 'Lagos Hub', points: 2380, avatar: '👨🏿', badge: '🥈' },
        { rank: 3, name: 'Fatima M.', village: 'Abuja Center', points: 2210, avatar: '👩🏽', badge: '🥉' },
        { rank: 4, name: 'Emeka N.', village: 'Port Harcourt', points: 2100, avatar: '👨🏾', badge: '⭐' },
        { rank: 5, name: 'Aisha B.', village: 'Kaduna Hub', points: 2050, avatar: '👩🏿', badge: '⭐' },
        { rank: 6, name: 'Yusuf A.', village: 'Kano Village', points: 1980, avatar: '👨🏽', badge: '⭐' },
        { rank: 7, name: 'Ngozi P.', village: 'Enugu Hub', points: 1920, avatar: '👩🏾', badge: '⭐' },
        { rank: 8, name: 'Ibrahim S.', village: 'Sokoto Center', points: 1850, avatar: '👨🏿', badge: '⭐' },
        { rank: 9, name: 'Blessing C.', village: 'Calabar Hub', points: 1790, avatar: '👩🏽', badge: '⭐' },
        { rank: 10, name: 'Musa D.', village: 'Jos Center', points: 1720, avatar: '👨🏾', badge: '⭐' },
    ];

    return (
        <>
            <TopNav activeRoute="/arena" />

            <main className="min-h-screen bg-zinc-50 bg-zinc-50 pb-32 md:pb-24">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-black text-brand-purple text-zinc-900 mb-2">
                            Compétitions de Village
                        </h1>
                        <p className="text-xl text-zinc-600 text-zinc-600">
                            Compétition et Apprentissage Ensemble
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Map Section - Takes 2 columns on desktop */}
                        <div className="lg:col-span-2">
                            <VillageMap />

                            {/* Your Rank Card - Below map on mobile, stays with map on desktop */}
                            <div className="mt-6 bg-gradient-to-br from-brand-purple to-brand-orange rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between text-white">
                                    <div>
                                        <p className="text-sm font-bold opacity-90">Votre Rang</p>
                                        <p className="text-5xl font-black">#12</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold opacity-90">Vos Points</p>
                                        <p className="text-5xl font-black">1,850</p>
                                    </div>
                                    <div className="text-6xl opacity-50">⚡</div>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard Panel - Side panel on desktop, below on mobile */}
                        <div className="lg:col-span-1">
                            <div className="bg-white bg-white rounded-3xl p-6 shadow-2xl sticky top-24">
                                <h2 className="text-2xl font-black text-brand-purple text-zinc-900 mb-6 flex items-center gap-2">
                                    <Medal size={28} className="text-brand-orange" />
                                    Top 10 des Apprenants
                                </h2>

                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {leaderboard.map((user) => (
                                        <div
                                            key={user.rank}
                                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${user.rank <= 3
                                                ? 'bg-gradient-to-r from-brand-purple/10 to-brand-orange/10 border-2 border-brand-purple'
                                                : 'bg-zinc-100 bg-zinc-100 hover:bg-zinc-200 hover:bg-zinc-700'
                                                }`}
                                        >
                                            {/* Rank */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-purple text-white font-black text-lg flex-shrink-0">
                                                {user.rank}
                                            </div>

                                            {/* Avatar & Badge */}
                                            <div className="relative flex-shrink-0">
                                                <div className="text-3xl">{user.avatar}</div>
                                                <div className="absolute -top-1 -right-1 text-lg">{user.badge}</div>
                                            </div>

                                            {/* User Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-brand-purple text-zinc-900 truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-zinc-600 text-zinc-600 truncate">
                                                    {user.village}
                                                </p>
                                            </div>

                                            {/* Points */}
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-black text-xl text-brand-orange">
                                                    {user.points.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-zinc-600 text-zinc-600">pts</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Challenges Section */}
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-black text-brand-purple text-zinc-900 mb-4">
                                🔥 Défis Hebdomadaires
                            </h3>
                            <p className="text-zinc-600 text-zinc-600 mb-4">
                                Complétez 5 leçons cette semaine pour gagner des points bonus !
                            </p>
                            <div className="bg-zinc-100 bg-zinc-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-brand-orange h-full" style={{ width: '60%' }} />
                            </div>
                            <p className="text-sm text-zinc-600 text-zinc-600 mt-2">3/5 Leçons</p>
                        </div>

                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-black text-brand-purple text-zinc-900 mb-4">
                                ⚡ Tour Rapide
                            </h3>
                            <p className="text-zinc-600 text-zinc-600 mb-4">
                                Répondez à 10 questions en moins de 2 minutes !
                            </p>
                            <button
                                className="w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-brand-orange/90 transition-colors shadow-lg shadow-brand-orange/30"
                                onClick={() => window.location.href = '/lesson'}
                            >
                                Commencer le Défi
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <LiveTicker />
            <BottomNav activeRoute="/arena" />
        </>
    );
}
