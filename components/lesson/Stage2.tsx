"use client";

import React from 'react';
import { BookOpen } from 'lucide-react';
import Button from '@/components/shared/Button';

interface Stage2Props {
    onNext: () => void;
    onBack: () => void;
}

/**
 * Stage 2: Content Delivery
 * Main lesson content with text, images, or video
 */
const Stage2: React.FC<Stage2Props> = ({ onNext, onBack }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-orange/10 to-brand-purple/10">
            <div className="max-w-3xl w-full bg-white bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-brand-orange/20 rounded-full p-6">
                        <BookOpen size={48} className="text-brand-orange" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-center text-brand-purple text-zinc-900 mb-6">
                    Learn the Concept
                </h2>

                {/* Content Area */}
                <div className="prose dark:prose-invert max-w-none mb-8">
                    <p className="text-lg text-zinc-700 text-zinc-700 leading-relaxed">
                        This is where the main lesson content appears. It could include:
                    </p>
                    <ul className="text-lg text-zinc-700 text-zinc-700">
                        <li>Text explanations</li>
                        <li>Images or diagrams</li>
                        <li>Video content</li>
                        <li>Interactive examples</li>
                    </ul>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" size="large" onClick={onBack} className="flex-1">
                        ← Back
                    </Button>
                    <Button variant="primary" size="large" onClick={onNext} className="flex-1">
                        Continue →
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Stage2;
