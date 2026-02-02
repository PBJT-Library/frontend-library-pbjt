import React, { useEffect, useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateLoan } from '../hooks/useLoans';
import { Select, Modal, ModalFooter, Button } from '@/components/ui';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useMembers } from '@/features/members/hooks/useMembers';
import { toast } from 'sonner';

interface LoanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoanFormModal: React.FC<LoanFormModalProps> = ({
    isOpen,
    onClose,
}) => {
    const createMutation = useCreateLoan();
    const [selectedMemberUuid, setSelectedMemberUuid] = useState('');
    const [selectedBookId, setSelectedBookId] = useState<number | ''>(''); // Book internal ID
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const { data: booksData } = useBooks({ page: 1, limit: 1000 }); // Get all books
    const { data: membersData } = useMembers({ page: 1, limit: 1000 }); // Get all members

    const books = booksData?.data || [];
    const members = membersData?.data || [];

    // Memoize filtered books to prevent re-computation
    const availableBooks = useMemo(() =>
        books.filter(book => book.status === 'available'),
        [books]
    );

    // Group books by title for better organization
    const groupedBooks = useMemo(() => {
        const groups: Record<string, typeof availableBooks> = {};

        availableBooks.forEach(book => {
            const key = book.title;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(book);
        });

        return groups;
    }, [availableBooks]);

    useEffect(() => {
        if (isOpen) {
            // Reset form when opening
            setSelectedMemberUuid('');
            setSelectedBookId('');
            // Set due date to 14 days from now
            const defaultDueDate = new Date();
            defaultDueDate.setDate(defaultDueDate.getDate() + 14);
            setDueDate(defaultDueDate);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedMemberUuid || !selectedBookId) {
            toast.error('Please select member and book');
            return;
        }

        try {
            const dueDateString = dueDate ? dueDate.toISOString().split('T')[0] : undefined;

            console.log('Submitting loan:', {
                member_uuid: selectedMemberUuid,
                book_id: selectedBookId,
                due_date: dueDateString,
            });

            await createMutation.mutateAsync({
                member_uuid: selectedMemberUuid,
                book_id: Number(selectedBookId),
                due_date: dueDateString,
            });

            toast.success('Book borrowed successfully! 📚');
            console.log('Loan created successfully');
            onClose();
        } catch (error: any) {
            console.error('Form submission error:', error);

            // Specific error messages for better UX
            const errorMsg = error.message || error.response?.data?.message || '';

            if (errorMsg.includes('Maksimal 3 buku')) {
                toast.error('⚠️ Member sudah pinjam 3 buku. Harus return dulu salah satu.', {
                    duration: 5000,
                });
            } else if (errorMsg.includes('tidak tersedia')) {
                toast.error('❌ Buku sedang tidak tersedia');
            } else if (errorMsg.includes('Member') && errorMsg.includes('tidak ditemukan')) {
                toast.error('Member tidak ditemukan');
            } else {
                toast.error(errorMsg || 'Failed to create loan');
            }
            // Don't close modal on error so user can retry
        }
    };

    const isValid = selectedMemberUuid && selectedBookId;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Borrow Book"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                    {/* Member Selection */}
                    <Select
                        label="Member"
                        value={selectedMemberUuid}
                        onChange={(e) => setSelectedMemberUuid(e.target.value)}
                        required
                    >
                        <option value="">Select member</option>
                        {members.map(member => (
                            <option key={member.uuid} value={member.uuid}>
                                {member.member_id} - {member.name}
                            </option>
                        ))}
                    </Select>

                    {/* Book Selection with Grouping */}
                    <Select
                        label="Select Book"
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value ? Number(e.target.value) : '')}
                        required
                    >
                        <option value="">Choose a book...</option>
                        {availableBooks.length === 0 ? (
                            <option disabled>No available books</option>
                        ) : (
                            Object.entries(groupedBooks).map(([title, booksInGroup]) => {
                                // If only one book with this title, show normally
                                if (booksInGroup.length === 1) {
                                    const book = booksInGroup[0];
                                    return (
                                        <option key={book.id} value={book.id}>
                                            {book.book_id} - {book.title} ({book.author || 'Unknown'})
                                        </option>
                                    );
                                }

                                // If multiple books with same title, group them
                                return (
                                    <optgroup key={title} label={`📚 ${title} (${booksInGroup.length} copies)`}>
                                        {booksInGroup.map(book => (
                                            <option key={book.id} value={book.id}>
                                                {book.book_id} - {book.author || 'Unknown'}
                                            </option>
                                        ))}
                                    </optgroup>
                                );
                            })
                        )}
                    </Select>

                    {/* Due Date */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Due Date
                        </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date: Date | null) => setDueDate(date)}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-900 border-slate-200 dark:border-slate-600 focus:border-primary-500 dark:focus:border-blue-400 focus:ring-primary-500/20"
                            wrapperClassName="w-full"
                            popperPlacement="bottom-start"
                            popperModifiers={[
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 8], // Horizontal offset, Vertical gap (8px space below input)
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
                            Default: 14 days from today
                        </p>
                    </div>
                </div>

                <ModalFooter>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={!isValid || createMutation.isPending}
                    >
                        {createMutation.isPending
                            ? 'Borrowing...'
                            : 'Borrow Book'
                        }
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
