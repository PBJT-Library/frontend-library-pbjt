// Book entity type definition
export interface Book {
    id: string;        // UUID (internal, auto-generated)
    uuid: string;      // Custom ID: BK001, BK002, etc.
    title: string;
    category: string;
    author: string;
    publisher: string;
    year: number;
    stock: number;
}
