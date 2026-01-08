import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Breadcrumbs } from './Breadcrumbs';
import { useThemeStore } from '@/stores/themeStore';

export const Header: React.FC = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4 transition-colors duration-200">
            <div className="flex items-center justify-between">
                {/* Breadcrumbs */}
                <Breadcrumbs />

                {/* Right side - Theme Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all duration-200"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? (
                            <SunIcon className="w-5 h-5" />
                        ) : (
                            <MoonIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};
