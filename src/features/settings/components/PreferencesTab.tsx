import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, Button, Select } from '@/components/ui';
import { BellIcon, AdjustmentsHorizontalIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';

interface Preferences {
    emailNotifications: boolean;
    itemsPerPage: number;
    dateFormat: string;
}

export const PreferencesTab: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { isDarkMode, toggleTheme } = useThemeStore();
    const [preferences, setPreferences] = useState<Preferences>({
        emailNotifications: true,
        itemsPerPage: 10,
        dateFormat: 'DD/MM/YYYY',
    });
    const [originalPreferences, setOriginalPreferences] = useState<Preferences>(preferences);

    // Load preferences from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            try {
                const loaded = JSON.parse(saved);
                setPreferences(loaded);
                setOriginalPreferences(loaded);
            } catch (error) {
                console.error('Failed to load preferences');
            }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        setOriginalPreferences(preferences);
        toast.success('Preferences saved successfully');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setPreferences(originalPreferences);
        setIsEditing(false);
    };

    return (
        <Card>
            <div className="space-y-8">
                {/* Header with Edit Button */}
                <div className="flex items-center justify-end pb-4 border-b border-slate-200">
                    {!isEditing && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            leftIcon={<PencilIcon className="w-4 h-4" />}
                        >
                            Edit
                        </Button>
                    )}
                </div>

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
                        <label className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors ${isEditing ? 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed opacity-75'}`}>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">Dark Mode</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">Switch between light and dark theme</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                disabled={!isEditing}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </label>

                        {/* Email Notifications */}
                        <label className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors ${isEditing ? 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed opacity-75'}`}>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">Email Notifications</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">Receive email updates about your account</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={preferences.emailNotifications}
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    emailNotifications: e.target.checked
                                })}
                                disabled={!isEditing}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            onChange={(e) => setPreferences({
                                ...preferences,
                                itemsPerPage: Number(e.target.value)
                            })}
                            helperText="Number of items to show in tables"
                            disabled={!isEditing}
                        >
                            <option value="10">10 items</option>
                            <option value="25">25 items</option>
                            <option value="50">50 items</option>
                            <option value="100">100 items</option>
                        </Select>

                        <Select
                            label="Date format"
                            value={preferences.dateFormat}
                            onChange={(e) => setPreferences({
                                ...preferences,
                                dateFormat: e.target.value
                            })}
                            helperText="How dates are displayed throughout the app"
                            disabled={!isEditing}
                        >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                        </Select>
                    </div>
                </div>

                {/* Actions - Only show when editing */}
                {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            leftIcon={<XMarkIcon className="w-4 h-4" />}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="primary">
                            Save Preferences
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};
