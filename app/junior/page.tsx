"use client";

import React from 'react';
import { Backpack, BookOpen, Star, TrendingUp } from 'lucide-react';
import Button from '@/components/shared/Button';
import BottomNav from '@/components/layout/BottomNav';
import Image from 'next/image';
import TopNav from '@/components/layout/TopNav';
import { useRouter } from 'next/navigation';

export default function JuniorDashboard() {
    const router = useRouter();

    const lessons = [
        { id: 1, title: 'S\'amuser avec les Chiffres', progress: 80, icon: '🔢', available: true, skill: 'math_junior_test' },
        { id: 2, title: 'Aventures de Lecture', progress: 10, icon: '📚', available: true, skill: 'reading_adventure' },
        { id: 3, title: 'Explorateurs Scientifiques', progress: 0, icon: '🔬', available: true, skill: 'science_explorers' },
    ];

    const handleLessonStart = (lesson: any) => {
        if (lesson.available) {
            router.push(`/lesson?skill=${lesson.skill}`);
        }
    };

    return (
        <>
            <TopNav activeRoute="/junior" />

            <main className="min-h-screen bg-zinc-50 bg-zinc-50 p-6 pb-24 md:pb-6 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-10 opacity-10">
                    <Image
                        src="/images/junior-bg.jpg"
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                    />
                </div>

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
                                <p className="text-lg text-zinc-600 text-zinc-600">
                                    Apprenons et amusons-nous ! 🎉
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <Star size={32} className="text-brand-orange mb-2" />
                            <p className="text-3xl font-black text-brand-purple">245</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Étoiles Gagnées</p>
                        </div>
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <BookOpen size={32} className="text-brand-purple mb-2" />
                            <p className="text-3xl font-black text-brand-purple">12</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Leçons Terminées</p>
                        </div>
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <TrendingUp size={32} className="text-brand-orange mb-2" />
                            <p className="text-3xl font-black text-brand-purple">5</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Série (Jours)</p>
                        </div>
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <span className="text-4xl mb-2">🏆</span>
                            <p className="text-3xl font-black text-brand-purple">3</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Badges</p>
                        </div>
                    </div>

                    {/* Lessons */}
                    <h2 className="text-2xl font-black text-brand-purple text-zinc-900 mb-4">
                        Vos Leçons
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`bg-white bg-white rounded-2xl p-6 shadow-lg transition-all ${lesson.available
                                    ? 'hover:shadow-xl cursor-pointer hover:scale-[1.02]'
                                    : 'opacity-60 cursor-not-allowed'
                                    }`}
                                onClick={() => handleLessonStart(lesson)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{lesson.icon}</div>
                                    {!lesson.available && (
                                        <span className="px-3 py-1 bg-zinc-200 bg-zinc-200 text-zinc-600 text-zinc-600 text-xs font-bold rounded-full">
                                            Bientôt
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-brand-purple text-zinc-900 mb-2">
                                    {lesson.title}
                                </h3>
                                <div className="mb-4">
                                    <div className="bg-zinc-200 bg-zinc-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-brand-purple to-brand-orange h-full"
                                            style={{ width: `${lesson.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-zinc-600 text-zinc-600 mt-2">
                                        {lesson.progress}% Terminé
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
