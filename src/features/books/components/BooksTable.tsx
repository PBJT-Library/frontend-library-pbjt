import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Book } from '@/types';
import { StatusBadge } from './StockBadge';
import { LoadingSpinner, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

interface BooksTableProps {
    books: Book[];
    isLoading?: boolean;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
}

export const BooksTable: React.FC<BooksTableProps> = ({
    books,
    isLoading,
    onEdit,
    onDelete,
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
                <p className="ml-4 text-slate-600">Loading books...</p>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">No books found</h3>
                <p className="text-slate-600 dark:text-slate-300">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book) => (
                    <TableRow key={book.uuid}>
                        <TableCell>
                            <div className="font-mono text-xs text-slate-600 dark:text-slate-400">{book.book_id}</div>
                        </TableCell>
                        <TableCell>
                            <div className="font-medium text-slate-900 dark:text-slate-50">{book.title}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{book.publisher}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-slate-900 dark:text-slate-100">{book.author}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="primary" size="sm">
                                {book.category_name || book.category_code}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="text-slate-600 dark:text-slate-300">{book.publication_year}</div>
                        </TableCell>
                        <TableCell>
                            <StatusBadge status={book.status} />
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => onEdit(book)}
                                    className="p-2 text-primary-600 dark:text-blue-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
                                    title="Edit book"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(book)}
                                    className="p-2 text-error dark:text-red-400 hover:bg-error-light/50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    title="Delete book"
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
