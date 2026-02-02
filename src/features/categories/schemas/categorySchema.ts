import { z } from 'zod';

export const categorySchema = z.object({
    code: z.string()
        .min(2, 'Code must be at least 2 characters')
        .max(10, 'Code must be at most 10 characters')
        .regex(/^[A-Z0-9]+$/, 'Code must be uppercase letters and numbers only'),
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name too long'),
    description: z.string()
        .max(500, 'Description too long')
        .optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
