import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    className = ''
}) => {
    const baseStyles = "font-bold rounded-2xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles = {
        small: "px-6 py-3 text-sm min-h-[48px]",
        medium: "px-8 py-4 text-base min-h-[60px]",
        large: "px-10 py-5 text-lg min-h-[72px]"
    };

    const variantStyles = {
        primary: "bg-brand-purple text-white hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/30",
        secondary: "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-lg shadow-brand-orange/30",
        outline: "border-4 border-brand-purple text-brand-purple dark:text-white hover:bg-brand-purple hover:text-white"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
