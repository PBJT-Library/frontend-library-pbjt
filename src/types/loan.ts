// Loan entity type definition
export interface Loan {
    id: string;              // UUID (internal, auto-generated)
    uuid: string;            // Custom ID: LN000001, LN000002, etc.
    book_id: string;         // Internal book UUID
    book_title?: string;     // For display purposes
    member_id: string;       // Internal member UUID
    member_name?: string;    // For display purposes
    quantity: number;        // Number of books borrowed
    loan_date: string;       // ISO date string
    return_date?: string | null;  // ISO date string or null if not returned
}
