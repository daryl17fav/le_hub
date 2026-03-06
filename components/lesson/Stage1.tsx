"use client";

import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Lightbulb, ChevronRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLessonContent, LessonContent } from '@/lib/engine/lessonContent';
import { useAuth } from '@/context/AuthContext';

interface Stage1Props {
    onNext: () => void;
    skill: string;
}

/**
 * Stage 1: Lesson Introduction
 * Displays a skill-specific, teacher-style explanation before exercises begin.
 */
const Stage1: React.FC<Stage1Props> = ({ onNext, skill }) => {
    const router = useRouter();
    const { activeProfile } = useAuth();
    const lesson: LessonContent = getLessonContent(skill);

    const isAdult = activeProfile?.role === 'adult';
    const themeColor = isAdult ? 'brand-orange' : 'brand-purple';
    const bgGradient = isAdult
        ? 'from-[#0F0F0F] to-[#1a1200]'
        : 'from-brand-purple/10 to-brand-orange/10';
    const cardBg = isAdult ? 'bg-[#1A1A1A] border border-zinc-800' : 'bg-white';
    const headingColor = isAdult ? 'text-brand-orange' : `text-${themeColor}`;
    const textColor = isAdult ? 'text-zinc-300' : 'text-zinc-600';
    const sectionBg = isAdult ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-zinc-50 border border-zinc-100';
    const labelColor = isAdult ? 'text-brand-orange' : `text-${themeColor}`;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Small delay for mount animation
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 md:p-6 bg-gradient-to-br ${bgGradient} relative`}>
            {/* Back Button */}
            <div className="mb-6 max-w-2xl mx-auto w-full">
                <button
                    onClick={() => router.back()}
                    className={`flex items-center gap-2 ${isAdult ? 'text-zinc-500 hover:text-brand-orange' : 'text-zinc-500 hover:text-brand-purple'} transition-colors font-bold`}
                >
                    <ArrowLeft size={20} />
                    Retour
                </button>
            </div>

            {/* Main Card */}
            <div
                className={`max-w-2xl w-full ${cardBg} rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
                {/* Card Header */}
                <div className={`bg-${themeColor} p-6 flex items-center gap-4`}>
                    <div className="text-5xl">{lesson.emoji}</div>
                    <div>
                        <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">
                            {isAdult ? 'Module' : 'Leçon du Jour'}
                        </p>
                        <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            {lesson.title}
                        </h1>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                    {/* Teacher Explanation */}
                    <div className={`${sectionBg} rounded-2xl p-5`}>
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen size={18} className={labelColor} />
                            <span className={`text-xs font-black uppercase tracking-widest ${labelColor}`}>
                                {isAdult ? 'Explication' : 'Le Maître Explique'}
                            </span>
                        </div>
                        <p className={`${textColor} leading-relaxed text-base`}>
                            {lesson.teacherExplanation}
                        </p>
                    </div>

                    {/* Example */}
                    <div className={`${sectionBg} rounded-2xl p-5`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb size={18} className={isAdult ? 'text-yellow-400' : 'text-yellow-500'} />
                            <span className={`text-xs font-black uppercase tracking-widest ${isAdult ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                Exemple
                            </span>
                        </div>
                        <pre className={`${textColor} text-base font-medium whitespace-pre-wrap font-sans leading-relaxed`}>
                            {lesson.example}
                        </pre>
                    </div>

                    {/* Mini Practice Thought */}
                    <div className={`rounded-2xl p-5 border-2 ${isAdult ? 'border-brand-orange/30 bg-brand-orange/5' : 'border-brand-purple/20 bg-brand-purple/5'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={18} className={labelColor} />
                            <span className={`text-xs font-black uppercase tracking-widest ${labelColor}`}>
                                {isAdult ? 'Réfléchissez' : 'Réfléchis'}
                            </span>
                        </div>
                        <p className={`${textColor} text-base leading-relaxed`}>
                            💭 {lesson.miniPractice}
                        </p>
                    </div>

                    {/* Encouragement */}
                    <p className={`text-center font-bold text-lg ${headingColor}`}>
                        {lesson.encouragement}
                    </p>

                    {/* Start Button */}
                    <button
                        onClick={onNext}
                        className={`w-full bg-${themeColor} hover:bg-${themeColor}/90 text-white font-black text-lg py-4 px-6 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}
                    >
                        {isAdult ? 'Commencer les exercices' : 'C\'est parti ! 🚀'}
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stage1;
