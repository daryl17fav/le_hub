'use client';

import React from 'react';
import { Trophy, Star, Award, Home, RefreshCw, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import confetti from 'canvas-confetti';

interface CompletionScreenProps {
    score: number;
    total: number;
    onRestart: () => void;
    onNextLevel?: () => void;
    isSaving?: boolean;
    error?: string | null;
}

export default function CompletionScreen({ score, total, onRestart, onNextLevel, isSaving, error }: CompletionScreenProps) {
    const { activeProfile } = useAuth();
    const router = useRouter();
    const percentage = Math.round((score / total) * 100);

    // Trigger confetti on mount
    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 }
        });
    }, []);

    const handleHomeClick = () => {
        if (activeProfile?.role === 'adult') {
            router.push('/adult');
        } else {
            router.push('/junior');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 flex items-center justify-center p-6">
            <div className="bg-white bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center">
                {/* Trophy Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 shadow-lg">
                        <Trophy size={64} className="text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-brand-purple text-zinc-900 mb-4">
                    {percentage > 80
                        ? "Félicitation tu es incroyable ! 🎉"
                        : percentage >= 50
                            ? "Bravo continue comme ça ! 💪"
                            : percentage >= 20
                                ? "Bravo continue tu y es presque ! 🚀"
                                : "Tu dois redoubler d'effort ! 📚"}
                </h1>

                {/* Score */}
                <div className="mb-8">
                    <div className="text-6xl md:text-8xl font-black text-brand-orange mb-2">
                        {score}/{total}
                    </div>
                    <p className="text-2xl text-zinc-600 text-zinc-600 font-bold">
                        {percentage}% de réussite
                    </p>
                </div>

                {/* Stars or Badges based on performance */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map((item) => {
                        const Icon = activeProfile?.role === 'adult' ? Award : Star;
                        const isActive = percentage >= item * 33;
                        const activeColor = activeProfile?.role === 'adult' ? 'text-brand-orange fill-brand-orange' : 'text-yellow-400 fill-yellow-400';
                        
                        return (
                            <Icon
                                key={item}
                                size={48}
                                className={`${isActive
                                    ? activeColor
                                    : 'text-zinc-300 dark:text-zinc-700'
                                    } transition-all`}
                            />
                        );
                    })}
                </div>

                {/* Encouragement message */}
                <p className="text-xl text-zinc-700 text-zinc-700 mb-8">
                    {percentage >= 80
                        ? "Excellent travail ! Tu es un champion des maths ! 🌟"
                        : percentage >= 50
                            ? "Bon travail ! Continue comme ça ! 💪"
                            : percentage >= 30
                                ? "Continue à t'entraîner, tu vas y arriver ! 🚀"
                                : percentage >= 10
                                    ? "Tu peux faire mieux ! "
                                    : "Tu n'as pas assez travaillé ! "
                    }

                </p>

                {/* Saving Indicator */}
                {(isSaving || error) && (
                    <div className={`mb-6 p-4 rounded-2xl flex items-center justify-center gap-3 font-bold ${error ? 'bg-red-50 text-red-600 border-2 border-red-200' : 'bg-blue-50 text-brand-purple border-2 border-blue-200'
                        }`}>
                        {isSaving ? (
                            <>
                                <RefreshCw className="animate-spin" size={24} />
                                Sauvegarde de tes progrès...
                            </>
                        ) : (
                            <>
                                ⚠️ Erreur: {error}
                            </>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
                    <button
                        onClick={onRestart}
                        disabled={isSaving}
                        className={`flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 min-w-[150px] ${isSaving ? 'opacity-50 cursor-not-allowed translate-y-0 scale-100' : ''}`}
                    >
                        <RefreshCw size={24} className={isSaving ? 'animate-spin' : ''} />
                        Recommencer
                    </button>

                    <button
                        onClick={handleHomeClick}
                        disabled={isSaving}
                        className={`flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 min-w-[150px] ${isSaving ? 'opacity-50 cursor-not-allowed translate-y-0 scale-100' : ''}`}
                    >
                        <Home size={24} />
                        Accueil
                    </button>

                    {/* Next Level Button - Only show if passed and handler exists */}
                    {onNextLevel && percentage >= 50 && (
                        <button
                            onClick={onNextLevel}
                            disabled={isSaving}
                            className={`flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-lg py-4 px-6 rounded-2xl shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 min-w-[200px] ${isSaving ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'}`}
                        >
                            Niveau Suivant 🆙
                            <ArrowRight size={24} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
