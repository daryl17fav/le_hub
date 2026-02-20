"use client";

import React from 'react';
import { User, Award, TrendingUp, Settings, LogOut } from 'lucide-react';
import Button from '@/components/shared/Button';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';

export default function ProfilePage() {
    return (
        <>
            <TopNav activeRoute="/profile" />

            <main className="min-h-screen bg-zinc-50 bg-zinc-50 p-6 pb-24 md:pb-6">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-br from-brand-purple to-brand-orange rounded-3xl p-8 mb-8 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-white">
                            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/50">
                                <User size={64} className="text-white" />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl font-black mb-2">Welcome Back!</h1>
                                <p className="text-xl opacity-90">+234 800 000 0000</p>
                                <p className="text-sm opacity-75 mt-2">Member since February 2026</p>
                            </div>

                            <Button variant="outline" size="medium" className="bg-white/20 border-white text-white hover:bg-white hover:text-brand-purple">
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-brand-purple/10 rounded-full p-3">
                                    <Award size={32} className="text-brand-purple" />
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-brand-purple">24</p>
                                    <p className="text-sm text-zinc-600 text-zinc-600">Lessons Completed</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-brand-orange/10 rounded-full p-3">
                                    <TrendingUp size={32} className="text-brand-orange" />
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-brand-purple">12</p>
                                    <p className="text-sm text-zinc-600 text-zinc-600">Day Streak</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-brand-purple/10 rounded-full p-3">
                                    <span className="text-3xl">🏆</span>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-brand-purple">8</p>
                                    <p className="text-sm text-zinc-600 text-zinc-600">Badges Earned</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white bg-white rounded-2xl p-6 shadow-lg mb-8">
                        <h2 className="text-2xl font-black text-brand-purple text-zinc-900 mb-6">
                            Recent Achievements
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['🎯', '⚡', '🔥', '💎', '🌟', '🚀', '💪', '🎓'].map((emoji, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center p-4 bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 rounded-xl"
                                >
                                    <span className="text-4xl mb-2">{emoji}</span>
                                    <span className="text-xs font-bold text-center text-zinc-700 text-zinc-700">
                                        Achievement {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="bg-white bg-white rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-black text-brand-purple text-zinc-900 mb-6">
                            Settings
                        </h2>
                        <div className="space-y-4">
                            <button
                                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-zinc-100 hover:bg-zinc-800 transition-colors min-h-[60px]"
                                onClick={() => alert('Account settings coming soon!')}
                            >
                                <div className="flex items-center gap-3">
                                    <Settings size={24} className="text-brand-purple" />
                                    <span className="font-bold">Account Settings</span>
                                </div>
                                <span className="text-zinc-400">→</span>
                            </button>

                            <button
                                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-zinc-100 hover:bg-zinc-800 transition-colors min-h-[60px]"
                                onClick={() => document.documentElement.classList.toggle('dark')}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🌙</span>
                                    <span className="font-bold">Dark Mode</span>
                                </div>
                                <span className="text-zinc-400">→</span>
                            </button>

                            <button
                                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 hover:bg-red-900/20 transition-colors min-h-[60px] text-red-600"
                                onClick={() => {
                                    if (confirm('Are you sure you want to log out?')) {
                                        window.location.href = '/auth';
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut size={24} />
                                    <span className="font-bold">Log Out</span>
                                </div>
                                <span className="text-red-400">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav activeRoute="/profile" />
        </>
    );
}
