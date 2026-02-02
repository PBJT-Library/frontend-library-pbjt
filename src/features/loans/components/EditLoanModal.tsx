import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, Modal, ModalFooter, Button } from '@/components/ui';
import { useBooks } from '@/features/books/hooks/useBooks';
import type { Loan } from '@/types';
import { toast } from 'sonner';

interface EditLoanModalProps {
    loan: Loan | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (loanId: string, data: { book_id?: number; due_date?: string }) => Promise<void>;
}

export const EditLoanModal: React.FC<EditLoanModalProps> = ({
    loan,
    isOpen,
    onClose,
    onSave,
}) => {
    const [selectedBookId, setSelectedBookId] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: booksData } = useBooks({ page: 1, limit: 100 });
    const books = booksData?.data || [];

    // Get current book from loan - backend returns book_display_id and book_title directly
    const currentBookId = loan?.book_id || '';
    const currentBook = books.find(b => b.book_id === currentBookId);

    // Filter available books (with stock > 0) + currently borrowed book
    const availableBooks = books.filter(book => {
        const isCurrentBook = book.book_id === currentBookId;
        return (book.status === 'available') || isCurrentBook;
    });

    useEffect(() => {
        if (isOpen && loan) {
            // Initialize with current book
            setSelectedBookId(currentBookId);
            // Convert ISO date to Date object for DatePicker
            setDueDate(loan.due_date ? new Date(loan.due_date) : null);
        }
    }, [isOpen, loan, currentBookId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedBookId) {
            toast.error('Please select a book');
            return;
        }

        if (!loan) return;

        setIsSubmitting(true);
        try {
            // Only send book_id if it changed
            const updates: { book_id?: number; due_date?: string } = {};

            if (selectedBookId !== currentBookId) {
                updates.book_id = parseInt(selectedBookId);
            }

            if (dueDate) {
                const dueDateString = dueDate.toISOString().split('T')[0];
                const currentDueDate = loan.due_date ? new Date(loan.due_date).toISOString().split('T')[0] : '';
                if (dueDateString !== currentDueDate) {
                    updates.due_date = dueDateString;
                }
            }

            if (Object.keys(updates).length === 0) {
                toast.info('No changes made');
                onClose();
                return;
            }

            await onSave(loan.loan_id, updates);
            toast.success('Loan updated successfully');
            onClose();
        } catch (error: any) {
            console.error('Edit loan error:', error);
            toast.error(error.message || 'Failed to update loan');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !loan) return null;

    const isActive = loan.status === 'active';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Loan"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                    {/* Read-only Info */}
                    <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Loan ID</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {loan.loan_id}
                                </p>
                            </div>
                            <div>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isActive
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        }`}
                                >
                                    {isActive ? 'Active' : 'Returned'}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Member</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {loan.member_name} ({loan.member_id})
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Current Book</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {currentBook?.title || 'Unknown'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Loan Date</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {new Date(loan.loan_date).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Change Book - Simple Dropdown */}
                    <Select
                        label="Change Book To"
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value)}
                        required
                    >
                        <option value="">Choose a book...</option>
                        {availableBooks.map(book => (
                            <option key={book.book_id} value={book.book_id}>
                                {book.title} - {book.author}
                                {book.book_id === currentBookId
                                    ? ' (Current)'
                                    : ` (${book.status})`
                                }
                            </option>
                        ))}
                    </Select>

                    {/* Due Date */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Due Date (Return By)
                        </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date: Date | null) => setDueDate(date)}
                            minDate={loan.loan_date ? new Date(loan.loan_date) : new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-900 border-slate-200 dark:border-slate-600 focus:border-primary-500 dark:focus:border-blue-400 focus:ring-primary-500/20"
                            wrapperClassName="w-full"
                            popperPlacement="bottom-start"
                            popperModifiers={[
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 8],
                                    },
                                },
                                {
                                    name: 'preventOverflow',
                                    options: {
                                        rootBoundary: 'viewport',
                                        tether: false,
                                        altAxis: true,
                                    },
                                },
                                {
                                    name: 'flip',
                                    options: {
                                        fallbackPlacements: ['top-start', 'bottom-end', 'top-end'],
                                    },
                                },
                            ] as any}
                            withPortal
                        />
                        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                            Extend or change the return date
                        </p>
                    </div>
                </div>

                <ModalFooter>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={!selectedBookId || isSubmitting}
                    >
                        {isSubmitting
                            ? 'Saving...'
                            : 'Save Changes'
                        }
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
