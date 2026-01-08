// Book categories - aligned with academic institution needs

export const ACADEMIC_CATEGORIES = [
    'Tugas Akhir - Teknik Informatika',
    'Tugas Akhir - Teknik Otomotif',
    'Tugas Akhir - Teknik Mesin',
    'Tugas Akhir - Teknik Elektronika Industri',
    'Laporan Magang - Teknik Informatika',
    'Laporan Magang - Teknik Otomotif',
    'Laporan Magang - Teknik Mesin',
    'Laporan Magang - Teknik Elektronika Industri',
] as const;

export const REGULAR_CATEGORIES = [
    'Teknik Informatika',
    'Teknik Otomotif',
    'Teknik Mesin',
    'Teknik Elektronika Industri',
    'Others',
] as const;

export const ALL_CATEGORIES = [
    ...ACADEMIC_CATEGORIES,
    ...REGULAR_CATEGORIES,
] as const;

// Legacy export for backward compatibility
export const BOOK_CATEGORIES = ALL_CATEGORIES;

export type BookCategory = typeof ALL_CATEGORIES[number];
