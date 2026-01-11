import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
    mode: ThemeMode;
    isDarkMode: boolean;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const getSystemPreference = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (isDark: boolean) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: 'system',
            isDarkMode: getSystemPreference(),

            setMode: (mode: ThemeMode) => {
                const isDark = mode === 'system' ? getSystemPreference() : mode === 'dark';
                set({ mode, isDarkMode: isDark });
                applyTheme(isDark);
            },

            toggleTheme: () => {
                const currentMode = get().mode;
                // If in system mode, switch to opposite of current system preference
                // Otherwise toggle between light and dark
                if (currentMode === 'system') {
                    const newMode = get().isDarkMode ? 'light' : 'dark';
                    get().setMode(newMode);
                } else {
                    const newMode = currentMode === 'dark' ? 'light' : 'dark';
                    get().setMode(newMode);
                }
            },
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Apply theme on initial load
                    const isDark = state.mode === 'system' ? getSystemPreference() : state.mode === 'dark';
                    state.isDarkMode = isDark;
                    applyTheme(isDark);

                    // Listen for system theme changes if in system mode
                    if (state.mode === 'system') {
                        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                            if (useThemeStore.getState().mode === 'system') {
                                useThemeStore.getState().setMode('system');
                            }
                        });
                    }
                }
            },
        }
    )
);
