import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    BookOpenIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/features/auth/store/authStore';

interface NavItem {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Books', path: '/books', icon: BookOpenIcon },
    { name: 'Members', path: '/members', icon: UsersIcon },
    { name: 'Loans', path: '/loans', icon: ClipboardDocumentListIcon },
];

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm transition-colors duration-200">
            {/* Logo */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-soft">
                        <BookOpenIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                            Library
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-300">Management System</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                ${isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-blue-300 shadow-soft'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                                }
                            `}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute left-0 w-1 h-8 bg-primary-600 rounded-r-full" />
                            )}

                            {/* Icon Container */}
                            <div
                                className={`
                                flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
                                ${isActive
                                        ? 'bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-blue-300'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                                    }
                            `}>
                                <Icon className="w-5 h-5" />
                            </div>

                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Info & Actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3 mb-3 px-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-soft">
                        <span className="text-white font-semibold text-sm">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-300 capitalize">
                            {user?.role || 'member'}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/settings')}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-200"
                    >
                        <Cog6ToothIcon className="w-4 h-4" />
                        <span>Settings</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-error hover:bg-error-light/50 border border-error-light rounded-xl transition-all duration-200"
                    >
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
