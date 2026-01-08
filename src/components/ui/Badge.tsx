import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'neutral', size = 'md', icon, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full transition-colors';

        const variants = {
            success: 'bg-success-light text-success-dark',
            warning: 'bg-warning-light text-warning-dark',
            error: 'bg-error-light text-error-dark',
            info: 'bg-info-light text-info-dark',
            neutral: 'bg-slate-100 text-slate-700',
            primary: 'bg-primary-100 text-primary-700',
        };

        const sizes = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-2.5 py-1 text-sm',
            lg: 'px-3 py-1.5 text-base',
        };

        return (
            <span
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <span>{children}</span>
            </span>
        );
    }
);

Badge.displayName = 'Badge';
