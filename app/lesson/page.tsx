"use client";

import React, { useState, Suspense } from 'react';
import Exercise from '@/components/lesson/Exercise';
import Stage1 from '@/components/lesson/Stage1';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, RefreshCw } from 'lucide-react';

function LessonContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const skill = searchParams.get('skill') || 'math_junior_test';
    const [showIntro, setShowIntro] = useState(true);

    // Mock student profile - In a real app, fetch from Context/DB
    const studentProfile = {
        id: 'student_1',
        name: 'Junior Learner',
        age: 8,
        skillLevels: {
            'math_junior_test': 1,
            'reading_adventure': 1
        }
    };

    // Show intro first
    if (showIntro) {
        return <Stage1 onNext={() => setShowIntro(false)} />;
    }

    // Then show exercises
    return (
        <div className="min-h-screen bg-zinc-50 bg-zinc-50 p-6 flex flex-col">
            {/* Header / Nav */}
            <div className="mb-8 max-w-2xl mx-auto w-full">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 hover:text-brand-purple transition-colors font-bold"
                >
                    <ArrowLeft size={20} />
                    Retour
                </button>
            </div>

            {/* Main Learning Area */}
            <div className="flex-1 flex flex-col justify-center">
                <Exercise
                    skill={skill}
                    student={studentProfile}
                />
            </div>
        </div>
    );
}

export default function LessonPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 bg-zinc-50">
                <RefreshCw className="animate-spin text-brand-purple" size={48} />
            </div>
        }>
            <LessonContent />
        </Suspense>
    );
}
