import { z } from 'zod';

export const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password too long'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type PasswordFormData = z.infer<typeof passwordSchema>;
