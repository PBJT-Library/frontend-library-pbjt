import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loansApi, type LoansParams, type CreateLoanData } from '@/services/api';
import { toast } from 'sonner';

/**
 * Hook to fetch loans with pagination and filters
 */
export const useLoans = (params: LoansParams) => {
    return useQuery({
        queryKey: ['loans', params],
        queryFn: () => loansApi.getLoans(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch single loan
 */
export const useLoan = (id: string) => {
    return useQuery({
        queryKey: ['loan', id],
        queryFn: () => loansApi.getLoan(id),
        enabled: !!id,
    });
};

/**
 * Hook to create new loan (borrow book)
 */
export const useCreateLoan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateLoanData) => {
            return loansApi.createLoan(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['loans'] });
            queryClient.invalidateQueries({ queryKey: ['books'] }); // Refresh books for stock update
            toast.success('Book borrowed successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to borrow book');
        },
    });
};

/**
 * Hook to return book
 */
export const useReturnBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => loansApi.returnBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['loans'] });
            queryClient.invalidateQueries({ queryKey: ['books'] }); // Refresh books for stock update
            toast.success('Book returned successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to return book');
        },
    });
};
