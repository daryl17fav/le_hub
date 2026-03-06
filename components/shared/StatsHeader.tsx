"use client";

import React, { useEffect, useState } from 'react';
import { Star, Flame, Award, BookOpen } from 'lucide-react';
import { ProfileService } from '@/services/profileService';

interface StatsHeaderProps {
    profileId: string;
}

interface Stats {
    points: number;
    lessons_finished: number;
    streak: number;
    badges_count: number;
}

const CountUp = ({ end, duration = 1000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            setCount(Math.floor(end * percentage));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count}</span>;
};

export default function StatsHeader({ profileId }: StatsHeaderProps) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), 20000)
            );

            try {
                // Race the fetch against a 5s timeout
                const data = await Promise.race([
                    ProfileService.getProfileStats(profileId),
                    timeoutPromise
                ]) as Stats;
                
                setStats(data);
            } catch (error) {
                if (error instanceof Error && error.message === 'Timeout') {
                    console.warn("[StatsHeader] Stats fetch timed out. Falling back to zero stats.");
                } else {
                    console.error("[StatsHeader] Failed to fetch profile stats:", error);
                }
                // Fallback to empty stats instead of loading forever
                setStats({
                    points: 0,
                    lessons_finished: 0,
                    streak: 0,
                    badges_count: 0
                });
            } finally {
                setLoading(false);
            }
        };

        if (profileId) {
            fetchStats();
        }
    }, [profileId]);

    if (loading) {
        return (
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse h-32 rounded-3xl mb-8"></div>
        );
    }

    if (!stats) return null;

    const hasNoStars = stats.points === 0;

    return (
        <div className="w-full mb-8">
            {/* Main Stats Card */}
            <div className="bg-gradient-to-br from-hubPurple/5 to-hubOrange/5 border-2 border-zinc-100 rounded-3xl p-6 shadow-xl text-zinc-900 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-hubPurple/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-hubOrange/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Points / Stars */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-1">
                            <Star className="text-hubOrange fill-hubOrange animate-pulse" size={28} />
                            <span className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">
                                <CountUp end={stats.points} />
                            </span>
                        </div>
                        <p className="text-zinc-500 font-bold uppercase tracking-wider text-xs">Étoiles Collectées</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8 w-full md:w-auto">
                        <div className="flex flex-col items-center">
                            <div className="bg-hubPurple/10 p-2 rounded-xl mb-2">
                                <BookOpen size={20} className="text-hubPurple" />
                            </div>
                            <span className="text-xl font-black text-zinc-900"><CountUp end={stats.lessons_finished} /></span>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Cours</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-hubOrange/10 p-2 rounded-xl mb-2">
                                <Flame size={20} className="text-hubOrange" />
                            </div>
                            <span className="text-xl font-black text-zinc-900"><CountUp end={stats.streak} /></span>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Série</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-yellow-100 p-2 rounded-xl mb-2">
                                <Award size={20} className="text-yellow-600" />
                            </div>
                            <span className="text-xl font-black text-zinc-900"><CountUp end={stats.badges_count} /></span>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Badges</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional Empty State Message */}
            {hasNoStars && (
                <div className="mt-4 bg-hubPurple/10 border-2 border-dashed border-hubPurple/30 rounded-2xl p-4 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
                    <span className="text-2xl">✨</span>
                    <p className="font-black text-hubPurple text-center italic">
                        Commence ton premier cours !
                    </p>
                </div>
            )}
        </div>
    );
}
