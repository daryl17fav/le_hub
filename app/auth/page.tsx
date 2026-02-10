"use client";

import React, { useState, useRef } from 'react';
import { Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import Logo from '@/components/shared/Logo';

type AuthStep = 'phone' | 'otp';

export default function AuthPage() {
    const [step, setStep] = useState<AuthStep>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isVerified, setIsVerified] = useState(false);

    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // Handle phone submission
    const handleSendCode = () => {
        if (phone.length >= 10) {
            // TODO: Integrate Firebase signInWithPhoneNumber
            console.log('Sending code to:', `+234${phone}`);
            setStep('otp');
        }
    };

    // Handle OTP input
    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 3) {
                otpRefs[index + 1].current?.focus();
            }

            // Auto-verify when all 4 digits entered
            if (newOtp.every(digit => digit !== '')) {
                setTimeout(() => {
                    // TODO: Integrate Firebase confirmationResult.confirm(code)
                    console.log('Verifying OTP:', newOtp.join(''));
                    setIsVerified(true);

                    // Store phone number for profile selector
                    localStorage.setItem('phoneNumber', `+234${phone}`);

                    // Redirect to profile selector
                    setTimeout(() => {
                        window.location.href = '/select-profile';
                    }, 1500);
                }, 500);
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
                        <span className="font-bold">Back</span>
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
                                    Welcome to The Hub
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Enter your family phone number
                                </p>
                            </div>

                            <div>
                                <label className="text-xs uppercase font-bold text-zinc-400 ml-2 block mb-2">
                                    Phone Number
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-4 rounded-2xl">
                                        <Phone size={20} className="text-brand-purple" />
                                        <span className="font-bold text-brand-purple dark:text-white">+234</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="8012345678"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        className="flex-1 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-brand-purple outline-none transition-all text-xl font-bold dark:text-white"
                                        maxLength={10}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSendCode}
                                disabled={phone.length < 10}
                                className="w-full bg-brand-orange hover:bg-brand-orange/90 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black text-lg py-5 rounded-2xl shadow-lg shadow-brand-orange/30 active:scale-95 transition-all duration-300"
                            >
                                SEND CODE
                            </button>

                            <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
                                We'll send you a verification code via SMS
                            </p>
                        </div>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 'otp' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-brand-purple dark:text-white mb-2">
                                    Enter Verification Code
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    We sent a code to +234{phone}
                                </p>
                            </div>

                            {/* OTP Input Squares */}
                            <div className="flex justify-center gap-4">
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
                                        className="w-16 h-16 md:w-20 md:h-20 text-center text-3xl font-black bg-zinc-100 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-brand-purple outline-none transition-all dark:text-white"
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
                                    onClick={() => console.log('Resending code...')}
                                    className="w-full text-brand-purple dark:text-brand-orange font-bold hover:opacity-70 transition-opacity"
                                >
                                    Resend Code
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-6">
                    By continuing, you agree to our Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
}
