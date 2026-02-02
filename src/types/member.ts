// Member entity type definition - matches new backend schema
export interface Member {
    id: number;                // SERIAL id
    uuid: string;              // UUID for secure references
    member_id: string;         // Display ID like "23190001"
    name: string;
    study_program: string | null;
    semester: number;          // 1-14
    join_date: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// DTO for creating a new member
export interface CreateMemberDTO {
    id: string;                // member_id (NIM)
    name: string;
    study_program: string;
    semester: number;
}

// DTO for updating a member
export interface UpdateMemberDTO {
    id?: string;               // member_id (NIM) - optional for updates
    name?: string;
    study_program?: string;
    semester?: number;
}
