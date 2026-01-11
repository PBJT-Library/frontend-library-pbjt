import React from 'react';
import { PreferencesTab } from './PreferencesTab';

export const SettingsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Settings</h1>
                <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your application preferences</p>
            </div>

            {/* Preferences Content */}
            <PreferencesTab />
        </div>
    );
};
