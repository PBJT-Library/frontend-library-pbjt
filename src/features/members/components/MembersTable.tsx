import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Member } from '@/services/mockData';
import { LoadingSpinner, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

interface MembersTableProps {
    members: Member[];
    isLoading?: boolean;
    onEdit: (member: Member) => void;
    onDelete: (member: Member) => void;
}

export const MembersTable: React.FC<MembersTableProps> = ({
    members,
    isLoading,
    onEdit,
    onDelete,
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
                <p className="ml-4 text-slate-600">Loading members...</p>
            </div>
        );
    }

    if (members.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">No members found</h3>
                <p className="text-slate-600 dark:text-slate-300">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Study Program</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {members.map((member) => (
                    <TableRow key={member.id}>
                        <TableCell>
                            <div className="font-mono text-xs text-slate-600 dark:text-slate-400">{member.uuid}</div>
                        </TableCell>
                        <TableCell>
                            <div className="font-mono text-sm font-medium text-primary-700 dark:text-blue-300">{member.nim}</div>
                        </TableCell>
                        <TableCell>
                            <div className="font-medium text-slate-900 dark:text-slate-50">{member.name}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="primary" size="sm">
                                {member.study_program}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="text-slate-600 dark:text-slate-300">Semester {member.semester}</div>
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => onEdit(member)}
                                    className="p-2 text-primary-600 dark:text-blue-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
                                    title="Edit member"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(member)}
                                    className="p-2 text-error dark:text-red-400 hover:bg-error-light/50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    title="Delete member"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
