"use client";

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import Button from '@/components/shared/Button';

interface Stage3Props {
    onNext: () => void;
    onBack: () => void;
}

/**
 * Stage 3: Practice/Quiz
 * Interactive questions to test understanding
 */
const Stage3: React.FC<Stage3Props> = ({ onNext, onBack }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const question = "What did you learn in this lesson?";
    const options = [
        "Option A: Important concept 1",
        "Option B: Important concept 2",
        "Option C: Important concept 3",
        "Option D: Important concept 4"
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-purple/10 to-brand-orange/10">
            <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-brand-purple/20 rounded-full p-6">
                        <HelpCircle size={48} className="text-brand-purple" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-center text-brand-purple dark:text-white mb-8">
                    Test Your Knowledge
                </h2>

                <div className="mb-8">
                    <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">
                        {question}
                    </p>

                    <div className="space-y-4">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedAnswer(index)}
                                className={`w-full p-6 rounded-2xl text-left font-bold text-lg transition-all min-h-[72px] ${selectedAnswer === index
                                        ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-brand-purple/10'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" size="large" onClick={onBack} className="flex-1">
                        ← Back
                    </Button>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={onNext}
                        disabled={selectedAnswer === null}
                        className="flex-1"
                    >
                        Submit Answer →
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Stage3;
