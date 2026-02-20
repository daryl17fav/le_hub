"use client";

import React from 'react';
import { Home, BookOpen, Trophy, User } from 'lucide-react';
import Link from 'next/link';

interface BottomNavProps {
    activeRoute?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeRoute = '/' }) => {
    const navItems = [
        { icon: Home, label: 'Home', href: '/select-profile' },
        { icon: BookOpen, label: 'Learn', href: '/junior' },
        { icon: Trophy, label: 'Arena', href: '/arena' },
        { icon: User, label: 'Profile', href: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white bg-white border-t-4 border-brand-purple shadow-2xl md:hidden z-50">
            <div className="flex items-center justify-around px-4 py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeRoute === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center min-w-[60px] min-h-[60px] rounded-xl transition-all ${isActive
                                ? 'text-brand-purple bg-brand-purple/10'
                                : 'text-zinc-500 hover:text-brand-purple'
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
