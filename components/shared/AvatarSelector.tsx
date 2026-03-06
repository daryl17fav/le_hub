"use client";

import React from 'react';

export const AVATARS = {
    junior: [
        { id: 'rocket', emoji: '🚀', label: 'Fusée' },
        { id: 'magic', emoji: '🦄', label: 'Magie' },
        { id: 'fox', emoji: '🦊', label: 'Renard Malin' },
    ],
    adult: [
        { id: 'safe', emoji: '🛡️', label: 'Sécurité' },
        { id: 'farmer', emoji: '👨‍🌾', label: 'Agriculture' },
        { id: 'pro', emoji: '👔', label: 'Pro' },
    ]
};

interface AvatarSelectorProps {
    role: 'junior' | 'adult';
    activeId: string;
    onSelect: (id: string, index: number) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ role, activeId, onSelect }) => {
    const avatars = AVATARS[role];
    const themeColor = role === 'junior' ? 'brand-purple' : 'brand-orange';

    return (
        <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar, index) => {
                const isActive = activeId === avatar.id;
                
                return (
                    <button
                        key={avatar.id}
                        type="button"
                        onClick={() => onSelect(avatar.id, index)}
                        className={`
                            flex flex-col items-center justify-center p-4 rounded-[24px] transition-all
                            bg-zinc-100 hover:bg-zinc-200
                            border-4
                            ${isActive 
                                ? `border-${themeColor} shadow-lg shadow-${themeColor}/30 scale-105` 
                                : 'border-transparent hover:scale-[1.02]'
                            }
                        `}
                    >
                        <div className="text-4xl mb-2">{avatar.emoji}</div>
                        <span className={`text-xs font-bold leading-tight text-center ${isActive ? `text-${themeColor}` : 'text-zinc-500'}`}>
                            {avatar.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default AvatarSelector;
