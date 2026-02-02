// Central export for all type definitions
export type { Book, CreateBookDTO } from './book';
export type { Member, CreateMemberDTO, UpdateMemberDTO } from './member';
export type { Loan, CreateLoanRequest } from './loan';
// Alias for backward compatibility
export type { CreateLoanRequest as CreateLoanData } from './loan';
export type {
    Admin,
    LoginRequest,
    LoginResponse,
    AuthResponse
} from './admin';
