import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi, type BooksParams } from '@/services/api';
import type { BookFormData } from '../schemas/bookSchema';
import { toast } from 'sonner';

/**
 * Hook to fetch books with pagination and filters
 */
export const useBooks = (params: BooksParams) => {
    return useQuery({
        queryKey: ['books', params],
        queryFn: () => booksApi.getBooks(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch single book
 */
export const useBook = (id: string) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () => booksApi.getBook(id),
        enabled: !!id,
    });
};

/**
 * Hook to create new book
 */
export const useCreateBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BookFormData) => {
            return booksApi.createBook(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast.success('Book created successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create book');
        },
    });
};

/**
 * Hook to update book
 */
export const useUpdateBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<BookFormData> }) => {
            return booksApi.updateBook(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['loans'] }); // Refresh loans to show updated book titles
            toast.success('Book updated successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update book');
        },
    });
};

/**
 * Hook to delete book
 */
export const useDeleteBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => booksApi.deleteBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['loans'] }); // Refresh loans in case deleted book had active loans
            toast.success('Book deleted successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete book');
        },
    });
};
