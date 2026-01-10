import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loanSchema, type LoanFormData } from '../schemas/loanSchema';
import { useCreateLoan } from '../hooks/useLoans';
import { Input, Select, Modal, ModalFooter, Button } from '@/components/ui';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useMembers } from '@/features/members/hooks/useMembers';

interface LoanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoanFormModal: React.FC<LoanFormModalProps> = ({
    isOpen,
    onClose,
}) => {
    const createMutation = useCreateLoan();
    const [selectedBookId, setSelectedBookId] = useState('');

    const { data: booksData } = useBooks({ page: 1, limit: 100 });
    const { data: membersData } = useMembers({ page: 1, limit: 100 });

    const books = booksData?.data || [];
    const members = membersData?.data || [];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<LoanFormData>({
        resolver: zodResolver(loanSchema),
        defaultValues: {
            quantity: 1,
        },
    });

    const watchedBookId = watch('book_id');

    useEffect(() => {
        setSelectedBookId(watchedBookId);
    }, [watchedBookId]);

    useEffect(() => {
        if (isOpen) {
            reset({
                book_id: '',
                member_id: '',
                quantity: 1,
            });
            setSelectedBookId('');
        }
    }, [isOpen, reset]);

    const onSubmit = async (data: LoanFormData) => {
        try {
            await createMutation.mutateAsync(data);
            onClose();
        } catch (error) {
            // Error handled by mutation
        }
    };

    const selectedBook = books.find(b => b.id === selectedBookId);
    const maxQuantity = selectedBook?.stock || 0;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Borrow Book"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Select
                        label="Member"
                        {...register('member_id')}
                        error={errors.member_id?.message}
                    >
                        <option value="">Select member</option>
                        {members.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.id} - {member.name} ({member.study_program})
                            </option>
                        ))}
                    </Select>

                    <Select
                        label="Book"
                        {...register('book_id')}
                        error={errors.book_id?.message}
                    >
                        <option value="">Select book</option>
                        {books.map(book => (
                            <option key={book.id} value={book.id} disabled={book.stock === 0}>
                                {book.id} - {book.title} (Stock: {book.stock})
                            </option>
                        ))}
                    </Select>

                    <Input
                        label="Quantity"
                        type="number"
                        {...register('quantity', { valueAsNumber: true })}
                        error={errors.quantity?.message}
                        placeholder="1"
                        min="1"
                        max={maxQuantity}
                        helperText={selectedBook ? `Available stock: ${selectedBook.stock}` : undefined}
                    />
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
                        variant="primary"
                        isLoading={isSubmitting}
                    >
                        Borrow Book
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
