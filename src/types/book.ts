// Book entity type definition - matches new backend schema
export interface Book {
    id: number;                // SERIAL id
    uuid: string;              // UUID
    book_id: string;           // Display ID like MAT000001
    title: string;
    author: string | null;
    publisher: string | null;
    publication_year: number | null;
    category_id: number;       // Changed from category_code
    category_name?: string;    // Joined from categories
    category_code?: string;    // Joined from categories
    status: 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost';
    cover_url: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
}

// For creating new books
export interface CreateBookDTO {
    title: string;
    author?: string;
    publisher?: string;
    publication_year?: number;
    category_id: number;       // Changed from category_code
    quantity: number;          // How many copies to create
    status?: 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost';
    cover_url?: string;
    description?: string;
}
