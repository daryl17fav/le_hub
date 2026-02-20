"use client";

import React from 'react';
import { Backpack, Smartphone, GraduationCap } from 'lucide-react';
import GatewayCard from '@/components/shared/GatewayCard';
import Image from 'next/image';

export default function GatewayPage() {
    return (
        <main className="min-h-screen bg-zinc-50 bg-zinc-50 flex flex-col items-center justify-center p-6 md:p-12 transition-colors duration-500 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-10 opacity-10">
                <Image
                    src="/images/gateway-bg.jpg"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
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
                        <h1 className="text-5xl md:text-6xl font-black text-brand-purple text-zinc-900 tracking-tighter">
                            THE HUB
                        </h1>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-zinc-600 text-zinc-600 max-w-2xl px-4">
                        Autonomiser notre communauté par l'apprentissage.
                    </p>
                </div>

                {/* Gateway Cards Container */}
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full flex justify-center animate-in fade-in slide-in-from-left duration-700 delay-200">
                        <GatewayCard
                            title="ÉCOLE JUNIOR"
                            description="Apprentissage ludique pour les enfants. Quiz, jeux et histoires amusantes !"
                            Icon={Backpack}
                            variant="junior"
                            onClick={() => window.location.href = '/junior'}
                        />
                    </div>

                    <div className="w-full flex justify-center animate-in fade-in slide-in-from-right duration-700 delay-300">
                        <GatewayCard
                            title="COMPÉTENCES ADULTES"
                            description="Développement professionnel et compétences pratiques pour le succès quotidien."
                            Icon={Smartphone}
                            variant="adult"
                            onClick={() => window.location.href = '/adult'}
                        />
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-16 text-zinc-400 dark:text-zinc-600 font-medium flex flex-col items-center gap-2">
                    <p>Mode Faible Données Actif • Support Hors Ligne Disponible</p>
                    <div className="flex gap-4">
                        <button className="hover:text-brand-purple transition-colors p-4 min-h-[60px]">Centre d'Aide</button>
                        <button className="hover:text-brand-purple transition-colors p-4 min-h-[60px]">Changer de Thème</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
