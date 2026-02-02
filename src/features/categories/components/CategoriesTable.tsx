import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Category } from '@/types/category';
import { LoadingSpinner, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

interface CategoriesTableProps {
    categories: Category[];
    isLoading?: boolean;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
    categories,
    isLoading,
    onEdit,
    onDelete,
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
                <p className="ml-4 text-slate-600">Loading categories...</p>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">No categories found</h3>
                <p className="text-slate-600 dark:text-slate-300">Create your first category to get started</p>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.code}>
                        <TableCell>
                            <Badge variant="primary" size="sm">
                                {category.code}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="font-medium text-slate-900 dark:text-slate-50">{category.name}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-slate-600 dark:text-slate-300 max-w-md truncate">
                                {category.description || '-'}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="text-slate-600 dark:text-slate-300">
                                {category.book_count || 0} books
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => onEdit(category)}
                                    className="p-2 text-primary-600 dark:text-blue-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
                                    title="Edit category"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(category)}
                                    className="p-2 text-error dark:text-red-400 hover:bg-error-light/50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    title="Delete category"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
