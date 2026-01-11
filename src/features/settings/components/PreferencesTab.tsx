import React, { useState, useEffect } from 'react';
import { Card, Select, LoadingSpinner } from '@/components/ui';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Preferences {
    itemsPerPage: number;
    dateFormat: string;
}

export const PreferencesTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
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
                setPreferences({
                    itemsPerPage: loaded.itemsPerPage || 10,
                    dateFormat: loaded.dateFormat || 'DD/MM/YYYY'
                });
            } catch (error) {
                console.error('Failed to load preferences');
            }
        }
        setIsLoading(false);
    }, []);

    // Auto-save preferences when they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
        }
    }, [preferences, isLoading]);

    if (isLoading) {
        return (
            <Card>
                <div className="flex justify-center items-center py-12">
                    <LoadingSpinner size="lg" />
                    <p className="ml-4 text-slate-600 dark:text-slate-300">Loading preferences...</p>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="space-y-8">
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
                            }}
                            helperText="How dates are displayed throughout the app"
                        >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                            <option value="YYYY/MM/DD">YYYY/MM/DD (2024/12/31)</option>
                        </Select>
                    </div>
                </div>
            </div>
        </Card>
    );
};
