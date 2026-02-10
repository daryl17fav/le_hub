"use client";

import React from 'react';
import { Smartphone, Briefcase, TrendingUp, Award } from 'lucide-react';
import Button from '@/components/shared/Button';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';

export default function AdultDashboard() {
    const courses = [
        { id: 1, title: 'Digital Literacy', progress: 75, category: 'Technology', icon: '💻' },
        { id: 2, title: 'Financial Management', progress: 50, category: 'Business', icon: '💰' },
        { id: 3, title: 'Agriculture Basics', progress: 30, category: 'Skills', icon: '🌾' },
    ];

    return (
        <>
            <TopNav activeRoute="/adult" />

            <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 pb-24 md:pb-6 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
                    <img
                        src="/images/adult-bg.jpg"
                        alt="Background Pattern"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-brand-purple rounded-2xl p-4 shadow-lg shadow-brand-purple/30">
                                <Smartphone size={48} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-brand-purple dark:text-white">
                                    Adult Skills Hub
                                </h1>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                    Professional growth for everyday success
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border-l-4 border-brand-purple">
                            <Briefcase size={32} className="text-brand-purple mb-2" />
                            <p className="text-3xl font-black text-brand-purple">8</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Courses Enrolled</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border-l-4 border-brand-orange">
                            <TrendingUp size={32} className="text-brand-orange mb-2" />
                            <p className="text-3xl font-black text-brand-purple">65%</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Avg Progress</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border-l-4 border-brand-purple">
                            <Award size={32} className="text-brand-purple mb-2" />
                            <p className="text-3xl font-black text-brand-purple">5</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Certificates</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border-l-4 border-brand-orange">
                            <span className="text-4xl mb-2">⏱️</span>
                            <p className="text-3xl font-black text-brand-purple">24h</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Learning Time</p>
                        </div>
                    </div>

                    {/* Courses */}
                    <h2 className="text-2xl font-black text-brand-purple dark:text-white mb-4">
                        Your Courses
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-brand-purple cursor-pointer"
                                onClick={() => window.location.href = '/lesson'}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{course.icon}</div>
                                    <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-bold rounded-full">
                                        {course.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-brand-purple dark:text-white mb-2">
                                    {course.title}
                                </h3>
                                <div className="mb-4">
                                    <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-brand-purple h-full transition-all"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                                        {course.progress}% Complete
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="medium"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = '/lesson';
                                    }}
                                >
                                    Continue Learning
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
