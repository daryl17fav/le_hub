
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { generateExerciseSession } from '@/lib/engine/exerciseGenerator';
import { getNextLevel } from '@/lib/engine/adaptiveEngine';
import { StudentProfile } from '@/lib/engine/studentLevel';
import Feedback from './Feedback';
import CompletionScreen from './CompletionScreen';
import { ArrowRight, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const MAX_QUESTIONS = 10;

type ExerciseProps = {
    skill: string;
    student: Partial<StudentProfile>; // Allow partial for now as we transition
};

export default function Exercise({ skill, student }: ExerciseProps) {
    // Initialize level from student profile or default to 1
    const [level, setLevel] = useState(student.skillLevels?.[skill] || 1);

    const isMath = skill.startsWith('math');

    // Session-based architecture: pre-generate all exercises
    const [sessionExercises, setSessionExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [answer, setAnswer] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // Session stats for rapid adaptation
    const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

    const inputRef = useRef<HTMLInputElement>(null);

    // Generate full session of 10 exercises
    const generateSession = (currentLevel: number) => {
        // Use the new generateExerciseSession function that ensures no duplicates
        const exercises = generateExerciseSession(skill, currentLevel, MAX_QUESTIONS);

        setSessionExercises(exercises);
        setCurrentIndex(0);
        setSessionStats({ correct: 0, total: 0 });

        // Reset state from previous session
        setAnswer('');
        setFeedbackMessage('');
        setIsCorrect(null);

        // Auto-focus input after exercises are ready
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Generate session on mount and when level/skill changes
    useEffect(() => {
        if (!isCompleted) {
            generateSession(level);
        }
    }, [level, skill]);

    // Restart handler
    const handleRestart = () => {
        setIsCompleted(false);
        generateSession(level);
    };

    // Current exercise from pre-generated session
    const exercise = sessionExercises[currentIndex];

    const handleSubmit = (e?: React.FormEvent, selectedChoice?: string) => {
        e?.preventDefault();
        const finalAnswer = selectedChoice || answer;

        if (!exercise || !finalAnswer) return;

        // Case insensitive comparison for text
        const cleanAnswer = String(finalAnswer).trim().toLowerCase();
        const cleanCorrect = String(exercise.correctAnswer).trim().toLowerCase();

        const correct = cleanAnswer === cleanCorrect;
        setIsCorrect(correct);

        // Update session stats
        const newStats = {
            correct: sessionStats.correct + (correct ? 1 : 0),
            total: sessionStats.total + 1
        };
        setSessionStats(newStats);

        if (correct) {
            setFeedbackMessage("Excellent ! 🎉");
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 }
            });
        } else {
            setFeedbackMessage(`Oops 😅 La réponse était ${exercise.correctAnswer}`);
        }

        // Wait before next question
        setTimeout(() => {
            // Check if session is complete FIRST
            if (currentIndex + 1 >= MAX_QUESTIONS) {
                setIsCompleted(true);
                return;
            }


            setAnswer('');
            setFeedbackMessage('');
            setIsCorrect(null);
            setCurrentIndex(prev => prev + 1);

            // Auto-focus for next question
            setTimeout(() => inputRef.current?.focus(), 50);
        }, 1200);
    };

    // Next Level handler
    const handleNextLevel = () => {
        setIsCompleted(false);
        const nextLevel = level + 1;
        setLevel(nextLevel);
        // Stats reset handled in generateSession
    };

    // Show completion screen if session is done
    if (isCompleted) {
        return (
            <CompletionScreen
                score={sessionStats.correct}
                total={sessionStats.total}
                onRestart={handleRestart}
                onNextLevel={level < 4 ? handleNextLevel : undefined}
            />
        );
    }

    if (!exercise) return (
        <div className="flex justify-center p-12">
            <RefreshCw className="animate-spin text-brand-purple" size={48} />
        </div>
    );

    return (
        <div className="bg-white bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border-2 border-zinc-100border-zinc-800">
            {/* Header Level Indicator */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 bg-brand-purple/10 px-4 py-2 rounded-full">
                    <Star size={20} className="text-brand-purple fill-brand-purple" />
                    <span className="font-bold text-brand-purple">Niveau {level}</span>
                </div>
                <div className="text-sm font-bold">
                    <span className="text-brand-orange text-lg">{sessionStats.total}</span>
                    <span className="text-zinc-400">/{MAX_QUESTIONS}</span>
                </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
                {isMath ? (
                    <>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-purple text-zinc-900 mb-2">
                            {exercise.question.split('=')[0]}
                        </h2>
                        <p className="text-2xl text-zinc-400 font-bold">=</p>
                    </>
                ) : (
                    <h2 className="text-3xl md:text-5xl font-black text-brand-purple text-zinc-900 mb-2 whitespace-pre-wrap">
                        {exercise.question}
                    </h2>
                )}
            </div>

            {/* Answer Area */}
            {exercise.type === 'multiple_choice' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                    {exercise.options?.map((option: string | number, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setAnswer(String(option));
                                // Auto-submit for multiple choice
                                setTimeout(() => {
                                    const event = { preventDefault: () => { } } as React.FormEvent;
                                    handleSubmit(event, String(option));
                                }, 100);
                            }}
                            disabled={isCorrect !== null}
                            className={`p-6 rounded-2xl text-2xl font-bold transition-all transform hover:scale-105 active:scale-95 border-b-4 ${answer === String(option)
                                ? 'bg-brand-purple text-white border-brand-purple/50'
                                : 'bg-white bg-zinc-100 text-zinc-700 dark:text-zinc-200 border-zinc-200border-zinc-700 hover:bg-zinc-50 hover:bg-zinc-700 shadow-lg'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <form onSubmit={(e) => handleSubmit(e)} className="max-w-xs mx-auto">
                    <input
                        ref={inputRef}
                        type={isMath ? "number" : "text"}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full text-center text-4xl font-black p-4 rounded-2xl bg-zinc-100 bg-zinc-100 border-4 border-transparent focus:border-brand-purple outline-none transition-all text-zinc-900 mb-6 uppercase"
                        placeholder="?"
                        autoFocus
                        disabled={isCorrect !== null}
                        autoComplete="off"
                    />

                    <button
                        type="submit"
                        disabled={!answer || isCorrect !== null}
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-xl py-4 rounded-2xl shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        Valider
                        <ArrowRight size={24} />
                    </button>
                </form>
            )}

            {/* Feedback Overlay */}
            <Feedback isCorrect={isCorrect} message={feedbackMessage} />
        </div>
    );
}
