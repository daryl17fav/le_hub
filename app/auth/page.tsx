"use client";

import React, { useState, useRef } from 'react';
import { Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { useAuth } from '@/context/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

type AuthStep = 'phone' | 'otp';

export default function AuthPage() {
    const { signInWithPhone, confirmOtp } = useAuth();
    const [step, setStep] = useState<AuthStep>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerified, setIsVerified] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // Handle phone submission - Send SMS
    const handleSendCode = async () => {
        if (phone.length >= 8) {
            setLoading(true);
            setError('');
            try {
                const formattedPhone = `+229${phone}`;
                console.log('Sending code to:', formattedPhone);
                const result = await signInWithPhone(formattedPhone);
                setConfirmationResult(result);
                setStep('otp');
            } catch (err: unknown) {
                console.error('Error sending code:', err);
                const message = (err as Error).message || 'Échec de l\'envoi du code. Veuillez réessayer.';
                setError(message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle OTP input
    const handleOtpChange = async (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                otpRefs[index + 1].current?.focus();
            }

            // Auto-verify when all 6 digits entered
            if (newOtp.every(digit => digit !== '')) {
                setLoading(true);
                setError('');
                try {
                    const otpCode = newOtp.join('');
                    console.log('Verifying OTP:', otpCode);
                    if (!confirmationResult) {
                        throw new Error('Aucun résultat de confirmation trouvé');
                    }
                    await confirmOtp(confirmationResult, otpCode);
                    setIsVerified(true);

                    // Store phone number for profile selector
                    localStorage.setItem('phoneNumber', `+229${phone}`);

                    // Redirect to profile selector
                    setTimeout(() => {
                        window.location.href = '/select-profile';
                    }, 1500);
                } catch (err: unknown) {
                    console.error('Error verifying OTP:', err);
                    setError('Code invalide. Veuillez réessayer.');
                    setOtp(['', '', '', '', '', '']);
                    otpRefs[0].current?.focus();
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    // Handle OTP backspace
    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-purple/5 via-white to-brand-orange/5 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Back Button (except on phone step) */}
                {step !== 'phone' && !isVerified && (
                    <button
                        onClick={() => setStep('phone')}
                        className="mb-4 flex items-center gap-2 text-brand-purple dark:text-white hover:opacity-70 transition-opacity"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-bold">Retour</span>
                    </button>
                )}

                {/* Auth Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-8 md:p-10 shadow-2xl transition-all duration-300">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Logo size="medium" />
                    </div>

                    {/* Step 1: Phone Input */}
                    {step === 'phone' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                    Bienvenue sur Le Hub
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Entrez votre numéro de téléphone familial (8 ou 10 chiffres)
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
                                    <p className="text-red-600 dark:text-red-400 text-sm font-bold text-center">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="text-xs uppercase font-bold text-zinc-400 ml-2 block mb-2">
                                    Numéro de Téléphone
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-4 rounded-2xl">
                                        <Phone size={20} className="text-brand-purple" />
                                        <span className="font-bold text-brand-purple dark:text-white">+229</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="63035022 or 0163035022"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
                                        className="flex-1 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-brand-purple outline-none transition-all text-xl font-bold dark:text-white"
                                        maxLength={10}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSendCode}
                                disabled={phone.length < 8 || loading}
                                className="w-full bg-brand-orange hover:bg-brand-orange/90 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black text-lg py-5 rounded-2xl shadow-lg shadow-brand-orange/30 active:scale-95 transition-all duration-300"
                            >
                                {loading ? 'ENVOI EN COURS...' : 'ENVOYER LE CODE'}
                            </button>

                            <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
                                Nous vous enverrons un code de vérification par SMS
                            </p>

                            {/* IMPORTANT: reCAPTCHA container - required for Firebase */}
                            <div id="recaptcha-container"></div>
                        </div>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 'otp' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                    Entrez le Code de Vérification
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Nous avons envoyé un code au +229{phone}
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 animate-in shake">
                                    <p className="text-red-600 dark:text-red-400 text-sm font-bold text-center">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* OTP Input Squares - 6 digits */}
                            <div className="flex justify-center gap-2 md:gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={otpRefs[index]}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        disabled={loading || isVerified}
                                        className="w-12 h-12 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-black bg-zinc-100 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-brand-purple outline-none transition-all dark:text-white disabled:opacity-50"
                                    />
                                ))}
                            </div>

                            {/* Success Checkmark */}
                            {isVerified && (
                                <div className="flex justify-center animate-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <CheckCircle size={48} className="text-white" />
                                    </div>
                                </div>
                            )}

                            {!isVerified && (
                                <button
                                    onClick={async () => {
                                        setError('');
                                        setOtp(['', '', '', '', '', '']);
                                        setStep('phone');
                                        setConfirmationResult(null);
                                    }}
                                    disabled={loading}
                                    className="w-full text-brand-purple dark:text-brand-orange font-bold hover:opacity-70 transition-opacity disabled:opacity-50"
                                >
                                    Renvoyer le Code
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-6">
                    En continuant, vous acceptez nos Conditions et Politique de Confidentialité
                </p>
            </div>
        </div>
    );
}
