import apiClient from './client';
import { type Book, type CreateBookDTO } from '../../types';
import { paginate, type PaginationParams, type PaginatedResponse } from '../utils/pagination';
import { sortData } from '../utils/filter';

export interface BooksFilters {
    search?: string;
    category_id?: number;
    status?: 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost';
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
                const { search, category_id, status } = params.filters;

                if (search) {
                    books = books.filter(book =>
                        book.title.toLowerCase().includes(search.toLowerCase()) ||
                        (book.author && book.author.toLowerCase().includes(search.toLowerCase())) ||
                        book.book_id.includes(search)
                    );
                }

                if (category_id) {
                    books = books.filter(book => book.category_id === category_id);
                }

                if (status) {
                    books = books.filter(book => book.status === status);
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
     * GET /books/:book_id - Get single book by book_id
     */
    getBook: async (book_id: string): Promise<Book> => {
        try {
            const response = await apiClient.get<Book>(`/books/${book_id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching book ${book_id}:`, error);
            throw new Error('Book not found');
        }
    },

    /**
     * POST /books - Create new book(s)
     */
    createBook: async (data: CreateBookDTO): Promise<void> => {
        await apiClient.post('/books', data);
    },

    /**
     * PUT /books/:book_id - Update book
     */
    updateBook: async (book_id: string, data: Partial<CreateBookDTO>): Promise<void> => {
        await apiClient.put(`/books/${book_id}`, data);
    },

    /**
     * DELETE /books/:book_id - Delete book
     */
    deleteBook: async (book_id: string): Promise<void> => {
        await apiClient.delete(`/books/${book_id}`);
    },
};
