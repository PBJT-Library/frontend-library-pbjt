import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@/components/ui';
import type { Loan } from '@/types';

const editLoanSchema = z.object({
    book_id: z.string().min(1, 'Please select a book'),
    member_id: z.string().min(1, 'Please select a member'),
    loan_date: z.string().min(1, 'Loan date is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
});

type EditLoanFormData = z.infer<typeof editLoanSchema>;

interface EditLoanModalProps {
    loan: Loan | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (loanId: string, data: EditLoanFormData) => Promise<void>;
    // add props for book and member
    books: Array<{ id: string; title: string; author: string; stock: number }>;
    members: Array<{ id: string; name: string }>;
}

export const EditLoanModal: React.FC<EditLoanModalProps> = ({
    loan,
    isOpen,
    onClose,
    onSave,
    books,
    members,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<EditLoanFormData>({
        resolver: zodResolver(editLoanSchema),
        defaultValues: {
            book_id: loan?.book_id || '',
            member_id: loan?.member_id || '',
            loan_date: loan?.loan_date || '',
            quantity: loan?.quantity || 1,
        },
    });

    const selectedBookId = watch('book_id');
    const selectedMemberId = watch('member_id');

    const selectedBook = books?.find(b => b.id === selectedBookId);
    const selectedMember = members?.find(m => m.id === selectedMemberId);

    React.useEffect(() => {
        if (loan) {
            reset({
                book_id: loan.book_id,
                member_id: loan.member_id,
                loan_date: loan.loan_date,
                quantity: loan.quantity,
            });
        }
    }, [loan, reset]);

    const onSubmit = async (data: EditLoanFormData) => {
        if (!loan) return;

        try {
            await onSave(loan.id, data);
            onClose();
        } catch (error) {
            // Error handled by parent
        }
    };

    if (!isOpen || !loan) return null;

    if (!books || !members) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <p className="text-slate-700 dark:text-slate-300">Loading data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        Edit Loan
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        disabled={isSubmitting}
                    >
                        <XMarkIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Read-only Info */}
                    <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-300">Loan ID</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                                {loan.id}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-300">Status</p>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${loan.return_date
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}
                            >
                                {loan.return_date ? 'Returned' : 'Active'}
                            </span>
                        </div>
                    </div>

                    {/* Select Book */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Book <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register('book_id')}
                            disabled={isSubmitting}
                            className={`
                            w-full px-4 py-2.5 rounded-lg
                            bg-white dark:bg-slate-900
                            border ${errors.book_id
                                    ? 'border-red-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                }
                            text-slate-900 dark:text-slate-100
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-colors
                        `}
                        >
                            <option value="">-- Select Book --</option>
                            {books?.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title} - {book.author} (Stock: {book.stock})
                                </option>
                            ))}
                        </select>
                        {errors.book_id && (
                            <p className="text-sm text-red-500">{errors.book_id.message}</p>
                        )}
                        {/* Preview selected book */}
                        {selectedBook && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                Selected: <strong>{selectedBook.title}</strong> by {selectedBook.author}
                            </div>
                        )}
                    </div>

                    {/* Select Member */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Member <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register('member_id')}
                            disabled={isSubmitting}
                            className={`
                            w-full px-4 py-2.5 rounded-lg
                            bg-white dark:bg-slate-900
                            border ${errors.member_id
                                    ? 'border-red-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                }
                            text-slate-900 dark:text-slate-100
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-colors
                        `}
                        >
                            <option value="">-- Select Member --</option>
                            {members?.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                        {errors.member_id && (
                            <p className="text-sm text-red-500">{errors.member_id.message}</p>
                        )}
                        {/* Preview selected member */}
                        {selectedMember && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                Selected: <strong>{selectedMember.name}</strong>
                            </div>
                        )}
                    </div>

                    {/* Editable Fields */}
                    <Input
                        label="Loan Date"
                        type="date"
                        {...register('loan_date')}
                        error={errors.loan_date?.message}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="Quantity"
                        type="number"
                        {...register('quantity', { valueAsNumber: true })}
                        error={errors.quantity?.message}
                        disabled={isSubmitting}
                        min={1}
                        helperText="Number of books borrowed"
                    />

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${loan.return_date
                            ? 'bg-success-light text-success-dark'
                            : 'bg-warning-light text-warning-dark'
                            }`}>
                            {loan.return_date ? 'Returned' : 'Active'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isSubmitting}
                            className="flex-1"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
