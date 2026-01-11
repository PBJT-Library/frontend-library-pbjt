import React, { useState } from 'react';
import { AdjustmentsHorizontalIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { PreferencesTab } from './PreferencesTab';
import { ProfileTab } from './ProfileTab';
import { SecurityTab } from './SecurityTab';

type TabType = 'preferences' | 'profile' | 'security';

export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('preferences');

    const tabs = [
        { id: 'preferences' as TabType, name: 'Preferences', icon: AdjustmentsHorizontalIcon },
        { id: 'profile' as TabType, name: 'Profile', icon: UserIcon },
        { id: 'security' as TabType, name: 'Security', icon: LockClosedIcon },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Settings</h1>
                <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your application preferences and account</p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                    ${isActive
                                        ? 'border-primary-500 text-primary-600 dark:text-blue-400 dark:border-blue-400'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-600'
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-500 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}`} />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'preferences' && <PreferencesTab />}
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'security' && <SecurityTab />}
            </div>
        </div>
    );
};
