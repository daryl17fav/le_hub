"use client";

import React, { useEffect, useState } from 'react';
import { Medal, Loader2 } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import VillageMap from '@/components/shared/VillageMap';
import LiveTicker from '@/components/shared/LiveTicker';
import { Village, VillageService } from '@/services/villageService';
import { useAuth } from '@/context/AuthContext';

export default function ArenaPage() {
    const { activeProfile } = useAuth();
    const [villages, setVillages] = useState<Village[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVillages = async () => {
            try {
                const data = await VillageService.getVillages();
                setVillages(data);
            } catch (error) {
                console.error("Failed to fetch villages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVillages();
    }, []);

    const leaderboard = [
        { rank: 1, name: 'Amina K.', village: 'Kano Village', points: 2450, avatar: '👩🏾', badge: '👑' },
        { rank: 2, name: 'Chidi O.', village: 'Lagos Hub', points: 2380, avatar: '👨🏿', badge: '🥈' },
        { rank: 3, name: 'Fatima M.', village: 'Abuja Center', points: 2210, avatar: '👩🏽', badge: '🥉' },
        { rank: 4, name: 'Emeka N.', village: 'Port Harcourt', points: 2100, avatar: '👨🏾', badge: '⭐' },
        { rank: 5, name: 'Aisha B.', village: 'Kaduna Hub', points: 2050, avatar: '👩🏿', badge: '⭐' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-brand-purple mb-4" size={48} />
                <p className="text-zinc-600 font-bold">Chargement de l&apos;arène...</p>
            </div>
        );
    }

    const leadVillage = villages[0] || null;

    return (
        <>
            <TopNav activeRoute="/arena" />

            <main className="min-h-screen bg-zinc-50 pb-32 md:pb-24">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-black text-brand-purple mb-2">
                            Compétitions de Village
                        </h1>
                        <p className="text-xl text-zinc-600">
                            Compétition et Apprentissage Ensemble
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Map Section - Takes 2 columns on desktop */}
                        <div className="lg:col-span-2">
                            <VillageMap villages={villages} />

                            {/* Your Rank Card */}
                            <div className="mt-6 bg-gradient-to-br from-brand-purple to-brand-orange rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between text-white">
                                    <div>
                                        <p className="text-sm font-bold opacity-90">Votre Rang</p>
                                        <p className="text-5xl font-black">#--</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold opacity-90">Vos Points</p>
                                        <p className="text-5xl font-black">{activeProfile?.points?.toLocaleString() || 0}</p>
                                    </div>
                                    <div className="text-6xl opacity-50">⚡</div>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-6 shadow-2xl sticky top-24">
                                <h2 className="text-2xl font-black text-brand-purple mb-6 flex items-center gap-2">
                                    <Medal size={28} className="text-brand-orange" />
                                    Top des Villages
                                </h2>

                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {villages.map((village, index) => (
                                        <div
                                            key={village.id}
                                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${index < 3
                                                ? 'bg-gradient-to-r from-brand-purple/10 to-brand-orange/10 border-2 border-brand-purple/30'
                                                : 'bg-zinc-100 hover:bg-zinc-200'
                                                }`}
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-purple text-white font-black text-lg flex-shrink-0">
                                                {index + 1}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-brand-purple truncate">
                                                    {village.name}
                                                </p>
                                                <p className="text-xs text-zinc-500 truncate">
                                                    {village.student_count} étudiants
                                                </p>
                                            </div>

                                            <div className="text-right flex-shrink-0">
                                                <p className="font-black text-xl text-brand-orange">
                                                    {village.total_points.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-zinc-500">pts</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Challenges Section */}
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-black text-brand-purple mb-4">
                                🔥 Défis Hebdomadaires
                            </h3>
                            <p className="text-zinc-600 mb-4">
                                Complétez 5 leçons cette semaine pour gagner des points bonus !
                            </p>
                            <div className="bg-zinc-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-brand-orange h-full" style={{ width: '60%' }} />
                            </div>
                            <p className="text-sm text-zinc-500 mt-2">3/5 Leçons</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-black text-brand-purple mb-4">
                                ⚡ Tour Rapide
                            </h3>
                            <p className="text-zinc-600 mb-4">
                                Répondez à 10 questions en moins de 2 minutes !
                            </p>
                            <button
                                className="w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-brand-orange/90 transition-colors shadow-lg"
                                onClick={() => window.location.href = '/lesson'}
                            >
                                Commencer le Défi
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <LiveTicker leader={leadVillage} />
            <BottomNav activeRoute="/arena" />
        </>
    );
}
