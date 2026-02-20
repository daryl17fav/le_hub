"use client";

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/shared/Button';

interface Stage4Props {
    onNext: () => void;
    onRetry: () => void;
    isCorrect?: boolean;
}

/**
 * Stage 4: Feedback
 * Shows whether answer was correct with explanation
 */
const Stage4: React.FC<Stage4Props> = ({ onNext, onRetry, isCorrect = true }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-orange/10 to-brand-purple/10">
            <div className="max-w-2xl w-full bg-white bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <div className={`rounded-full p-6 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                        {isCorrect ? (
                            <CheckCircle size={64} className="text-green-600" />
                        ) : (
                            <XCircle size={64} className="text-red-600" />
                        )}
                    </div>
                </div>

                <h2 className={`text-4xl font-black text-center mb-6 ${isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {isCorrect ? '🎉 Correct!' : '❌ Not Quite'}
                </h2>

                <div className="bg-zinc-100 bg-zinc-100 rounded-2xl p-6 mb-8">
                    <p className="text-lg text-zinc-700 text-zinc-700 leading-relaxed">
                        {isCorrect
                            ? "Great job! You've understood the concept perfectly. Here's why this answer is correct..."
                            : "Don't worry! Learning takes practice. Here's what you should know..."
                        }
                    </p>
                </div>

                {isCorrect ? (
                    <Button variant="primary" size="large" onClick={onNext} className="w-full">
                        Continue to Summary →
                    </Button>
                ) : (
                    <div className="flex gap-4">
                        <Button variant="outline" size="large" onClick={onRetry} className="flex-1">
                            Try Again
                        </Button>
                        <Button variant="primary" size="large" onClick={onNext} className="flex-1">
                            Continue Anyway →
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stage4;
