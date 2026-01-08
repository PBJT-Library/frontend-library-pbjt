import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
        const hasError = !!error;

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200',
                            'text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400',
                            'bg-white dark:bg-slate-700/50',
                            'focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-900',
                            hasError
                                ? 'border-error focus:border-error focus:ring-error/20'
                                : 'border-slate-300 dark:border-slate-500 focus:border-primary-500 dark:focus:border-blue-400 focus:ring-primary-500/20',
                            'disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:border-slate-200 dark:disabled:border-slate-700',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-error">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-300">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
