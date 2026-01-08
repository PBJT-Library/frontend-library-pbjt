import { mockBooks, type Book } from '@/services/mockData';

interface BookFilters {
    search?: string;
    category?: string;
}

interface BooksResponse {
    data: Book[];
    total: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const booksService = {
    /**
     * Get all books with optional filters
     */
    getBooks: async (filters?: BookFilters): Promise<BooksResponse> => {
        // Simulate API call delay
        await delay(800);

        let books = [...mockBooks];

        // Apply search filter
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            books = books.filter(book =>
                book.title.toLowerCase().includes(searchLower) ||
                book.author.toLowerCase().includes(searchLower) ||
                book.uuid.toLowerCase().includes(searchLower)
            );
        }


        // Apply category filter
        if (filters?.category && filters.category !== 'all') {
            books = books.filter(book => book.category === filters.category);
        }

        return {
            data: books,
            total: books.length
        };
    },

    /**
     * Get single book by ID
     */
    getBookById: async (id: string): Promise<Book> => {
        await delay(500);

        const book = mockBooks.find(b => b.id === id);

        if (!book) {
            throw new Error('Book not found');
        }

        return book;
    },

    /**
     * Get available categories
     */
    getCategories: async (): Promise<string[]> => {
        await delay(300);

        const categories = Array.from(new Set(mockBooks.map(b => b.category)));
        return ['all', ...categories];
    },
};
