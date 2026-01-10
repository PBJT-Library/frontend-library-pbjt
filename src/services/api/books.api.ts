import apiClient from './client';
import { type Book } from '../../types';
import { paginate, type PaginationParams, type PaginatedResponse } from '../utils/pagination';
import { sortData } from '../utils/filter';

export interface BooksFilters {
    search?: string;
    category?: string;
}

export interface BooksParams extends PaginationParams {
    filters?: BooksFilters;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const booksApi = {
    /**
     * GET /books - Get all books with pagination, filtering, sorting
     */
    getBooks: async (params: BooksParams): Promise<PaginatedResponse<Book>> => {
        try {
            // Fetch all books from backend
            const response = await apiClient.get<Book[]>('/books');
            let books = response.data;

            // Apply client-side filters
            if (params.filters) {
                const { search, category } = params.filters;

                if (search) {
                    books = books.filter(book =>
                        book.title.toLowerCase().includes(search.toLowerCase()) ||
                        book.author.toLowerCase().includes(search.toLowerCase()) ||
                        book.id.includes(search)
                    );
                }

                if (category) {
                    books = books.filter(book => book.category === category);
                }
            }

            // Apply client-side sorting
            if (params.sortBy) {
                books = sortData(books, params.sortBy, params.sortOrder);
            }

            // Apply client-side pagination
            return paginate(books, { page: params.page, limit: params.limit });
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },

    /**
     * GET /books/:id - Get single book
     */
    getBook: async (id: string): Promise<Book> => {
        try {
            const response = await apiClient.get<Book>(`/books/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching book ${id}:`, error);
            throw new Error('Book not found');
        }
    },

    /**
     * POST /books - Create new book
     */
    createBook: async (data: Book): Promise<void> => {
        await apiClient.post('/books', data);
    },

    /**
     * PUT /books/:id - Update book
     */
    updateBook: async (id: string, data: Partial<Book>): Promise<void> => {
        await apiClient.put(`/books/${id}`, data);
    },

    /**
     * DELETE /books/:id - Delete book
     */
    deleteBook: async (id: string): Promise<void> => {
        await apiClient.delete(`/books/${id}`);
    },
};
