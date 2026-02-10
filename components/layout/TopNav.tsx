"use client";

import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Trophy, User, Search, Globe } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher';

interface TopNavProps {
    activeRoute?: string;
}

const TopNav: React.FC<TopNavProps> = ({ activeRoute = '/' }) => {
    const navItems = [
        { label: 'Home', href: '/select-profile', icon: Home },
        { label: 'Learn', href: '/junior', icon: BookOpen },
        { label: 'Arena', href: '/arena', icon: Trophy },
        { label: 'Profile', href: '/profile', icon: User },
    ];

    return (
        <nav className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 bg-white dark:bg-zinc-900 border-b-4 border-brand-purple shadow-lg sticky top-0 z-50 transition-colors duration-300">
            {/* Logo - Smaller on mobile */}
            <div className="flex-shrink-0">
                <Logo size="small" />
            </div>

            {/* Center Navigation */}
            <div className="flex items-center gap-4 lg:gap-6">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeRoute === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 ${isActive
                                ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-brand-purple/10 hover:text-brand-purple'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="hidden lg:inline">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 lg:gap-4">
                {/* Search Icon */}
                <button
                    className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => alert('Search feature coming soon!')}
                    aria-label="Search"
                >
                    <Search size={24} className="text-brand-purple dark:text-brand-orange" />
                </button>

                {/* Language/Globe Icon */}
                <button
                    className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => alert('Language selection coming soon!')}
                    aria-label="Change Language"
                >
                    <Globe size={24} className="text-brand-purple dark:text-brand-orange" />
                </button>

                {/* Theme Switcher */}
                <ThemeSwitcher />
            </div>
        </nav>
    );
};

export default TopNav;
