import { z } from 'zod';

export const loanSchema = z.object({
    book_id: z.string().min(1, 'Please select a book'),
    member_id: z.string().min(1, 'Please select a member'),
    quantity: z.number()
        .min(1, 'Quantity must be at least 1')
        .int('Quantity must be a whole number'),
});

export type LoanFormData = z.infer<typeof loanSchema>;
