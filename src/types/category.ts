export interface Category {
    id: number;              // SERIAL id (needed for category_id FK)
    uuid: string;            // UUID
    code: string;            // User-defined code like "MAT", "INF"
    name: string;
    description?: string;
    book_count?: number;     // From JOIN query
    created_at?: string;
    updated_at?: string;
}

export interface CreateCategoryDTO {
    code: string;            // Required: category code
    name: string;
    description?: string;
}

export interface UpdateCategoryDTO {
    name?: string;
    description?: string;
}
