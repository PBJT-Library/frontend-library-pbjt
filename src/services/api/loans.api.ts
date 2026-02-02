import apiClient from './client';
import { type Loan, type CreateLoanRequest } from '../../types';
import { paginate, type PaginationParams, type PaginatedResponse } from '../utils/pagination';
import { sortData } from '../utils/filter';

export interface LoansFilters {
    status?: 'active' | 'completed' | 'overdue';
    member_id?: string;
}

export interface LoansParams extends PaginationParams {
    filters?: LoansFilters;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Type alias for backward compatibility
export type CreateLoanData = CreateLoanRequest;

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
                const { status, member_id } = params.filters;

                if (status) {
                    loans = loans.filter(loan => loan.status === status);
                }

                if (member_id) {
                    loans = loans.filter(loan => loan.member_id === member_id);
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
     * GET /loans/:loan_id - Get single loan by loan_id
     */
    getLoan: async (loan_id: string): Promise<Loan> => {
        try {
            const response = await apiClient.get<Loan>(`/loans/${loan_id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching loan ${loan_id}:`, error);
            throw new Error('Loan not found');
        }
    },

    /**
     * POST /loans - Create new loan (borrow book)
     */
    createLoan: async (data: CreateLoanRequest): Promise<{ message: string; loan_id: string }> => {
        const response = await apiClient.post<{ message: string; loan_id: string }>('/loans', data);
        return response.data;
    },

    /**
     * PATCH /loans/:loan_id/return - Return book
     */
    returnBook: async (loan_id: string): Promise<void> => {
        await apiClient.patch(`/loans/${loan_id}/return`);
    },

    /**
     * PUT /loans/:loan_id - Update loan
     */
    updateLoan: async (loan_id: string, data: Partial<CreateLoanRequest>): Promise<void> => {
        await apiClient.put(`/loans/${loan_id}`, data);
    },

    /**
     * DELETE /loans/:loan_id - Delete loan
     */
    deleteLoan: async (loan_id: string): Promise<void> => {
        await apiClient.delete(`/loans/${loan_id}`);
    },
};
