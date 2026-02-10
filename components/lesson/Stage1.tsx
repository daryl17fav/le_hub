"use client";

import React from 'react';
import { Play } from 'lucide-react';
import Button from '@/components/shared/Button';

interface Stage1Props {
    onNext: () => void;
}

/**
 * Stage 1: Introduction
 * Displays lesson title, objective, and audio introduction
 */
const Stage1: React.FC<Stage1Props> = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-purple/10 to-brand-orange/10">
            <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-brand-purple/20 rounded-full p-6">
                        <Play size={48} className="text-brand-purple" />
                    </div>
                </div>

                <h1 className="text-4xl font-black text-center text-brand-purple dark:text-white mb-4">
                    Welcome to Your Lesson!
                </h1>

                <p className="text-xl text-center text-zinc-600 dark:text-zinc-400 mb-8">
                    Get ready to learn something amazing. This lesson will help you grow your skills step by step.
                </p>

                {/* Audio Player Placeholder */}
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6 mb-8 flex items-center justify-center gap-4">
                    <Play size={32} className="text-brand-purple" />
                    <span className="font-bold text-lg">Listen to Introduction</span>
                </div>

                <Button variant="primary" size="large" onClick={onNext} className="w-full">
                    Let's Begin! 🚀
                </Button>
            </div>
        </div>
    );
};

export default Stage1;
