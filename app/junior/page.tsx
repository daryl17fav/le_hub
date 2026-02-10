"use client";

import React from 'react';
import { Backpack, BookOpen, Star, TrendingUp } from 'lucide-react';
import Button from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';

export default function JuniorDashboard() {
    const lessons = [
        { id: 1, title: 'Fun with Numbers', progress: 80, icon: '🔢' },
        { id: 2, title: 'Reading Adventures', progress: 60, icon: '📚' },
        { id: 3, title: 'Science Explorers', progress: 40, icon: '🔬' },
    ];

    return (
        <>
            <TopNav activeRoute="/junior" />

            <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 pb-24 md:pb-6 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
                    <img
                        src="/images/junior-bg.jpg"
                        alt="Background Pattern"
                        className="w-full h-full object-cover"
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
                                <h1 className="text-4xl font-black text-brand-purple dark:text-white">
                                    Junior School
                                </h1>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                    Let's learn and have fun! 🎉
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                            <Star size={32} className="text-brand-orange mb-2" />
                            <p className="text-3xl font-black text-brand-purple">245</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Stars Earned</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                            <BookOpen size={32} className="text-brand-purple mb-2" />
                            <p className="text-3xl font-black text-brand-purple">12</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Lessons Done</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                            <TrendingUp size={32} className="text-brand-orange mb-2" />
                            <p className="text-3xl font-black text-brand-purple">5</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Day Streak</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                            <span className="text-4xl mb-2">🏆</span>
                            <p className="text-3xl font-black text-brand-purple">3</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Badges</p>
                        </div>
                    </div>

                    {/* Lessons */}
                    <h2 className="text-2xl font-black text-brand-purple dark:text-white mb-4">
                        Your Lessons
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => window.location.href = '/lesson'}
                            >
                                <div className="text-5xl mb-4">{lesson.icon}</div>
                                <h3 className="text-xl font-black text-brand-purple dark:text-white mb-2">
                                    {lesson.title}
                                </h3>
                                <div className="mb-4">
                                    <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-brand-purple to-brand-orange h-full"
                                            style={{ width: `${lesson.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                                        {lesson.progress}% Complete
                                    </p>
                                </div>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = '/lesson';
                                    }}
                                >
                                    Continue
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
