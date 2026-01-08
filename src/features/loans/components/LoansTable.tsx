import React from 'react';
import { ArrowUturnLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import type { Loan } from '@/types';
import { LoadingSpinner, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Button } from '@/components/ui';

interface LoansTableProps {
    loans: Loan[];
    isLoading?: boolean;
    onReturn: (loan: Loan) => void;
    onEdit: (loan: Loan) => void;
}

export const LoansTable: React.FC<LoansTableProps> = ({
    loans,
    isLoading,
    onReturn,
    onEdit,
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
                <p className="ml-4 text-slate-600 dark:text-slate-300">Loading loans...</p>
            </div>
        );
    }

    if (loans.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">No loans found</h3>
                <p className="text-slate-600 dark:text-slate-300">Try adjusting your filters</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Loan Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loans.map((loan) => {
                    const isActive = !loan.return_date;

                    return (
                        <TableRow key={loan.id}>
                            <TableCell>
                                <div className="font-mono text-xs text-slate-600 dark:text-slate-400">{loan.uuid}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-slate-900 dark:text-slate-50">{loan.member_name}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-slate-900 dark:text-slate-100">{loan.book_title}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-slate-600 dark:text-slate-300">{loan.quantity}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-slate-600 dark:text-slate-300">{formatDate(loan.loan_date)}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-slate-600 dark:text-slate-300">
                                    {loan.return_date ? formatDate(loan.return_date) : '-'}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={isActive ? 'warning' : 'success'} size="sm">
                                    {isActive ? 'Active' : 'Returned'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    {isActive && (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onEdit(loan)}
                                                leftIcon={<PencilIcon className="w-4 h-4" />}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => onReturn(loan)}
                                                leftIcon={<ArrowUturnLeftIcon className="w-4 h-4" />}
                                            >
                                                Return
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
