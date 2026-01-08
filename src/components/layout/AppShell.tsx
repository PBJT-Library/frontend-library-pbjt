import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';

export const AppShell: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <Breadcrumbs />
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
