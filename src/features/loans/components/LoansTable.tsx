import React, { useState } from 'react';
import { ArrowUturnLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Loan } from '@/types';
import { LoadingSpinner, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Button } from '@/components/ui';
import { usePreferences } from '@/hooks/usePreferences';
import { formatDate } from '@/utils/dateFormatter';

interface LoansTableProps {
    loans: Loan[];
    isLoading?: boolean;
    onReturn: (loan: Loan) => void;
    onBulkReturn: (loanIds: string[]) => void;
    onEdit: (loan: Loan) => void;
    onDelete: (loan: Loan) => void;
    onBulkDelete: (loanIds: string[]) => void;
}

export const LoansTable: React.FC<LoansTableProps> = ({
    loans,
    isLoading,
    onReturn,
    onBulkReturn,
    onEdit,
    onDelete,
    onBulkDelete,
}) => {
    const { dateFormat } = usePreferences();
    const [selectedLoans, setSelectedLoans] = useState<Set<number>>(new Set());
    const [selectedDeleteLoans, setSelectedDeleteLoans] = useState<Set<number>>(new Set());

    // Get all active loan IDs
    const activeLoans = loans.filter(loan => loan.status === 'active');
    const activeLoanIds = activeLoans.map(loan => loan.id);

    // Get all returned loan IDs
    const returnedLoans = loans.filter(loan => loan.status === 'completed');
    const returnedLoanIds = returnedLoans.map(loan => loan.id);

    const handleSelectAll = () => {
        if (selectedLoans.size === activeLoanIds.length) {
            setSelectedLoans(new Set());
        } else {
            setSelectedLoans(new Set(activeLoanIds));
        }
    };

    const handleSelectAllReturned = () => {
        if (selectedDeleteLoans.size === returnedLoanIds.length) {
            setSelectedDeleteLoans(new Set());
        } else {
            setSelectedDeleteLoans(new Set(returnedLoanIds));
        }
    };

    const handleToggleLoan = (loanId: number) => {
        setSelectedLoans(prev => {
            const newSet = new Set(prev);
            if (newSet.has(loanId)) {
                newSet.delete(loanId);
            } else {
                newSet.add(loanId);
            }
            return newSet;
        });
    };

    const handleToggleDeleteLoan = (loanId: number) => {
        setSelectedDeleteLoans(prev => {
            const newSet = new Set(prev);
            if (newSet.has(loanId)) {
                newSet.delete(loanId);
            } else {
                newSet.add(loanId);
            }
            return newSet;
        });
    };

    const handleBulkReturn = () => {
        // Get loan_id (display IDs) for selected loans
        const selectedLoanIds = loans
            .filter(loan => selectedLoans.has(loan.id))
            .map(loan => loan.loan_id);

        onBulkReturn(selectedLoanIds);
        setSelectedLoans(new Set());
    };

    const handleBulkDelete = () => {
        // Get loan_id (display IDs) for selected delete loans
        const selectedLoanIds = loans
            .filter(loan => selectedDeleteLoans.has(loan.id))
            .map(loan => loan.loan_id);

        onBulkDelete(selectedLoanIds);
        setSelectedDeleteLoans(new Set());
    };

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

    return (
        <div>
            {/* Bulk Action Bar - Return */}
            {activeLoans.length > 0 && (
                <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedLoans.size === activeLoanIds.length && activeLoanIds.length > 0}
                                onChange={handleSelectAll}
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Select All Active Loans
                            </span>
                        </label>
                        {selectedLoans.size > 0 && (
                            <Badge variant="info" size="sm">
                                {selectedLoans.size} selected
                            </Badge>
                        )}
                    </div>
                    {selectedLoans.size > 0 && (
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={handleBulkReturn}
                            leftIcon={<ArrowUturnLeftIcon className="w-4 h-4" />}
                        >
                            Return Selected ({selectedLoans.size})
                        </Button>
                    )}
                </div>
            )}

            {/* Bulk Action Bar - Delete */}
            {returnedLoans.length > 0 && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedDeleteLoans.size === returnedLoanIds.length && returnedLoanIds.length > 0}
                                onChange={handleSelectAllReturned}
                                className="w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">
                                Select All Returned Loans
                            </span>
                        </label>
                        {selectedDeleteLoans.size > 0 && (
                            <Badge variant="error" size="sm">
                                {selectedDeleteLoans.size} selected
                            </Badge>
                        )}
                    </div>
                    {selectedDeleteLoans.size > 0 && (
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleBulkDelete}
                            leftIcon={<TrashIcon className="w-4 h-4" />}
                        >
                            Delete Selected ({selectedDeleteLoans.size})
                        </Button>
                    )}
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">Select</TableHead>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Book</TableHead>
                        <TableHead>Loan Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loans.map((loan) => {
                        const isActive = loan.status === 'active';

                        return (
                            <TableRow key={loan.id}>
                                <TableCell>
                                    {isActive ? (
                                        <input
                                            type="checkbox"
                                            checked={selectedLoans.has(loan.id)}
                                            onChange={() => handleToggleLoan(loan.id)}
                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={selectedDeleteLoans.has(loan.id)}
                                            onChange={() => handleToggleDeleteLoan(loan.id)}
                                            className="w-4 h-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                                        {loan.loan_id}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium text-slate-900 dark:text-slate-50">
                                        {loan.member_name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-slate-900 dark:text-slate-50">
                                        {loan.book_title || 'N/A'}
                                    </div>
                                    {loan.book_id && (
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            ID: {loan.book_id}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {formatDate(loan.loan_date, dateFormat)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {formatDate(loan.due_date, dateFormat)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={isActive ? 'warning' : 'success'}
                                        size="sm"
                                    >
                                        {isActive ? 'Active' : 'Returned'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        {isActive ? (
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
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onDelete(loan)}
                                                leftIcon={<TrashIcon className="w-4 h-4" />}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
