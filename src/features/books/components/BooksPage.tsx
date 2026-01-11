import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BooksTable } from './BooksTable';
import { BookFormModal } from './BookFormModal';
import { DeleteBookDialog } from './DeleteBookDialog';
import { useBooks, useDeleteBook } from '../hooks/useBooks';
import { Button, Card, Input, Select } from '@/components/ui';
import type { Book } from '@/types';
import { ACADEMIC_CATEGORIES, REGULAR_CATEGORIES } from '@/services/constants/categories';
import { usePreferences } from '@/hooks/usePreferences';

export const BooksPage: React.FC = () => {
    const { itemsPerPage } = usePreferences();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | undefined>();
    const [deletingBook, setDeletingBook] = useState<Book | undefined>();

    // Fetch books with React Query
    const { data, isLoading, isError } = useBooks({
        page,
        limit: itemsPerPage,
        filters: {
            search,
            category: categoryFilter || undefined,
        },
        sortBy: 'title',
        sortOrder: 'asc',
    });

    const deleteMutation = useDeleteBook();

    const handleEdit = (book: Book) => {
        setEditingBook(book);
        setIsFormOpen(true);
    };

    const handleDelete = (book: Book) => {
        setDeletingBook(book);
    };

    const confirmDelete = async () => {
        if (deletingBook) {
            await deleteMutation.mutateAsync(deletingBook.id);
            setDeletingBook(undefined);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingBook(undefined);
    };

    const books = data?.data || [];
    const pagination = data?.pagination;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Books</h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your library book collection</p>
                </div>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                >
                    Add Book
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <Input
                            placeholder="Search by title, author, or ID..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                        />
                    </div>

                    {/* Category Filter */}
                    <div>
                        <Select
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Categories</option>
                            <optgroup label="📚 Academic Works">
                                {ACADEMIC_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </optgroup>
                            <optgroup label="📖 Regular Books">
                                {REGULAR_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </optgroup>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Error State */}
            {isError && (
                <div className="bg-error-light border border-error rounded-xl p-4">
                    <p className="text-error-dark font-medium">Failed to load books</p>
                    <p className="text-error text-sm mt-1">Please try again later</p>
                </div>
            )}

            {/* Table */}
            <BooksTable
                books={books}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                        {pagination.total} results
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={pagination.page === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Page {pagination.page} of {pagination.totalPages}
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={pagination.page === pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <BookFormModal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                book={editingBook}
            />

            <DeleteBookDialog
                isOpen={!!deletingBook}
                bookTitle={deletingBook?.title || ''}
                onConfirm={confirmDelete}
                onCancel={() => setDeletingBook(undefined)}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
};
