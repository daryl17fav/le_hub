"use client";

import React, { useState } from 'react';
import Stage1 from '@/components/lesson/Stage1';
import Stage2 from '@/components/lesson/Stage2';
import Stage3 from '@/components/lesson/Stage3';
import Stage4 from '@/components/lesson/Stage4';
import Stage5 from '@/components/lesson/Stage5';
import { useRouter } from 'next/navigation';

export default function LessonPage() {
    const [currentStage, setCurrentStage] = useState(1);
    const router = useRouter();

    const handleNext = () => {
        if (currentStage < 5) {
            setCurrentStage(currentStage + 1);
        }
    };

    const handleBack = () => {
        if (currentStage > 1) {
            setCurrentStage(currentStage - 1);
        }
    };

    const handleRetry = () => {
        setCurrentStage(3); // Go back to quiz
    };

    const handleComplete = () => {
        router.push('/junior'); // Return to dashboard
    };

    return (
        <div className="min-h-screen">
            {currentStage === 1 && <Stage1 onNext={handleNext} />}
            {currentStage === 2 && <Stage2 onNext={handleNext} onBack={handleBack} />}
            {currentStage === 3 && <Stage3 onNext={handleNext} onBack={handleBack} />}
            {currentStage === 4 && <Stage4 onNext={handleNext} onRetry={handleRetry} isCorrect={true} />}
            {currentStage === 5 && <Stage5 onComplete={handleComplete} score={100} />}
        </div>
    );
}
