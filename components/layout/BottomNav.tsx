"use client";

import React from 'react';
import { Home, BookOpen, Trophy, User } from 'lucide-react';
import Link from 'next/link';

interface BottomNavProps {
    activeRoute?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeRoute = '/' }) => {
    const navItems = [
        { icon: Home, label: 'Accueil', href: '/select-profile' },
        { icon: BookOpen, label: 'Apprendre', href: '/junior' },
        { icon: Trophy, label: 'Arène', href: '/arena' },
        { icon: User, label: 'Profil', href: '/profile' },
    ];

    const isAdult = activeRoute.startsWith('/adult');
    const bgColor = 'bg-white';
    const borderColor = isAdult ? 'border-brand-orange' : 'border-brand-purple';

    return (
        <nav className={`fixed bottom-0 left-0 right-0 ${bgColor} border-t-4 ${borderColor} shadow-2xl md:hidden z-50`}>
            <div className="flex items-center justify-around px-4 py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeRoute === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center min-w-[60px] min-h-[60px] rounded-xl transition-all ${isActive
                                ? isAdult ? 'text-brand-orange bg-brand-orange/10' : 'text-brand-purple bg-brand-purple/10'
                                : isAdult ? 'text-zinc-500 hover:text-brand-orange' : 'text-zinc-500 hover:text-brand-purple'
                                }`}
                        >
                            <Icon size={24} strokeWidth={2.5} />
                            <span className="text-xs font-bold mt-1">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
