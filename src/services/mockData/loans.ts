// Loans data - aligned with backend-perpus
export interface Loan {
    id: string;              // UUID internal
    uuid: string;            // LN000001, LN000002, etc.
    book_id: string;         // Internal book UUID
    book_title?: string;     // For display
    member_id: string;       // Internal member UUID
    member_name?: string;    // For display
    quantity: number;        // How many books borrowed
    loan_date: string;       // ISO date
    return_date?: string | null;  // ISO date or null
}

export const mockLoans: Loan[] = [
    {
        id: '1',
        uuid: 'LN000001',
        book_id: '1',
        book_title: 'Clean Code',
        member_id: '1',
        member_name: 'John Doe',
        quantity: 1,
        loan_date: '2024-01-25T10:00:00Z',
        return_date: null,
    },
    {
        id: '2',
        uuid: 'LN000002',
        book_id: '3',
        book_title: 'Design Patterns',
        member_id: '1',
        member_name: 'John Doe',
        quantity: 1,
        loan_date: '2024-01-26T10:00:00Z',
        return_date: null,
    },
    {
        id: '3',
        uuid: 'LN000003',
        book_id: '6',
        book_title: "You Don't Know JS",
        member_id: '2',
        member_name: 'Jane Smith',
        quantity: 1,
        loan_date: '2024-01-20T10:00:00Z',
        return_date: null,
    },
    {
        id: '4',
        uuid: 'LN000004',
        book_id: '2',
        book_title: 'The Pragmatic Programmer',
        member_id: '3',
        member_name: 'Bob Johnson',
        quantity: 1,
        loan_date: '2024-01-15T10:00:00Z',
        return_date: '2024-01-28T14:00:00Z',
    },
    {
        id: '5',
        uuid: 'LN000005',
        book_id: '8',
        book_title: 'Refactoring',
        member_id: '2',
        member_name: 'Jane Smith',
        quantity: 1,
        loan_date: '2024-01-18T10:00:00Z',
        return_date: '2024-01-30T10:00:00Z',
    },
];
