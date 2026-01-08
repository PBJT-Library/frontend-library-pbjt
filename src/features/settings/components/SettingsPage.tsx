import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ProfileTab } from './ProfileTab';
import { SecurityTab } from './SecurityTab';
import { PreferencesTab } from './PreferencesTab';

type TabId = 'profile' | 'security' | 'preferences';

interface Tab {
    id: TabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('profile');

    const tabs: Tab[] = [
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'security', label: 'Security', icon: LockClosedIcon },
        { id: 'preferences', label: 'Preferences', icon: Cog6ToothIcon },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Settings</h1>
                <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your account settings and preferences</p>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="flex gap-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-all duration-200
                                    ${isActive
                                        ? 'border-primary-600 dark:border-blue-400 text-primary-600 dark:text-blue-300 bg-primary-50/50 dark:bg-primary-900/20'
                                        : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }
                                    rounded-t-lg
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'security' && <SecurityTab />}
                {activeTab === 'preferences' && <PreferencesTab />}
            </div>
        </div>
    );
};
