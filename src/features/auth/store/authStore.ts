import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member' | 'staff';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                // Mock login - simulate API call with delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock user data
                const mockUser: User = {
                    id: '1',
                    name: 'Admin User',
                    email,
                    role: 'admin'
                };

                set({
                    user: mockUser,
                    isAuthenticated: true
                });
            },

            logout: () => {
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
