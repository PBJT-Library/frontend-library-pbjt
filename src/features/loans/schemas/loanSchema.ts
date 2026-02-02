import { z } from 'zod';

export const loanSchema = z.object({
    book_id: z.string().min(1, 'Please select a book'),
    member_id: z.string().min(1, 'Please select a member'),
    quantity: z.number()
        .int('Quantity must be a whole number')
        .min(1, 'Quantity must be at least 1')
        .max(10, 'Maximum 10 books per transaction'),
    loan_date: z.string().optional(),
});

export type LoanFormData = z.infer<typeof loanSchema>;
