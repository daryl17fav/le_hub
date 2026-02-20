"use client";

import React, { useState, useEffect } from 'react';
import { User, MapPin, Backpack, Smartphone, X } from 'lucide-react';
import { AVATAR_COLORS } from '@/lib/config';
import { supabase } from '@/lib/supabase';

interface AddProfileProps {
    onComplete: (profile: { name: string; type: 'junior' | 'adult'; village: string; avatarIndex: number }) => void;
    onCancel: () => void;
}

type Step = 'type' | 'name' | 'village' | 'avatar';

const AddProfile: React.FC<AddProfileProps> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState<Step>('type');
    const [type, setType] = useState<'junior' | 'adult'>('junior');
    const [name, setName] = useState('');
    // selectedVillageId holds the UUID of the chosen village
    const [selectedVillageId, setSelectedVillageId] = useState('');
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [villageList, setVillageList] = useState<{ id: string; name: string }[]>([]);
    const [loadingVillages, setLoadingVillages] = useState(true); // start true — we fetch immediately
    const [villageError, setVillageError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVillages = async () => {
            // Reset state before each fetch
            setLoadingVillages(true);
            setVillageError(null);

            try {
                // Fetch strictly id + name, ordered alphabetically — matches your RLS policy
                const { data, error } = await supabase
                    .from('villages')
                    .select('id, name')
                    .order('name', { ascending: true });

                if (error) throw error;

                // ✅ Success block — visible in F12 > Console
                console.log('[AddProfile] Villages fetched from Supabase:', data);
                setVillageList(data ?? []);
            } catch (err: any) {
                console.error('[AddProfile] Failed to load villages:', err?.message ?? err);
                setVillageError('Impossible de charger les villages. Réessayez.');
            } finally {
                // always runs — this is what unlocks the dropdown
                setLoadingVillages(false);
            }
        };

        fetchVillages();
    }, []);

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
        if (selectedVillageId) {
            setStep('avatar');
        }
    };

    const handleComplete = () => {
        // Pass the UUID — AuthContext sends this straight to Supabase
        onComplete({ name, type, village: selectedVillageId, avatarIndex });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white bg-white rounded-[32px] p-8 md:p-10 max-w-md w-full shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-6 right-6 p-2 rounded-xl hover:bg-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                    <X size={24} className="text-zinc-600 text-zinc-600" />
                </button>

                {/* Step 1: Type Selection */}
                {step === 'type' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple text-zinc-900 mb-2">
                                Ajouter un Membre de la Famille
                            </h2>
                            <p className="text-zinc-600 text-zinc-600">
                                Est-ce pour un enfant ou un adulte ?
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
                                    <span className="font-black text-xl text-brand-purple text-zinc-900">
                                        Junior
                                    </span>
                                    <span className="text-sm text-zinc-600 text-zinc-600">
                                        Pour les Enfants
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
                                    <span className="font-black text-xl text-brand-purple text-zinc-900">
                                        Adulte
                                    </span>
                                    <span className="text-sm text-zinc-600 text-zinc-600">
                                        Pour les Adultes
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
                            <h2 className="text-3xl font-black text-brand-purple text-zinc-900 mb-2">
                                Quel est son nom ?
                            </h2>
                            <p className="text-zinc-600 text-zinc-600">
                                Cela aide tout le monde à savoir à qui c&apos;est le tour
                            </p>
                        </div>

                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-400 ml-2 block mb-2">
                                Nom Complet
                            </label>
                            <div className="flex items-center gap-3 bg-zinc-100 bg-zinc-100 rounded-2xl px-4 border-2 border-transparent focus-within:border-brand-purple transition-all">
                                <User size={20} className="text-brand-purple" />
                                <input
                                    type="text"
                                    placeholder="ex. Musa Bello"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                                    className="flex-1 p-4 bg-transparent outline-none text-zinc-900"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('type')}
                                className="flex-1 py-4 rounded-2xl font-bold text-brand-purple text-zinc-900 hover:bg-zinc-100 hover:bg-zinc-800 transition-colors"
                            >
                                Retour
                            </button>
                            <button
                                onClick={handleNameSubmit}
                                disabled={!name.trim()}
                                className="flex-1 bg-brand-orange hover:bg-brand-orange/90 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Village Selection */}
                {step === 'village' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple text-zinc-900 mb-2">
                                Sélectionner le Village
                            </h2>
                            <p className="text-zinc-600 text-zinc-600">
                                Quel village représentent-ils ?
                            </p>
                        </div>

                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-400 ml-2 block mb-2">
                                Village
                            </label>
                            <div className="flex items-center gap-3 bg-zinc-100 bg-zinc-100 rounded-2xl px-4 border-2 border-transparent focus-within:border-brand-purple transition-all">
                                <MapPin size={20} className="text-brand-purple" />
                                <select
                                    value={village}
                                    onChange={(e) => setVillage(e.target.value)}
                                    className="flex-1 p-4 bg-transparent outline-none text-zinc-900 text-zinc-900 cursor-pointer"
                                >
                                    <option value="" className="bg-white bg-zinc-100 text-zinc-900 dark:text-zinc-100">Choisissez un village...</option>
                                    {villages.map((v) => (
                                        <option key={v} value={v} className="bg-white bg-zinc-100 text-zinc-900 dark:text-zinc-100">{v}</option>

                            {/* Error banner — only visible when Supabase fetch fails */}
                            {villageError && (
                                <p className="text-red-500 text-sm mb-2 ml-2">{villageError}</p>
                            )}

                            <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl px-4 border-2 border-brand-purple focus-within:border-brand-orange transition-all">
                                <MapPin size={20} className="text-brand-purple flex-shrink-0" />
                                <select
                                    value={selectedVillageId}
                                    onChange={(e) => setSelectedVillageId(e.target.value)}
                                    disabled={loadingVillages}
                                    className="flex-1 p-4 bg-transparent outline-none text-white cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {/* Fixed placeholder — always present as the empty value */}
                                    <option value="" disabled className="bg-zinc-900 text-zinc-400">
                                        {loadingVillages ? 'Chargement des villages...' : 'Choisir votre village'}
                                    </option>

                                    {villageList.map((v) => (
                                        // key & value = UUID; display = human name
                                        <option key={v.id} value={v.id} className="bg-zinc-900 text-white">
                                            {v.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('name')}
                                className="flex-1 py-4 rounded-2xl font-bold text-brand-purple text-zinc-900 hover:bg-zinc-100 hover:bg-zinc-800 transition-colors"
                            >
                                Retour
                            </button>
                            <button
                                onClick={handleVillageSubmit}
                                disabled={!selectedVillageId || !name.trim()}
                                className="flex-1 bg-brand-orange hover:bg-brand-orange/90 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Avatar Selection */}
                {step === 'avatar' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-brand-purple text-zinc-900 mb-2">
                                Choisissez une Couleur
                            </h2>
                            <p className="text-zinc-600 text-zinc-600">
                                Choisissez la couleur préférée de {name}
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
                                className="flex-1 py-4 rounded-2xl font-bold text-brand-purple text-zinc-900 hover:bg-zinc-100 hover:bg-zinc-800 transition-colors"
                            >
                                Retour
                            </button>
                            <button
                                onClick={handleComplete}
                                className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all"
                            >
                                Créer un Profil
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProfile;
