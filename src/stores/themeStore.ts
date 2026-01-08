import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    isDarkMode: boolean;
    toggleTheme: () => void;
    setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            isDarkMode: false,
            toggleTheme: () => {
                set((state) => {
                    const newMode = !state.isDarkMode;
                    // Update HTML class
                    if (newMode) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    return { isDarkMode: newMode };
                });
            },
            setTheme: (isDark: boolean) => {
                set({ isDarkMode: isDark });
                // Update HTML class
                if (isDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                // Apply theme on initial load
                if (state?.isDarkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },
        }
    )
);
