import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, type BookFormData } from '../schemas/bookSchema';
import { useCreateBook, useUpdateBook } from '../hooks/useBooks';
import { Input, Select, Modal, ModalFooter, Button } from '@/components/ui';
import type { Book } from '@/types';
import type { Category } from '@/types/category';
import { categoriesApi } from '@/services/api/categories.api';

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues: book ? {
            title: book.title,
            category_id: book.category_id,
            author: book.author || '',
            publisher: book.publisher || '',
            publication_year: book.publication_year || new Date().getFullYear(),
            quantity: 1, // Not editable in edit mode
        } : {
            title: '',
            author: '',
            publisher: '',
            publication_year: new Date().getFullYear(),
            quantity: 1,
            category_id: 0,
        },
    });

    // Fetch categories when modal opens
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const data = await categoriesApi.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            if (book) {
                reset({
                    title: book.title,
                    category_id: book.category_id,
                    author: book.author || '',
                    publisher: book.publisher || '',
                    publication_year: book.publication_year || new Date().getFullYear(),
                    quantity: 1,
                });
            } else {
                reset({
                    title: '',
                    category_id: categories[0]?.id || 0,
                    author: '',
                    publisher: '',
                    publication_year: new Date().getFullYear(),
                    quantity: 1,
                });
            }
        }
    }, [isOpen, book, reset, categories]);


    const onSubmit = async (data: BookFormData) => {
        try {
            if (isEditMode) {
                // When editing, don't send quantity
                const { quantity, ...updateData } = data;
                await updateMutation.mutateAsync({ book_id: book.book_id, data: updateData });
            } else {
                await createMutation.mutateAsync(data);
            }
            // Small delay to allow toast notification to appear before modal closes
            // Use a ref or cleanup to avoid state updates on unmounted component
            setTimeout(() => {
                onClose();
            }, 300);

            // Store timeout ID to clear if component unmounts
        } catch (error) {
            // Error handled by mutation
            console.error('Book form submission error:', error);
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

                    {/* Category - Dropdown by ID */}
                    <div className="col-span-2">
                        <Select
                            label="Category"
                            {...register('category_id', { valueAsNumber: true })}
                            error={errors.category_id?.message as string}
                            disabled={loadingCategories}
                        >
                            {loadingCategories ? (
                                <option value={0}>Loading categories...</option>
                            ) : categories.length === 0 ? (
                                <option value={0}>No categories available</option>
                            ) : (
                                <>
                                    <option value={0}>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.code} - {cat.name}
                                        </option>
                                    ))}
                                </>
                            )}
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
                            label="Publication Year"
                            type="number"
                            {...register('publication_year', { valueAsNumber: true })}
                            error={errors.publication_year?.message}
                            placeholder="2024"
                        />
                    </div>

                    {/* Quantity - Only show in create mode */}
                    {!isEditMode && (
                        <div className="col-span-2">
                            <Input
                                label="Quantity"
                                type="number"
                                {...register('quantity', { valueAsNumber: true })}
                                error={errors.quantity?.message}
                                placeholder="Number of copies"
                                helperText="Number of physical book copies to add. Each will get a unique book_id."
                            />
                        </div>
                    )}
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
                        {isEditMode ? 'Update Book' : 'Add Book'}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
