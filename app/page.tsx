"use client";

import React from 'react';
import { GraduationCap, Sparkles, Users, Trophy, ArrowRight } from 'lucide-react';
import Logo from '@/components/shared/Logo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/5 via-white to-brand-orange/5 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <Logo size="medium" />
        <button
          className="px-6 py-3 rounded-xl font-bold text-brand-purple dark:text-white hover:bg-brand-purple/10 transition-colors"
          onClick={() => window.location.href = '/auth'}
        >
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-brand-purple dark:text-white mb-6 leading-tight">
            Apprendre Ensemble,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">
              Grandir Ensemble
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto">
            Le Hub apporte une éducation de qualité aux communautés rurales grâce à l'apprentissage mobile
            à faible consommation de données. Affrontez votre village, gagnez des récompenses et développez des compétences pour la vie.
          </p>

          {/* CTA Button */}
          <button
            className="group bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-brand-orange/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
            onClick={() => window.location.href = '/auth'}
          >
            Commencer Gratuitement
            <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            Pas de carte de crédit requise • Fonctionne sur n'importe quel téléphone
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-orange rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-brand-purple dark:text-white mb-2">
              Leçons de Qualité
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Des leçons interactives conçues pour tous les âges, des enfants aux adultes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-orange rounded-2xl flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-brand-purple dark:text-white mb-2">
              Faible Consommation de Données
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Optimisé pour les connexions lentes et les forfaits de données limités.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-orange rounded-2xl flex items-center justify-center mb-4">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-brand-purple dark:text-white mb-2">
              Compétition de Village
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Affrontez d'autres villages et grimpez ensemble dans le classement.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-orange rounded-2xl flex items-center justify-center mb-4">
              <Trophy size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-brand-purple dark:text-white mb-2">
              Gagner des Récompenses
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Collectez des badges, des étoiles et des certificats au fur et à mesure que vous apprenez.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <p className="text-4xl md:text-5xl font-black text-brand-purple dark:text-white mb-4">
            10 000+ Apprenants
          </p>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
            Dans plus de 50 villages au Bénin
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-4xl">⭐</span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-zinc-500 dark:text-zinc-600">
        <p>© 2026 Le Hub. Autonomiser les communautés rurales par l'éducation.</p>
      </footer>
    </div>
  );
}
