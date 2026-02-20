"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // This prevents "hydration error" (making sure we are on the client side)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-4 rounded-full bg-zinc-200 bg-zinc-100 hover:bg-zinc-300 hover:bg-zinc-700 transition-colors min-h-[60px] min-w-[60px] flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={24} className="text-hubOrange" />
            ) : (
                <Moon size={24} className="text-hubPurple" />
            )}
        </button>
    )
}
