import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
    name: string;
    path?: string;
}

const routeMap: Record<string, string> = {
    dashboard: 'Dashboard',
    books: 'Books',
    members: 'Members',
    loans: 'Loans',
    create: 'Create',
    edit: 'Edit',
};

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const paths = location.pathname.split('/').filter(Boolean);

        const breadcrumbs: BreadcrumbItem[] = [
            { name: 'Home', path: '/dashboard' }
        ];

        let currentPath = '';
        paths.forEach((path, index) => {
            currentPath += `/${path}`;
            const name = routeMap[path] || path;

            // Last item should not have a path (current page)
            if (index === paths.length - 1) {
                breadcrumbs.push({ name });
            } else {
                breadcrumbs.push({ name, path: currentPath });
            }
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    // Don't show breadcrumbs on login page
    if (location.pathname === '/login' || location.pathname === '/') {
        return null;
    }

    return (
        <nav className="flex items-center gap-2 text-sm mb-6 px-1">
            {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    )}
                    {crumb.path ? (
                        <Link
                            to={crumb.path}
                            className="flex items-center gap-1.5 text-slate-500 dark:text-slate-300 hover:text-primary-600 dark:hover:text-blue-300 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                        >
                            {index === 0 && <HomeIcon className="w-4 h-4" />}
                            <span>{crumb.name}</span>
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-medium px-2 py-1">
                            {crumb.name}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};
