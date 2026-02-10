"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GatewayCardProps {
    title: string;
    description: string;
    Icon: LucideIcon;
    variant: 'junior' | 'adult';
    onClick?: () => void;
}

const GatewayCard: React.FC<GatewayCardProps> = ({ title, description, Icon, variant, onClick }) => {
    const isJunior = variant === 'junior';

    const baseStyles = "relative flex flex-col items-center justify-center p-8 rounded-[2rem] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer min-h-[300px] w-full max-w-[400px] group overflow-hidden shadow-xl hover:shadow-2xl";

    const variantStyles = isJunior
        ? "bg-linear-to-br from-brand-purple to-brand-orange text-white"
        : "bg-white dark:bg-zinc-900 border-4 border-brand-purple text-brand-purple dark:text-brand-purple-light shadow-brand-purple/20";

    return (
        <div
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} hover:animate-bounce-subtle`}
            role="button"
            tabIndex={0}
            aria-label={`${title} Gateway`}
        >
            {/* Decorative element for depth */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${isJunior ? 'bg-white' : 'bg-brand-purple'}`}></div>

            <div className="mb-6 transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Icon size={80} strokeWidth={1.5} className={isJunior ? "text-white drop-shadow-lg" : "text-brand-purple drop-shadow-md"} />
            </div>

            <h2 className={`text-4xl font-black mb-3 text-center ${isJunior ? 'tracking-tight' : 'uppercase tracking-wider'}`}>
                {title}
            </h2>

            <p className={`text-lg font-medium text-center opacity-90 px-4`}>
                {description}
            </p>

            {/* Visual touch target indicator/action reminder */}
            <div className="mt-8 flex items-center justify-center min-h-[60px] min-w-[200px] rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-colors">
                <span className="font-bold text-xl uppercase tracking-widest">Enter</span>
            </div>
        </div>
    );
};

export default GatewayCard;
