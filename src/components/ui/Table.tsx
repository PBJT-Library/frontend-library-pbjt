import React from 'react';
import { cn } from '@/utils/cn';

// Table Container
export const Table = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div className="w-full overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <table
            ref={ref}
            className={cn('w-full caption-bottom text-sm', className)}
            {...props}
        />
    </div>
));
Table.displayName = 'Table';

// Table Header
export const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn('bg-slate-50 dark:bg-slate-800/50', className)}
        {...props}
    />
));
TableHeader.displayName = 'TableHeader';

// Table Body
export const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props}
    />
));
TableBody.displayName = 'TableBody';

// Table Row
export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            'border-b border-slate-100 dark:border-slate-800 transition-colors',
            'hover:bg-slate-50 dark:hover:bg-slate-800/30',
            'data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800',
            className
        )}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

// Table Head
export const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            'h-12 px-4 text-left align-middle font-semibold text-slate-700 dark:text-slate-200',
            'text-xs uppercase tracking-wider',
            '[&:has([role=checkbox])]:pr-0',
            className
        )}
        {...props}
    />
));
TableHead.displayName = 'TableHead';

// Table Cell
export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            'p-4 align-middle text-slate-900 dark:text-slate-100',
            '[&:has([role=checkbox])]:pr-0',
            className
        )}
        {...props}
    />
));
TableCell.displayName = 'TableCell';
