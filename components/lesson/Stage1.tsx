"use client";

import React from 'react';
import { Play, ArrowLeft } from 'lucide-react';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/navigation';

interface Stage1Props {
    onNext: () => void;
}

/**
 * Stage 1: Introduction
 * Displays lesson title, objective, and audio introduction
 */
const Stage1: React.FC<Stage1Props> = ({ onNext }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 relative">
            {/* Back Button */}
            <div className="mb-8 max-w-2xl mx-auto w-full">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 hover:text-brand-purple transition-colors font-bold"
                >
                    <ArrowLeft size={20} />
                    Retour
                </button>
            </div>

            <div className="max-w-2xl w-full bg-white bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-brand-purple/20 rounded-full p-6">
                        <Play size={48} className="text-brand-purple" />
                    </div>
                </div>

                <h1 className="text-4xl font-black text-center text-brand-purple text-zinc-900 mb-4">
                    Bienvenue dans votre Leçon !
                </h1>

                <p className="text-xl text-center text-zinc-600 text-zinc-600 mb-8">
                    Préparez-vous à apprendre quelque chose d'incroyable. Cette leçon vous aidera à développer vos compétences étape par étape.
                </p>

                {/* Audio Player Placeholder */}
                <div className="bg-zinc-100 bg-zinc-100 rounded-2xl p-6 mb-8 flex items-center justify-center gap-4">
                    <Play size={32} className="text-brand-purple" />
                    <span className="font-bold text-lg">Écouter l'Introduction</span>
                </div>

                <Button variant="primary" size="large" onClick={onNext} className="w-full">
                    Commençons ! 🚀
                </Button>
            </div>
        </div>
    );
};

export default Stage1;
