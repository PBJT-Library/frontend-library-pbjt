// Member entity type definition
export interface Member {
    id: string;             // UUID (internal, auto-generated)
    uuid: string;           // Custom ID: 23190001, 23190002, etc.
    nim: string;            // Student ID number
    name: string;
    study_program: string;  // Program studi
    semester: number;       // 1-14
}
