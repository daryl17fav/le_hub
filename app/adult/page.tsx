"use client";

import React, { useEffect, useState } from 'react';
import { Smartphone, Briefcase, TrendingUp, Award } from 'lucide-react';
import Button from '@/components/shared/Button';
import BottomNav from '@/components/layout/BottomNav';
import StatsHeader from '@/components/shared/StatsHeader';
import TopNav from '@/components/layout/TopNav';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdultDashboard() {
    const { activeProfile: authProfile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [localProfile, setLocalProfile] = useState<any>(null);
    const [localLoading, setLocalLoading] = useState(true);
    const activeProfile = localProfile || authProfile;

    const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());

    const courses = [
        { id: 1, title: 'Bases du Numérique', description: 'Maîtrisez les outils digitaux essentiels.', progress: 0, category: 'Technologie', icon: '💻', skill: 'digital_literacy_101' },
        { id: 2, title: 'Finances Personnelles', description: 'Gérez votre budget et vos économies.', progress: 0, category: 'Affaires', icon: '💰', skill: 'finance_101' },
        { id: 3, title: 'Agriculture Moderne', description: 'Optimisez vos récoltes avec de nouvelles techniques.', progress: 0, category: 'Compétences', icon: '🌾', skill: 'agri_101' },
        { id: 4, title: 'Sécurité Mobile', description: 'Protégez votre argent et vos données.', progress: 0, category: 'Technologie', icon: '📱', skill: 'mobile_security' },
        { id: 5, title: 'Commerce Digital', description: 'Vendez vos produits en ligne en toute sécurité.', progress: 0, category: 'Affaires', icon: '🏪', skill: 'digital_commerce' },
        { id: 6, title: 'Santé & Communauté', description: 'Accédez aux services locaux essentiels.', progress: 0, category: 'Compétences', icon: '🏥', skill: 'health_community' },
    ];

    // Fetch progress
    useEffect(() => {
        const fetchProgress = async () => {
            if (activeProfile?.id) {
                console.log("[AdultDashboard] Current Active Profile ID:", activeProfile.id);

                // 1. Load from LocalStorage first (instant update)
                const localKey = `completed_lessons_${activeProfile.id}`;
                const localData = localStorage.getItem(localKey);
                if (localData) {
                    try {
                        const localIds = JSON.parse(localData);
                        console.log("[AdultDashboard] Found in LocalCache:", localIds);
                        setCompletedLessonIds(new Set(localIds));
                    } catch (e) {
                        console.error("[AdultDashboard] LocalCache Corrupted:", e);
                        localStorage.removeItem(localKey); // Clear corrupted data
                    }
                }

                // 2. Fetch from DB (source of truth)
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Timeout")), 30000)
                );

                try {
                    console.log("[AdultDashboard] Calling Supabase for progress...");
                    const fetchPromise = supabase
                        .from('lesson_progress')
                        .select('lesson_id')
                        .eq('profile_id', activeProfile.id);

                    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

                    if (error) {
                        console.error("[AdultDashboard] DB Error:", error.message, error.hint || "");
                    } else if (data) {
                        console.log(`[AdultDashboard] DB Result: ${data.length} lessons found.`);
                        const dbIds = data.map((item: any) => String(item.lesson_id).trim());

                        const merged = new Set<string>([...dbIds]);
                        if (localData) {
                            try {
                                JSON.parse(localData).forEach((id: string) => merged.add(id));
                            } catch (e) { /* ignore parse error here, fallback to DB only */ }
                        }
                        setCompletedLessonIds(merged);
                        localStorage.setItem(localKey, JSON.stringify([...merged]));
                    }
                } catch (err: any) {
                    console.error("[AdultDashboard] Fetch Exception:", err.message || err);
                }
            }
        };
        fetchProgress();
    }, [activeProfile?.id]);

    const calculateProgress = (lessonId: string) => {
        return completedLessonIds.has(lessonId) ? 100 : 0;
    };

    // Robust Profile Loading & Timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (localLoading) {
                console.warn("[AdultDashboard] Loading timed out after 5s, falling back.");
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

    if (localLoading && authLoading && !localProfile) {
        return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-brand-orange font-bold text-xl">Chargement...</div>;
    }

    if (!activeProfile) return null;

    return (
        <>
            <TopNav activeRoute="/adult" />

            <main className="min-h-screen bg-zinc-50 p-6 pb-24 md:pb-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-brand-orange rounded-2xl p-4 shadow-lg shadow-brand-orange/20">
                                <Smartphone size={48} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-brand-orange mb-1">
                                    Centre de Compétences pour Adultes
                                </h1>
                                <p className="text-lg text-zinc-600">
                                    Bienvenue, {activeProfile.name || activeProfile.full_name} !
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <StatsHeader profileId={activeProfile.id} />

                    {/* Courses */}
                    <h2 className="text-2xl font-black text-zinc-900 mb-6">
                        Vos Compétences
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-zinc-200 hover:border-brand-orange group cursor-pointer"
                                onClick={() => router.push(`/lesson?skill=${course.skill}`)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl group-hover:scale-110 transition-transform">{course.icon}</div>
                                    <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full border border-brand-orange/20">
                                        {course.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-1">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
                                    {course.description}
                                </p>
                                <div className="mb-6">
                                    <div className="bg-zinc-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-brand-orange h-full transition-all duration-1000"
                                            style={{ width: `${calculateProgress(course.skill)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs font-bold text-zinc-400 mt-2 uppercase tracking-wider">
                                        {calculateProgress(course.skill)}% Complété
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/lesson?skill=${course.skill}`);
                                    }}
                                >
                                    Continuer l'Apprentissage
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </main >

            <BottomNav activeRoute="/adult" />
        </>
    );
}
