import React from 'react';
import { cn } from '@/utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helperText, children, ...props }, ref) => {
        const hasError = !!error;

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={cn(
                            'w-full px-4 py-2.5 pr-10 rounded-xl border-2 transition-all duration-200',
                            'text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800',
                            'focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-900',
                            'appearance-none cursor-pointer',
                            hasError
                                ? 'border-error focus:border-error focus:ring-error/20'
                                : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 dark:focus:border-blue-400 focus:ring-primary-500/20',
                            'disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:border-slate-200 dark:disabled:border-slate-700',
                            className
                        )}
                        {...props}
                    >
                        {children}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
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

Select.displayName = 'Select';
