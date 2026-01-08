import { z } from 'zod';

export const memberSchema = z.object({
    nim: z.string()
        .min(8, 'NIM minimal 8 karakter')
        .max(15, 'NIM maksimal 15 karakter')
        .regex(/^[0-9]+$/, 'NIM harus berupa angka'),
    name: z.string()
        .min(3, 'Nama minimal 3 karakter')
        .max(100, 'Nama maksimal 100 karakter'),
    study_program: z.string()
        .min(3, 'Program studi minimal 3 karakter')
        .max(100, 'Program studi maksimal 100 karakter'),
    semester: z.number()
        .int('Semester harus bilangan bulat')
        .min(1, 'Semester minimal 1')
        .max(14, 'Semester maksimal 14'),
});

export type MemberFormData = z.infer<typeof memberSchema>;
