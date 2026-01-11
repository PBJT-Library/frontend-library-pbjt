import apiClient from './client';
import { type Loan } from '../../types';
import { paginate, type PaginationParams, type PaginatedResponse } from '../utils/pagination';
import { sortData } from '../utils/filter';

export interface LoansFilters {
    returned?: boolean;  // true = returned, false = active, undefined = all
    member_id?: string;
    book_id?: string;
}

export interface LoansParams extends PaginationParams {
    filters?: LoansFilters;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface CreateLoanData {
    book_id: string;      // Custom book ID (BK001)
    member_id: string;    // Custom member ID / NIM (23190001)
    quantity: number;
}

export const loansApi = {
    /**
     * GET /loans - Get all loans
     */
    getLoans: async (params: LoansParams): Promise<PaginatedResponse<Loan>> => {
        try {
            const response = await apiClient.get<Loan[]>('/loans');
            let loans = response.data;

            // Apply client-side filters
            if (params.filters) {
                const { returned, member_id, book_id } = params.filters;

                if (returned !== undefined) {
                    loans = loans.filter(loan =>
                        returned ? loan.return_date !== null : loan.return_date === null
                    );
                }

                if (member_id) {
                    loans = loans.filter(loan => loan.member_id === member_id);
                }

                if (book_id) {
                    loans = loans.filter(loan => loan.book_id === book_id);
                }
            }

            // Apply client-side sorting
            if (params.sortBy) {
                loans = sortData(loans, params.sortBy, params.sortOrder);
            }

            // Apply client-side pagination
            return paginate(loans, { page: params.page, limit: params.limit });
        } catch (error) {
            console.error('Error fetching loans:', error);
            throw error;
        }
    },

    /**
     * GET /loans/:id - Get single loan
     */
    getLoan: async (id: string): Promise<Loan> => {
        try {
            const response = await apiClient.get<Loan>(`/loans/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching loan ${id}:`, error);
            throw new Error('Loan not found');
        }
    },

    /**
     * POST /loans - Create new loan (borrow book)
     */
    createLoan: async (data: CreateLoanData): Promise<void> => {
        await apiClient.post('/loans', data);
    },

    /**
     * PATCH /loans/:id/return - Return book
     */
    returnBook: async (id: string): Promise<void> => {
        await apiClient.patch(`/loans/${id}/return`);
    },

    /**
     * PUT /loans/:id - Update loan
     */
    updateLoan: async (id: string, data: Partial<CreateLoanData>): Promise<void> => {
        await apiClient.put(`/loans/${id}`, data);
    },

    /**
     * DELETE /loans/:id - Delete loan
     */
    deleteLoan: async (id: string): Promise<void> => {
        await apiClient.delete(`/loans/${id}`);
    },
};
