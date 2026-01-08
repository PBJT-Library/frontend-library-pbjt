import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string()
        .min(3, 'Nama harus minimal 3 karakter')
        .max(100, 'Nama terlalu panjang'),
    username: z.string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter'),
    password: z.string()
        .min(6, 'Password harus minimal 6 karakter')
        .max(100, 'Password terlalu panjang'),
    confirmPassword: z.string()
        .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
