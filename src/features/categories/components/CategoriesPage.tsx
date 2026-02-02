import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CategoriesTable } from './CategoriesTable';
import { CategoryFormModal } from './CategoryFormModal';
import { useCategories, useDeleteCategory } from '../hooks/useCategories';
import { Button, Card, ConfirmationModal } from '@/components/ui';
import type { Category } from '@/types/category';
import { useAuthStore } from '@/features/auth/store/authStore';

export const CategoriesPage: React.FC = () => {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'admin';

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>();

    // Confirmation modal state
    const [confirmDelete, setConfirmDelete] = useState<{
        isOpen: boolean;
        category: Category | null;
        canDelete: boolean;
    }>({ isOpen: false, category: null, canDelete: true });

    const { data: categories = [], isLoading, isError } = useCategories();
    const deleteMutation = useDeleteCategory();

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsFormOpen(true);
    };

    const handleDelete = async (category: Category) => {
        const canDelete = !category.book_count || category.book_count === 0;
        setConfirmDelete({
            isOpen: true,
            category,
            canDelete,
        });
    };

    const handleConfirmDelete = async () => {
        if (!confirmDelete.category || !confirmDelete.canDelete) return;

        await deleteMutation.mutateAsync(confirmDelete.category.code);
        setConfirmDelete({ isOpen: false, category: null, canDelete: true });
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingCategory(undefined);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Categories</h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Manage book categories</p>
                </div>
                {isAdmin && (
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        leftIcon={<PlusIcon className="w-5 h-5" />}
                    >
                        Add Category
                    </Button>
                )}
            </div>

            {/* Error State */}
            {isError && (
                <div className="bg-error-light border border-error rounded-xl p-4">
                    <p className="text-error-dark font-medium">Failed to load categories</p>
                    <p className="text-error text-sm mt-1">Please try again later</p>
                </div>
            )}

            {/* Table */}
            <Card>
                <CategoriesTable
                    categories={categories}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Card>

            {/* Modal */}
            {isAdmin && (
                <CategoryFormModal
                    isOpen={isFormOpen}
                    onClose={handleCloseForm}
                    category={editingCategory}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, category: null, canDelete: true })}
                onConfirm={handleConfirmDelete}
                title={confirmDelete.canDelete ? 'Hapus Kategori' : 'Tidak Dapat Menghapus Kategori'}
                message={
                    confirmDelete.canDelete
                        ? `Apakah Anda yakin ingin menghapus kategori "${confirmDelete.category?.name}"?`
                        : `Kategori "${confirmDelete.category?.name}" tidak dapat dihapus karena masih memiliki ${confirmDelete.category?.book_count} buku yang terdaftar.`
                }
                confirmText={confirmDelete.canDelete ? 'Ya, Hapus' : 'Mengerti'}
                cancelText="Batal"
                variant="destructive"
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
};
