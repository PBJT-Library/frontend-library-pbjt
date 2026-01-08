// Members data - aligned with backend-perpus
export interface Member {
    id: string;
    uuid: string;           // Auto-generated: 23190001, 23190002, etc.
    nim: string;            // Manual NIM input
    name: string;
    study_program: string;  // Program studi
    semester: number;       // 1-14
}

export const mockMembers: Member[] = [
    {
        id: '1',
        uuid: '23190001',
        nim: '23190001',
        name: 'John Doe',
        study_program: 'Teknik Informatika',
        semester: 5,
    },
    {
        id: '2',
        uuid: '23190002',
        nim: '23190002',
        name: 'Jane Smith',
        study_program: 'Sistem Informasi',
        semester: 3,
    },
    {
        id: '3',
        uuid: '23190003',
        nim: '23190003',
        name: 'Bob Johnson',
        study_program: 'Teknik Informatika',
        semester: 7,
    },
    {
        id: '4',
        uuid: '23190004',
        nim: '23190004',
        name: 'Alice Brown',
        study_program: 'Teknik Komputer',
        semester: 2,
    },
    {
        id: '5',
        uuid: '23190005',
        nim: '23190005',
        name: 'Charlie Wilson',
        study_program: 'Sistem Informasi',
        semester: 6,
    },
];
