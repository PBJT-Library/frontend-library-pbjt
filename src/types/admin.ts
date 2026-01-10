// Admin authentication type definitions
export interface Admin {
    id: string;
    username: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    admin: Admin;
}

export interface AuthResponse {
    admin: Admin;
}
