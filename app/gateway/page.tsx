"use client";

import React from 'react';
import { Backpack, Smartphone, GraduationCap } from 'lucide-react';
import GatewayCard from '@/components/shared/GatewayCard';

export default function GatewayPage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 md:p-12 transition-colors duration-500 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
                <img
                    src="/images/gateway-bg.jpg"
                    alt="Background Pattern"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Content - z-index ensures it sits above background */}
            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Header/Branding */}
                <div className="mb-12 text-center animate-in fade-in slide-in-from-top duration-700">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="bg-brand-purple rounded-2xl p-3 shadow-lg shadow-brand-purple/30">
                            <GraduationCap size={48} className="text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-brand-purple dark:text-white tracking-tighter">
                            THE HUB
                        </h1>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-zinc-600 dark:text-zinc-400 max-w-2xl px-4">
                        Empowering our community through learning.
                    </p>
                </div>

                {/* Gateway Cards Container */}
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full flex justify-center animate-in fade-in slide-in-from-left duration-700 delay-200">
                        <GatewayCard
                            title="JUNIOR SCHOOL"
                            description="Playful learning for children. Quizzes, games, and fun stories!"
                            Icon={Backpack}
                            variant="junior"
                            onClick={() => window.location.href = '/junior'}
                        />
                    </div>

                    <div className="w-full flex justify-center animate-in fade-in slide-in-from-right duration-700 delay-300">
                        <GatewayCard
                            title="ADULT SKILLS"
                            description="Professional growth and practical skills for everyday success."
                            Icon={Smartphone}
                            variant="adult"
                            onClick={() => window.location.href = '/adult'}
                        />
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-16 text-zinc-400 dark:text-zinc-600 font-medium flex flex-col items-center gap-2">
                    <p>Low Data Mode Active • Offline Support Available</p>
                    <div className="flex gap-4">
                        <button className="hover:text-brand-purple transition-colors p-4 min-h-[60px]">Help Center</button>
                        <button className="hover:text-brand-purple transition-colors p-4 min-h-[60px]">Change Theme</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
