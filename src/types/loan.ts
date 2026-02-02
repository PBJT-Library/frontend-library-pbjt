// Loan entity type definition - matches new backend schema
export interface Loan {
    id: number;                // SERIAL id
    uuid: string;              // UUID
    loan_id: string;           // Display ID like LN001
    member_uuid: string;
    member_id: string;         // Member display ID (joined)
    member_name: string;       // Member name (joined)
    loan_date: string;
    due_date: string;
    status: 'active' | 'completed' | 'overdue';
    notes: string | null;
    created_at: string;
    updated_at: string;
    // Joined from loan_items
    book_id?: string;          // Book display ID
    book_title?: string;
}

export interface LoanItem {
    id: number;                // SERIAL id
    uuid: string;              // UUID
    loan_id: number;           // FK to loans.id
    book_id: number;           // FK to books.id
    book_display_id?: string;  // Book display ID (joined)
    book_title?: string;       // Book title (joined)
    returned_at: string | null;
    return_condition: string | null;
    notes: string | null;
    created_at: string;
}

export interface CreateLoanRequest {
    member_uuid: string;       // Member UUID (not member_id!)
    book_id: number;           // Book internal ID (SERIAL, not book_id display!)
    due_date?: string;         // Optional due date
    notes?: string;
}
