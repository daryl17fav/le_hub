import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
    size?: 'small' | 'medium' | 'large';
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
    const sizeMap = {
        small: { icon: 32, text: 'text-2xl' },
        medium: { icon: 48, text: 'text-4xl' },
        large: { icon: 64, text: 'text-5xl' }
    };

    return (
        <div className="flex items-center gap-3">
            <div className="bg-brand-purple rounded-2xl p-3 shadow-lg shadow-brand-purple/30">
                <GraduationCap size={sizeMap[size].icon} className="text-white" />
            </div>
            {showText && (
                <h1 className={`${sizeMap[size].text} font-black text-brand-purple text-zinc-900 tracking-tighter`}>
                    LE HUB
                </h1>
            )}
        </div>
    );
};

export default Logo;
