import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, Select } from '@/components/ui';
import { BellIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';

interface Preferences {
    itemsPerPage: number;
    dateFormat: string;
}

export const PreferencesTab: React.FC = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const [preferences, setPreferences] = useState<Preferences>({
        itemsPerPage: 10,
        dateFormat: 'DD/MM/YYYY',
    });

    // Load preferences from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            try {
                const loaded = JSON.parse(saved);
                setPreferences(loaded);
            } catch (error) {
                console.error('Failed to load preferences');
            }
        }
    }, []);

    // Auto-save preferences when they change
    useEffect(() => {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }, [preferences]);

    return (
        <Card>
            <div className="space-y-8">

                {/* Notifications Section */}
                <div>
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-600">
                        <div className="p-3 bg-primary-100 rounded-xl">
                            <BellIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Notifications</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Manage how you receive notifications</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Dark Mode Toggle */}
                        <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">Dark Mode</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">Switch between light and dark theme</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                            />
                        </label>


                    </div>
                </div>

                {/* Display Settings */}
                <div>
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-600">
                        <div className="p-3 bg-success-light rounded-xl">
                            <AdjustmentsHorizontalIcon className="w-6 h-6 text-success-dark" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Display</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Customize how data is displayed</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Select
                            label="Items per page"
                            value={preferences.itemsPerPage.toString()}
                            onChange={(e) => {
                                setPreferences({
                                    ...preferences,
                                    itemsPerPage: Number(e.target.value)
                                });
                                toast.success('Preference updated');
                            }}
                            helperText="Number of items to show in tables"
                        >
                            <option value="10">10 items</option>
                            <option value="25">25 items</option>
                            <option value="50">50 items</option>
                            <option value="100">100 items</option>
                        </Select>

                        <Select
                            label="Date format"
                            value={preferences.dateFormat}
                            onChange={(e) => {
                                setPreferences({
                                    ...preferences,
                                    dateFormat: e.target.value
                                });
                                toast.success('Preference updated');
                            }}
                            helperText="How dates are displayed throughout the app"
                        >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                        </Select>
                    </div>
                </div>
            </div>
        </Card>
    );
};
