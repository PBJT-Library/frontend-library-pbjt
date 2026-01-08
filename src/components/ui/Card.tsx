import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
        const baseStyles = 'bg-white dark:bg-slate-900 rounded-2xl transition-all duration-200';

        const variants = {
            default: 'shadow-card border border-slate-100 dark:border-slate-700',
            elevated: 'shadow-elevated dark:shadow-slate-900/50',
            bordered: 'border-2 border-slate-200 dark:border-slate-700',
        };

        const paddings = {
            none: '',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        };

        const hoverStyles = hover ? 'hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer' : '';

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variants[variant], paddings[padding], hoverStyles, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('mb-4 pb-4 border-b border-slate-100 dark:border-slate-600', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <h3
                ref={ref}
                className={cn('text-lg font-semibold text-slate-900 dark:text-slate-50', className)}
                {...props}
            >
                {children}
            </h3>
        );
    }
);

CardTitle.displayName = 'CardTitle';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardContent.displayName = 'CardContent';
