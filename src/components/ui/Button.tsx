import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant = 'primary',
        size = 'md',
        isLoading,
        leftIcon,
        rightIcon,
        children,
        disabled,
        ...props
    }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
            secondary: 'bg-white dark:bg-slate-800 text-primary-700 dark:text-blue-300 border-2 border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 focus:ring-primary-500',
            outline: 'border-2 border-primary-600 dark:border-blue-400 text-primary-600 dark:text-blue-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
            ghost: 'text-primary-600 dark:text-blue-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
            destructive: 'bg-error text-white hover:bg-error-dark focus:ring-error shadow-sm hover:shadow-md',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm gap-1.5',
            md: 'px-4 py-2.5 text-base gap-2',
            lg: 'px-6 py-3 text-lg gap-2.5',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                <span>{children}</span>
                {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
