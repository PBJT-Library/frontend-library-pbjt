import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(1, 'Name is required').min(3, 'Name must be at least 3 characters'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
