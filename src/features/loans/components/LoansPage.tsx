import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import { LoansTable } from './LoansTable';
import { LoanFormModal } from './LoanFormModal';
import { EditLoanModal } from './EditLoanModal';
import { useLoans, useReturnBook } from '../hooks/useLoans';
import { Button, Card } from '@/components/ui';
import type { Loan } from '@/types';

export const LoansPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'returned'>('all');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

    const limit = 10;

    const { data, isLoading, isError } = useLoans({
        page,
        limit,
        filters: {
            returned: statusFilter === 'all' ? undefined : statusFilter === 'returned',
        },
        sortBy: 'loan_date',
        sortOrder: 'desc',
    });

    const returnMutation = useReturnBook();

    const handleReturn = async (loan: Loan) => {
        if (window.confirm(`Kembalikan buku "${loan.book_title}"?`)) {
            try {
                await returnMutation.mutateAsync(loan.id);
                toast.success(
                    `Buku "${loan.book_title}" berhasil dikembalikan`,
                    {
                        description: `Peminjam: ${loan.member_name} | Tanggal: ${new Date().toLocaleDateString('id-ID')}`,
                        duration: 5000,
                    }
                );
            } catch (error) {
                toast.error('Gagal mengembalikan buku');
            }
        }
    };

    const handleEdit = (loan: Loan) => {
        setSelectedLoan(loan);
        setIsEditOpen(true);
    };

    const handleSaveEdit = async (_loanId: string, _data: { loan_date: string; quantity: number }) => {
        try {
            // TODO: Implement API call to update loan
            toast.success('Loan updated successfully');
            // Refetch data here
        } catch (error) {
            toast.error('Failed to update loan');
            throw error;
        }
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
                            variant={statusFilter === 'returned' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setStatusFilter('returned');
                                setPage(1);
                            }}
                        >
                            Returned
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
                onEdit={handleEdit}
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
        </div>
    );
};
