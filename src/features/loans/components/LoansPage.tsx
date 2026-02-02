import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

import { LoansTable } from './LoansTable';
import { LoanFormModal } from './LoanFormModal';
import { EditLoanModal } from './EditLoanModal';
import { useLoans, useReturnBook, useUpdateLoan, useDeleteLoan } from '../hooks/useLoans';
import { Button, Card, ConfirmationModal } from '@/components/ui';
import type { Loan } from '@/types';
import { usePreferences } from '@/hooks/usePreferences';



export const LoansPage: React.FC = () => {
    const { itemsPerPage } = usePreferences();
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

    // Confirmation modal states
    const [confirmAction, setConfirmAction] = useState<{
        isOpen: boolean;
        type: 'return' | 'bulk-return' | 'delete' | 'bulk-delete' | null;
        loan?: Loan | null;
        loanIds?: string[];
        loans?: Loan[];
    }>({ isOpen: false, type: null, loan: null });



    const { data, isLoading, isError } = useLoans({
        page,
        limit: itemsPerPage,
        filters: {
            status: statusFilter === 'all' ? undefined : statusFilter,
        },
        sortBy: 'loan_date',
        sortOrder: 'desc',
    });

    const returnMutation = useReturnBook();
    const updateMutation = useUpdateLoan();
    const deleteMutation = useDeleteLoan();


    const handleReturn = async (loan: Loan) => {
        setConfirmAction({ isOpen: true, type: 'return', loan });
    };

    const handleBulkReturn = (loanIds: string[]) => {
        setConfirmAction({ isOpen: true, type: 'bulk-return', loan: null, loanIds });
    };

    // handleReturnAll removed - bulk operations handled by LoansTable internally

    const handleEdit = (loan: Loan) => {
        setSelectedLoan(loan);
        setIsEditOpen(true);
    };

    const handleSaveEdit = async (
        loanId: string,
        data: {
            book_id?: number;
            due_date?: string;
        }
    ) => {
        await updateMutation.mutateAsync({ id: loanId, data });
        setIsEditOpen(false);
        setSelectedLoan(null);
    };

    const handleDelete = async (loan: Loan) => {
        setConfirmAction({ isOpen: true, type: 'delete', loan, loans: [loan] });
    };

    const handleBulkDelete = (loanIds: string[]) => {
        // Get loan objects for display in confirmation
        const loansToDelete = loans.filter(loan => loanIds.includes(loan.loan_id));
        setConfirmAction({
            isOpen: true,
            type: 'bulk-delete',
            loanIds,
            loans: loansToDelete,
        });
    };

    const handleConfirmAction = async () => {
        if (confirmAction.type === 'return' && confirmAction.loan) {
            await returnMutation.mutateAsync(confirmAction.loan.loan_id);
        } else if (confirmAction.type === 'delete' && confirmAction.loan) {
            await deleteMutation.mutateAsync(confirmAction.loan.loan_id);
        } else if (confirmAction.type === 'bulk-return' && confirmAction.loanIds) {
            // Return loans sequentially to avoid race conditions
            for (const loanId of confirmAction.loanIds) {
                try {
                    await returnMutation.mutateAsync(loanId);
                } catch (error) {
                    console.error(`Failed to return loan ${loanId}:`, error);
                }
            }
        } else if (confirmAction.type === 'bulk-delete' && confirmAction.loanIds) {
            // Delete loans sequentially
            for (const loanId of confirmAction.loanIds) {
                try {
                    await deleteMutation.mutateAsync(loanId);
                } catch (error) {
                    console.error(`Failed to delete loan ${loanId}:`, error);
                }
            }
        }

        setConfirmAction({ isOpen: false, type: null, loan: null });
    };

    const loans = data?.data || [];
    const pagination = data?.pagination;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Loans</h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Manage book borrowing and returns</p>
                </div>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                >
                    Borrow Book
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Status:</label>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant={statusFilter === 'all' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setStatusFilter('all');
                                setPage(1);
                            }}
                        >
                            All
                        </Button>
                        <Button
                            size="sm"
                            variant={statusFilter === 'active' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setStatusFilter('active');
                                setPage(1);
                            }}
                        >
                            Active
                        </Button>
                        <Button
                            size="sm"
                            variant={statusFilter === 'completed' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setStatusFilter('completed');
                                setPage(1);
                            }}
                        >
                            Returned
                        </Button>
                        <Button
                            size="sm"
                            variant={statusFilter === 'overdue' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setStatusFilter('overdue');
                                setPage(1);
                            }}
                        >
                            Overdue
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Error State */}
            {isError && (
                <div className="bg-error-light border border-error rounded-xl p-4">
                    <p className="text-error-dark font-medium">Failed to load loans</p>
                    <p className="text-error text-sm mt-1">Please try again later</p>
                </div>
            )}

            {/* Table */}
            <LoansTable
                loans={loans}
                isLoading={isLoading}
                onReturn={handleReturn}
                onBulkReturn={handleBulkReturn}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBulkDelete={handleBulkDelete}
            />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                        {pagination.total} results
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={pagination.page === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Page {pagination.page} of {pagination.totalPages}
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={pagination.page === pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Borrow Modal */}
            <LoanFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />

            {/* Edit Loan Modal */}
            <EditLoanModal
                loan={selectedLoan}
                isOpen={isEditOpen}
                onClose={() => {
                    setIsEditOpen(false);
                    setSelectedLoan(null);
                }}
                onSave={handleSaveEdit}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmAction.isOpen}
                onClose={() => setConfirmAction({ isOpen: false, type: null, loan: null })}
                onConfirm={handleConfirmAction}
                title={
                    confirmAction.type === 'return'
                        ? 'Kembalikan Buku'
                        : confirmAction.type === 'bulk-return'
                            ? 'Kembalikan Banyak Buku'
                            : confirmAction.type === 'bulk-delete'
                                ? `Hapus ${confirmAction.loans?.length || 0} Peminjaman`
                                : 'Hapus Data Peminjaman'
                }
                message={
                    confirmAction.type === 'return'
                        ? `Apakah Anda yakin ingin mengembalikan buku dari peminjaman ${confirmAction.loan?.loan_id}?`
                        : confirmAction.type === 'bulk-return'
                            ? `Apakah Anda yakin ingin mengembalikan ${confirmAction.loanIds?.length || 0} buku yang dipilih?`
                            : confirmAction.type === 'bulk-delete' && confirmAction.loans
                                ? (
                                    <div className="space-y-3">
                                        <p className="text-slate-700 dark:text-slate-300">
                                            Ini akan menghapus <strong>{confirmAction.loans.length} peminjaman</strong> yang sudah dikembalikan:
                                        </p>
                                        <div className="max-h-48 overflow-y-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2 border border-slate-200 dark:border-slate-700">
                                            {confirmAction.loans.map((loan) => (
                                                <div key={loan.id} className="flex items-start gap-2 text-sm">
                                                    <span className="text-slate-500 dark:text-slate-400">•</span>
                                                    <div className="flex-1">
                                                        <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">{loan.loan_id}</span>
                                                        {' - '}
                                                        <span className="text-slate-700 dark:text-slate-300">{loan.member_name}</span>
                                                        {' - '}
                                                        <span className="text-slate-600 dark:text-slate-400 italic">"{loan.book_title}"</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            ⚠️ Semua peminjaman sudah dikembalikan. Aksi ini tidak dapat dibatalkan.
                                        </p>
                                    </div>
                                )
                                : `Apakah Anda yakin ingin menghapus data peminjaman buku oleh ${confirmAction.loan?.member_name}? Data yang sudah dihapus tidak dapat dikembalikan.`
                }
                confirmText={
                    confirmAction.type === 'return'
                        ? 'Ya, Kembalikan'
                        : confirmAction.type === 'bulk-return'
                            ? 'Ya, Kembalikan Semua'
                            : confirmAction.type === 'bulk-delete'
                                ? `Ya, Hapus ${confirmAction.loans?.length || 0} Peminjaman`
                                : 'Ya, Hapus'
                }
                cancelText="Batal"
                variant="destructive"
                isLoading={returnMutation.isPending || deleteMutation.isPending}
            />
        </div>
    );
};
