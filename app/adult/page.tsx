"use client";

import React from 'react';
import { Smartphone, Briefcase, TrendingUp, Award } from 'lucide-react';
import Button from '@/components/shared/Button';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import Image from 'next/image';

export default function AdultDashboard() {
    const courses = [
        { id: 1, title: 'Littératie Numérique', progress: 75, category: 'Technologie', icon: '💻' },
        { id: 2, title: 'Gestion Financière', progress: 50, category: 'Affaires', icon: '💰' },
        { id: 3, title: 'Bases de l\'Agriculture', progress: 30, category: 'Compétences', icon: '🌾' },
    ];

    return (
        <>
            <TopNav activeRoute="/adult" />

            <main className="min-h-screen bg-zinc-50 bg-zinc-50 p-6 pb-24 md:pb-6 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-10 opacity-10">
                    <Image
                        src="/images/adult-bg.jpg"
                        alt="Background Pattern"
                        fill
                        className="object-cover"
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
                                <h1 className="text-4xl font-black text-brand-purple text-zinc-900">
                                    Centre de Compétences pour Adultes
                                </h1>
                                <p className="text-lg text-zinc-600 text-zinc-600">
                                    Développement professionnel pour le succès quotidien
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg border-l-4 border-brand-purple">
                            <Briefcase size={32} className="text-brand-purple mb-2" />
                            <p className="text-3xl font-black text-brand-purple">8</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Cours Inscrits</p>
                        </div>
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg border-l-4 border-brand-orange">
                            <TrendingUp size={32} className="text-brand-orange mb-2" />
                            <p className="text-3xl font-black text-brand-purple">65%</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Progrès Moyen</p>
                        </div>
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg border-l-4 border-brand-purple">
                            <Award size={32} className="text-brand-purple mb-2" />
                            <p className="text-3xl font-black text-brand-purple">5</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Certificats</p>
                        </div>
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg border-l-4 border-brand-orange">
                            <span className="text-4xl mb-2">⏱️</span>
                            <p className="text-3xl font-black text-brand-purple">24h</p>
                            <p className="text-sm text-zinc-600 text-zinc-600">Temps d'Apprentissage</p>
                        </div>
                    </div>

                    {/* Courses */}
                    <h2 className="text-2xl font-black text-brand-purple text-zinc-900 mb-4">
                        Vos Cours
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-brand-purple cursor-pointer"
                                onClick={() => window.location.href = '/lesson'}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{course.icon}</div>
                                    <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-bold rounded-full">
                                        {course.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-brand-purple text-zinc-900 mb-2">
                                    {course.title}
                                </h3>
                                <div className="mb-4">
                                    <div className="bg-zinc-200 bg-zinc-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-brand-purple h-full transition-all"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-zinc-600 text-zinc-600 mt-2">
                                        {course.progress}% Terminé
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
