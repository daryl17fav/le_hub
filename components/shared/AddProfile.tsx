"use client";

import React, { useState } from 'react';
import { User, MapPin, Backpack, Smartphone, X } from 'lucide-react';
import { getVillageList } from '@/lib/villages';
import { AVATAR_COLORS } from '@/lib/config';

interface AddProfileProps {
    phoneNumber: string;
    onComplete: (profile: { name: string; type: 'junior' | 'adult'; village: string; avatarIndex: number }) => void;
    onCancel: () => void;
}

type Step = 'type' | 'name' | 'village' | 'avatar';

const AddProfile: React.FC<AddProfileProps> = ({ phoneNumber, onComplete, onCancel }) => {
    const [step, setStep] = useState<Step>('type');
    const [type, setType] = useState<'junior' | 'adult'>('junior');
    const [name, setName] = useState('');
    const [village, setVillage] = useState('');
    const [avatarIndex, setAvatarIndex] = useState(0);

    const villages = getVillageList();

    const handleTypeSelect = (selectedType: 'junior' | 'adult') => {
        setType(selectedType);
        setStep('name');
    };

    const handleNameSubmit = () => {
        if (name.trim()) {
            setStep('village');
        }
    };

    const handleVillageSubmit = () => {
        if (village) {
            setStep('avatar');
        }
    };

    const handleComplete = () => {
        onComplete({ name, type, village, avatarIndex });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-8 md:p-10 max-w-md w-full shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-6 right-6 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <X size={24} className="text-zinc-600 dark:text-zinc-400" />
                </button>

                {/* Step 1: Type Selection */}
                {step === 'type' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                Add Family Member
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Is this for a kid or an adult?
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Junior Option */}
                            <button
                                onClick={() => handleTypeSelect('junior')}
                                className="p-8 rounded-3xl border-4 border-transparent hover:border-brand-purple bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 hover:from-brand-purple/20 hover:to-brand-orange/20 transition-all group"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Backpack size={40} className="text-white" />
                                    </div>
                                    <span className="font-black text-xl text-brand-purple dark:text-white">
                                        Junior
                                    </span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                        For Kids
                                    </span>
                                </div>
                            </button>

                            {/* Adult Option */}
                            <button
                                onClick={() => handleTypeSelect('adult')}
                                className="p-8 rounded-3xl border-4 border-transparent hover:border-brand-purple bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 hover:from-brand-purple/20 hover:to-brand-orange/20 transition-all group"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Smartphone size={40} className="text-white" />
                                    </div>
                                    <span className="font-black text-xl text-brand-purple dark:text-white">
                                        Adult
                                    </span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                        For Adults
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Name Input */}
                {step === 'name' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                What's their name?
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                This helps everyone know whose turn it is
                            </p>
                        </div>

                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-400 ml-2 block mb-2">
                                Full Name
                            </label>
                            <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 border-2 border-transparent focus-within:border-brand-purple transition-all">
                                <User size={20} className="text-brand-purple" />
                                <input
                                    type="text"
                                    placeholder="e.g. Musa Bello"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                                    className="flex-1 p-4 bg-transparent outline-none dark:text-white"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('type')}
                                className="flex-1 py-4 rounded-2xl font-bold text-brand-purple dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNameSubmit}
                                disabled={!name.trim()}
                                className="flex-1 bg-brand-orange hover:bg-brand-orange/90 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Village Selection */}
                {step === 'village' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                Select Village
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Which village do they represent?
                            </p>
                        </div>

                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-400 ml-2 block mb-2">
                                Village
                            </label>
                            <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 border-2 border-transparent focus-within:border-brand-purple transition-all">
                                <MapPin size={20} className="text-brand-purple" />
                                <select
                                    value={village}
                                    onChange={(e) => setVillage(e.target.value)}
                                    className="flex-1 p-4 bg-transparent outline-none text-zinc-900 dark:text-white cursor-pointer"
                                >
                                    <option value="">Choose village...</option>
                                    {villages.map((v) => (
                                        <option key={v} value={v} className="text-zinc-900 dark:text-zinc-100">{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('name')}
                                className="flex-1 py-4 rounded-2xl font-bold text-brand-purple dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleVillageSubmit}
                                disabled={!village}
                                className="flex-1 bg-brand-orange hover:bg-brand-orange/90 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Avatar Selection */}
                {step === 'avatar' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                Pick a Color
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Choose {name}'s favorite color
                            </p>
                        </div>

                        <div className="grid grid-cols-5 gap-3">
                            {AVATAR_COLORS.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setAvatarIndex(index)}
                                    className={`aspect-square rounded-2xl ${color.bg} border-4 ${avatarIndex === index ? color.border : 'border-transparent'
                                        } hover:scale-110 transition-transform`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('village')}
                                className="flex-1 py-4 rounded-2xl font-bold text-brand-purple dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleComplete}
                                className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all"
                            >
                                Create Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProfile;
