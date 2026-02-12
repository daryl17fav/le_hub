"use client";

import React from 'react';
import { Trophy, Star } from 'lucide-react';
import Button from '@/components/shared/Button';

interface Stage5Props {
    onComplete: () => void;
    score?: number;
}

/**
 * Stage 5: Summary & Rewards
 * Lesson completion with score and achievements
 */
const Stage5: React.FC<Stage5Props> = ({ onComplete, score = 100 }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-purple via-brand-orange to-brand-purple">
            <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-br from-brand-purple to-brand-orange rounded-full p-8 animate-bounce">
                        <Trophy size={64} className="text-white" />
                    </div>
                </div>

                <h1 className="text-5xl font-black text-center text-brand-purple dark:text-white mb-4">
                    🎉 Leçon Terminée !
                </h1>

                <p className="text-2xl text-center text-zinc-600 dark:text-zinc-400 mb-8">
                    Travail incroyable ! Vous avez maîtrisé cette leçon.
                </p>

                {/* Score Display */}
                <div className="bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 rounded-2xl p-8 mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Star size={32} className="text-brand-orange fill-brand-orange" />
                        <span className="text-6xl font-black text-brand-purple">{score}%</span>
                        <Star size={32} className="text-brand-orange fill-brand-orange" />
                    </div>
                    <p className="text-center text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        Votre Score
                    </p>
                </div>

                {/* Achievements */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex flex-col items-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                        <span className="text-3xl mb-2">🏆</span>
                        <span className="text-xs font-bold text-center">Premier Essai</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                        <span className="text-3xl mb-2">⚡</span>
                        <span className="text-xs font-bold text-center">Bonus de Vitesse</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                        <span className="text-3xl mb-2">🎯</span>
                        <span className="text-xs font-bold text-center">Score Parfait</span>
                    </div>
                </div>

                <Button variant="primary" size="large" onClick={onComplete} className="w-full">
                    Continuer l'Apprentissage →
                </Button>
            </div>
        </div>
    );
};

export default Stage5;
