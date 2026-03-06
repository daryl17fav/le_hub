"use client";

import React, { useEffect, useState } from 'react';
import { Backpack, BookOpen, Star, TrendingUp } from 'lucide-react';
import Button from '@/components/shared/Button';
import BottomNav from '@/components/layout/BottomNav';
import StatsHeader from '@/components/shared/StatsHeader';
import TopNav from '@/components/layout/TopNav';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function JuniorDashboard() {
    const { activeProfile: authProfile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [localProfile, setLocalProfile] = useState<any>(null);
    const [localLoading, setLocalLoading] = useState(true);
    const activeProfile = localProfile || authProfile;

    const [lessons, setLessons] = useState([
        { id: 1, title: 'S\'amuser avec les Chiffres', progress: 0, icon: '🔢', available: true, skill: 'math_chiffres_101' },
        { id: 2, title: 'Aventures de Lecture', progress: 0, icon: '📚', available: true, skill: 'reading_adventure' },
        { id: 3, title: 'Explorateurs Scientifiques', progress: 0, icon: '🔬', available: true, skill: 'science_explorers' },
    ]);
    const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());

    // Fetch progress from DB only (no localStorage cache)
    useEffect(() => {
        const fetchProgress = async () => {
            if (!activeProfile?.id) return;

            try {
                const { data, error } = await supabase
                    .from('lesson_progress')
                    .select('lesson_id')
                    .eq('profile_id', activeProfile.id);

                if (error) {
                    console.error('[JuniorDashboard] DB Error:', error.message, error.hint || '');
                    return;
                }

                if (data) {
                    const ids = new Set<string>(data.map((item: any) => String(item.lesson_id).trim()));
                    setCompletedLessonIds(ids);
                }
            } catch (err: any) {
                console.error('[JuniorDashboard] Fetch Exception:', err.message || err);
            }
        };
        fetchProgress();
    }, [activeProfile?.id]);

    const calculateProgress = (lessonId: string) => {
        // Normalize search ID
        const searchId = String(lessonId).trim();
        
        // Smart Logic: Check for direct match or legacy/test IDs
        const isCompleted = completedLessonIds.has(searchId) || 
                          (searchId === 'math_chiffres_101' && (completedLessonIds.has('math_101') || completedLessonIds.has('math_junior_test')));
        
        return isCompleted ? 100 : 0;
    };

    // Robust Profile Loading & Timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (localLoading) {
                console.warn("[Dashboard] Loading timed out after 5s, falling back.");
                setLocalLoading(false);
            }
        }, 5000);

        // 1. Check Context first
        if (authProfile) {
            setLocalProfile(authProfile);
            setLocalLoading(false);
            clearTimeout(timeout);
        } 
        // 2. Check LocalStorage if context is still loading
        else if (!authLoading) {
            const stored = localStorage.getItem('currentProfile');
            if (stored) {
                try {
                    setLocalProfile(JSON.parse(stored));
                } catch (e) {
                    console.error("Failed to parse stored profile", e);
                }
            }
            setLocalLoading(false);
            clearTimeout(timeout);
        }

        return () => clearTimeout(timeout);
    }, [authProfile, authLoading]);

    // Redirect if definitely no profile
    useEffect(() => {
        if (!localLoading && !localProfile && !authLoading) {
            router.push('/select-profile');
        }
    }, [localProfile, localLoading, authLoading, router]);

    const handleLessonStart = (lesson: any) => {
        if (lesson.available) {
            router.push(`/lesson?skill=${lesson.skill}`);
        }
    };

    if (localLoading && authLoading && !localProfile) {
        return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-brand-purple font-bold">Chargement...</div>;
    }

    if (!activeProfile) return null;

    return (
        <>
            <TopNav activeRoute="/junior" />

            <main className="min-h-screen bg-zinc-50 p-6 pb-24 md:pb-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-brand-purple to-brand-orange rounded-2xl p-4">
                                <Backpack size={48} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-brand-purple text-zinc-900">
                                    École Junior
                                </h1>
                                <p className="text-lg text-zinc-600">
                                    Bienvenue, {activeProfile.name || activeProfile.full_name} ! 🎉
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <StatsHeader profileId={activeProfile.id} />

                    {/* Lessons */}
                    <h2 className="text-2xl font-black text-brand-purple text-zinc-900 mb-4">
                        Vos Leçons
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`bg-white rounded-2xl p-6 shadow-lg transition-all ${lesson.available
                                    ? 'hover:shadow-xl cursor-pointer hover:scale-[1.02]'
                                    : 'opacity-60 cursor-not-allowed'
                                    }`}
                                onClick={() => handleLessonStart(lesson)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{lesson.icon}</div>
                                    {!lesson.available && (
                                        <span className="px-3 py-1 bg-zinc-200 text-zinc-600 text-xs font-bold rounded-full">
                                            Bientôt
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-brand-purple text-zinc-900 mb-2">
                                    {lesson.title}
                                </h3>
                                <div className="mb-4">
                                    <div className="bg-zinc-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-brand-purple to-brand-orange h-full transition-all duration-1000"
                                            style={{ width: `${calculateProgress(lesson.skill)}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-zinc-600 mt-2">
                                        {calculateProgress(lesson.skill)}% Terminé
                                    </p>
                                </div>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLessonStart(lesson);
                                    }}
                                    disabled={!lesson.available}
                                >
                                    {lesson.available ? 'Continuer' : 'Bientôt disponible'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav activeRoute="/junior" />
        </>
    );
}
