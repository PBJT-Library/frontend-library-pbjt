import { z } from 'zod';
import { BOOK_CATEGORIES } from '@/services/constants/categories';

export const bookSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
    category: z.enum(BOOK_CATEGORIES as any, {
        errorMap: () => ({ message: 'Please select a valid category' })
    }),
    author: z.string().min(1, 'Author is required').max(255, 'Author too long'),
    publisher: z.string().min(1, 'Publisher is required').max(255, 'Publisher too long'),
    year: z.number()
        .min(1900, 'Year must be after 1900')
        .max(new Date().getFullYear(), `Year cannot be in the future`),
    stock: z.number()
        .min(0, 'Stock cannot be negative')
        .int('Stock must be a whole number'),
});

export type BookFormData = z.infer<typeof bookSchema>;
