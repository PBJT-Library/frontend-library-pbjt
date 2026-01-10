import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, type BookFormData } from '../schemas/bookSchema';
import { useCreateBook, useUpdateBook } from '../hooks/useBooks';
import { Input, Select, Modal, ModalFooter, Button } from '@/components/ui';
import type { Book } from '@/types';
import { ACADEMIC_CATEGORIES, REGULAR_CATEGORIES } from '@/services/constants/categories';

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    book?: Book; // If provided, edit mode
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
    isOpen,
    onClose,
    book,
}) => {
    const isEditMode = !!book;
    const createMutation = useCreateBook();
    const updateMutation = useUpdateBook();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues: book ? {
            id: book.id,
            title: book.title,
            category: book.category,
            author: book.author,
            publisher: book.publisher,
            year: book.year,
            stock: book.stock,
        } : {
            id: '',
            title: '',
            author: '',
            publisher: '',
            year: new Date().getFullYear(),
            stock: 1,
            category: 'Programming',
        },
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            if (book) {
                reset({
                    id: book.id,
                    title: book.title,
                    category: book.category,
                    author: book.author,
                    publisher: book.publisher,
                    year: book.year,
                    stock: book.stock,
                });
            } else {
                reset({
                    id: '',
                    title: '',
                    category: 'Programming',
                    author: '',
                    publisher: '',
                    year: new Date().getFullYear(),
                    stock: 1,
                });
            }
        }
    }, [isOpen, book, reset]);

    const onSubmit = async (data: BookFormData) => {
        try {
            if (isEditMode) {
                await updateMutation.mutateAsync({ id: book.id, data });
            } else {
                await createMutation.mutateAsync(data);
            }
            onClose();
        } catch (error) {
            // Error handled by mutation
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Book' : 'Add New Book'}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    {/* Book ID - Only show in create mode */}
                    {!isEditMode && (
                        <div className="col-span-2">
                            <Input
                                label="Book ID"
                                {...register('id')}
                                error={errors.id?.message}
                                placeholder="e.g., BK001, BK002"
                                helperText="Unique identifier for the book (e.g., BK001)"
                            />
                        </div>
                    )}

                    {/* Title */}
                    <div className="col-span-2">
                        <Input
                            label="Title"
                            {...register('title')}
                            error={errors.title?.message}
                            placeholder="Enter book title"
                        />
                    </div>

                    {/* Author */}
                    <div className="col-span-2">
                        <Input
                            label="Author"
                            {...register('author')}
                            error={errors.author?.message}
                            placeholder="Enter author name"
                        />
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                        <Select
                            label="Category"
                            {...register('category')}
                            error={errors.category?.message as string}
                        >
                            <optgroup label="📚 Academic Works">
                                {ACADEMIC_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup label="📖 Regular Books">
                                {REGULAR_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </optgroup>
                        </Select>
                    </div>

                    {/* Publisher */}
                    <div>
                        <Input
                            label="Publisher"
                            {...register('publisher')}
                            error={errors.publisher?.message}
                            placeholder="Enter publisher"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <Input
                            label="Year"
                            type="number"
                            {...register('year', { valueAsNumber: true })}
                            error={errors.year?.message}
                            placeholder="2024"
                        />
                    </div>

                    {/* Stock */}
                    <div className="col-span-2">
                        <Input
                            label="Stock"
                            type="number"
                            {...register('stock', { valueAsNumber: true })}
                            error={errors.stock?.message}
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Actions */}
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
                        {isEditMode ? 'Update Book' : 'Create Book'}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
