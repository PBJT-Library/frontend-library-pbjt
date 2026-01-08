import apiClient from './client';
import type { Admin, LoginRequest, RegisterRequest, LoginResponse, AuthResponse } from '../../types';

export const authApi = {
    /**
     * POST /admin/login - Admin login
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post<LoginResponse>('/admin/login', credentials);

            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Invalid username or password');
        }
    },

    /**
     * POST /admin/register - Register new admin
     */
    register: async (data: RegisterRequest): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post<LoginResponse>('/admin/register', data);

            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed');
        }
    },

    /**
     * GET /admin/me - Get current admin info
     */
    getMe: async (): Promise<Admin> => {
        try {
            const response = await apiClient.get<AuthResponse>('/admin/me');
            return response.data.admin;
        } catch (error) {
            console.error('Get admin info error:', error);
            throw new Error('Failed to get admin info');
        }
    },

    /**
     * PUT /admin/me - Update admin credentials
     */
    updateMe: async (data: Partial<RegisterRequest>): Promise<Admin> => {
        try {
            const response = await apiClient.put<AuthResponse>('/admin/me', data);
            return response.data.admin;
        } catch (error) {
            console.error('Update admin error:', error);
            throw new Error('Failed to update admin');
        }
    },

    /**
     * Logout - Clear token from localStorage
     */
    logout: (): void => {
        localStorage.removeItem('auth_token');
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('auth_token');
    },
};
