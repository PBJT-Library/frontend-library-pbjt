import { z } from 'zod';

export const bookSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
    category_id: z.number().min(1, 'Category is required'),  // Changed from category_code
    author: z.string().optional(),
    publisher: z.string().optional(),
    publication_year: z.number()
        .min(1900, 'Year must be after 1900')
        .max(new Date().getFullYear(), `Year cannot be in the future`)
        .optional(),
    quantity: z.number()
        .min(1, 'Quantity must be at least 1')
        .int('Quantity must be a whole number'),
    status: z.enum(['available', 'loaned', 'reserved', 'maintenance', 'lost']).optional(),
    cover_url: z.string().url().optional().or(z.literal('')),
    description: z.string().optional(),
});

export type BookFormData = z.infer<typeof bookSchema>;
