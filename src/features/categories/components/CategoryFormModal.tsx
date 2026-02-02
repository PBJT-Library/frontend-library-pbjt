import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryFormData } from '../schemas/categorySchema';
import { useCreateCategory, useUpdateCategory } from '../hooks/useCategories';
import { Input, Modal, ModalFooter, Button } from '@/components/ui';
import type { Category } from '@/types/category';

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
    isOpen,
    onClose,
    category,
}) => {
    const isEditMode = !!category;
    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: category ? {
            code: category.code,
            name: category.name,
            description: category.description || '',
        } : {
            code: '',
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (category) {
                reset({
                    code: category.code,
                    name: category.name,
                    description: category.description || '',
                });
            } else {
                reset({
                    code: '',
                    name: '',
                    description: '',
                });
            }
        }
    }, [isOpen, category, reset]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if (isEditMode) {
                await updateMutation.mutateAsync({
                    code: category.code,
                    data: { name: data.name, description: data.description },
                });
            } else {
                await createMutation.mutateAsync(data);
            }
            // Small delay to allow toast notification to appear before modal closes
            setTimeout(() => {
                onClose();
            }, 300);
        } catch (error) {
            // Error handled by mutation
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Category' : 'Add New Category'}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    {/* Code */}
                    <Input
                        label="Category Code"
                        {...register('code')}
                        error={errors.code?.message}
                        placeholder="e.g., INF, TI, MAN"
                        helperText="2-10 uppercase letters/numbers"
                        disabled={isEditMode}
                    />

                    {/* Name */}
                    <Input
                        label="Category Name"
                        {...register('name')}
                        error={errors.name?.message}
                        placeholder="e.g., Informatika, Teknik Industri"
                    />

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Brief description of this category..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-error">{errors.description.message}</p>
                        )}
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
                        {isEditMode ? 'Update Category' : 'Add Category'}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
