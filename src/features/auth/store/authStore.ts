import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/services/api/auth.api';

interface User {
    id: string;
    name: string;
    role: 'admin';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (username: string, password: string) => {
                const response = await authApi.login({ username, password });

                // Set user from API response
                const user: User = {
                    id: response.admin.id,
                    name: response.admin.username,
                    role: 'admin'
                };

                set({
                    user,
                    isAuthenticated: true
                });
            },

            register: async (username: string, password: string) => {
                await authApi.register({ username, password });
                // Do not set user or isAuthenticated
                // User must login explicitly
            },

            logout: () => {
                authApi.logout();
                set({
                    user: null,
                    isAuthenticated: false
                });
            },

            setUser: (user: User) => {
                set({ user });
            },
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
);
