import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@/components/ui';
import type { Loan } from '@/services/mockData';

const editLoanSchema = z.object({
    dueDate: z.string().min(1, 'Due date is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
});

type EditLoanFormData = z.infer<typeof editLoanSchema>;

interface EditLoanModalProps {
    loan: Loan | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (loanId: string, data: EditLoanFormData) => Promise<void>;
}

export const EditLoanModal: React.FC<EditLoanModalProps> = ({
    loan,
    isOpen,
    onClose,
    onSave,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EditLoanFormData>({
        resolver: zodResolver(editLoanSchema),
        defaultValues: {
            dueDate: loan?.due_date || '',
            quantity: 1,
        },
    });

    React.useEffect(() => {
        if (loan) {
            reset({
                dueDate: loan.due_date,
                quantity: 1, // Default quantity
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
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
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{loan.id}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-300">Book</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{loan.book_title}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-300">Member</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{loan.member_name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-300">Borrow Date</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                                {new Date(loan.loan_date).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>

                    {/* Editable Fields */}
                    <Input
                        label="Due Date"
                        type="date"
                        {...register('dueDate')}
                        error={errors.dueDate?.message}
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${loan.returned
                            ? 'bg-success-light text-success-dark'
                            : new Date(loan.due_date) < new Date()
                                ? 'bg-error-light text-error-dark'
                                : 'bg-warning-light text-warning-dark'
                            }`}>
                            {loan.returned ? 'Returned' : new Date(loan.due_date) < new Date() ? 'Overdue' : 'Active'}
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
