import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpenIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
    PlusIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useMembers } from '@/features/members/hooks/useMembers';
import { useLoans } from '@/features/loans/hooks/useLoans';
import { usePreferences } from '@/hooks/usePreferences';
import { formatDate } from '@/utils/dateFormatter';
import { Card, Badge } from '@/components/ui';

interface KPICardProps {
    title: string;
    value: number | string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, color, bgColor }) => {
    // Determine border color based on bgColor
    const borderColorMap: Record<string, string> = {
        'bg-primary-100': 'border-l-primary-600',
        'bg-success-light': 'border-l-success',
        'bg-warning-light': 'border-l-warning',
        'bg-info-light': 'border-l-info',
    };

    const borderColor = borderColorMap[bgColor] || 'border-l-primary-600';

    return (
        <Card hover className={`group border-l-4 ${borderColor}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
                </div>
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${bgColor} dark:bg-opacity-20 ${color} transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className="w-7 h-7" />
                </div>
            </div>
        </Card>
    );
};

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { dateFormat } = usePreferences();

    // Fetch all data for KPIs
    const { data: booksData } = useBooks({ page: 1, limit: 1000 });
    const { data: membersData } = useMembers({ page: 1, limit: 1000 });
    const { data: allLoansData } = useLoans({ page: 1, limit: 1000 });
    const { data: recentLoansData } = useLoans({
        page: 1,
        limit: 5,
        sortBy: 'loan_date',
        sortOrder: 'desc'
    });

    const books = booksData?.data || [];
    const members = membersData?.data || [];
    const allLoans = allLoansData?.data || [];
    const recentLoans = recentLoansData?.data || [];

    // Calculate KPIs
    const totalBooks = books.length;
    const totalMembers = members.length;
    const activeLoans = allLoans.filter(loan => !loan.return_date).length;
    const returnedLoans = allLoans.filter(loan => loan.return_date).length;

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                    Here's what's happening in your library today
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Books"
                    value={totalBooks}
                    icon={BookOpenIcon}
                    color="text-primary-600 dark:text-primary-400"
                    bgColor="bg-primary-100"
                />
                <KPICard
                    title="Total Members"
                    value={totalMembers}
                    icon={UsersIcon}
                    color="text-success dark:text-success-light"
                    bgColor="bg-success-light"
                />
                <KPICard
                    title="Active Loans"
                    value={activeLoans}
                    icon={ClipboardDocumentListIcon}
                    color="text-warning dark:text-warning-light"
                    bgColor="bg-warning-light"
                />
                <KPICard
                    title="Returned Loans"
                    value={returnedLoans}
                    icon={CheckCircleIcon}
                    color="text-info dark:text-info-light"
                    bgColor="bg-info-light"
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate('/books')}
                        className="group flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-primary-200 dark:border-primary-700 text-primary-700 dark:text-blue-300 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 shadow-soft hover:shadow-card"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-blue-300 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Add New Book</span>
                    </button>
                    <button
                        onClick={() => navigate('/members')}
                        className="group flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-success-light dark:border-success text-success-dark dark:text-success-light rounded-2xl hover:bg-success-light/30 dark:hover:bg-success/20 hover:border-success transition-all duration-200 shadow-soft hover:shadow-card"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success-light dark:bg-success/20 text-success-dark dark:text-success-light group-hover:bg-success transition-colors group-hover:text-white">
                            <PlusIcon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Register Member</span>
                    </button>
                    <button
                        onClick={() => navigate('/loans')}
                        className="group flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-warning-light dark:border-warning text-warning-dark dark:text-warning-light rounded-2xl hover:bg-warning-light/30 dark:hover:bg-warning/20 hover:border-warning transition-all duration-200 shadow-soft hover:shadow-card"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-warning-light dark:bg-warning/20 text-warning-dark dark:text-warning-light group-hover:bg-warning transition-colors group-hover:text-white">
                            <PlusIcon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">New Loan</span>
                    </button>
                </div>
            </div>

            {/* Recent Loans */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-slate-100 dark:border-slate-700 overflow-hidden">
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">Recent Loans</h2>
                        <button
                            onClick={() => navigate('/loans')}
                            className="text-sm text-white/90 hover:text-white font-medium transition-colors flex items-center gap-1"
                        >
                            View all →
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {recentLoans.length === 0 ? (
                        <div className="text-center py-12">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-300">No recent loans</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-700">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                            Loan ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                            Member
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                            Book
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                            Loan Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {recentLoans.map((loan) => (
                                        <tr key={loan.id} className="hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                                            <td className="px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-200">
                                                {loan.uuid}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-200">
                                                {loan.member_name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-200">
                                                {loan.book_title}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                                                {formatDate(loan.loan_date, dateFormat)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant={!loan.return_date ? 'warning' : 'success'} size="sm">
                                                    {!loan.return_date ? 'Active' : 'Returned'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
