"use client";

import React, { useEffect, useState } from 'react';

const LiveTicker: React.FC = () => {
    const messages = [
        "🎉 Le Village Alpha vient de gagner 500 points !",
        "🏆 Nouveau Champion Hebdomadaire : Musa du Village Beta !",
        "⚡ Le Village Gamma a terminé 50 leçons aujourd'hui !",
        "🌟 Amina a obtenu le badge 'Apprenant Rapide' !",
        "🔥 Le Village Delta est sur une série de 7 jours !",
        "💎 Nouveau record : 1000 leçons terminées cette semaine !",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-brand-purple text-white py-3 shadow-2xl z-40 overflow-hidden">
            <div className="flex items-center gap-4 px-4">
                {/* Live Badge */}
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-black text-sm uppercase tracking-wider">En Direct</span>
                </div>

                {/* Scrolling Messages */}
                <div className="flex-1 overflow-hidden">
                    <div
                        className="whitespace-nowrap transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        <div className="inline-flex gap-16">
                            {messages.map((message, index) => (
                                <span key={index} className="font-bold text-lg">
                                    {message}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTicker;
