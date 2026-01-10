import apiClient from './client';
import type { Admin, LoginRequest, LoginResponse, AuthResponse } from '../../types';

export const authApi = {
    /**
     * POST /admin/login - Admin login
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/admin/login', credentials);

        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }

        return response.data;
    },

    /**
     * POST /admin/register - Admin registration
     */
    register: async (credentials: LoginRequest): Promise<{ message: string; admin: Admin }> => {
        const response = await apiClient.post<{ message: string; admin: Admin }>('/admin/register', credentials);
        // Backend returns { message, admin } without token
        // User needs to login after registration
        return response.data;
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
    updateMe: async (data: Partial<LoginRequest>): Promise<Admin> => {
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
