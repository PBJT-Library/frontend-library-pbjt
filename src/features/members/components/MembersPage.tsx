import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { MembersTable } from './MembersTable';
import { MemberFormModal } from './MemberFormModal';
import { DeleteMemberDialog } from './DeleteMemberDialog';
import { useMembers, useDeleteMember } from '../hooks/useMembers';
import { Button, Card, Input, Select } from '@/components/ui';
import type { Member } from '@/services/mockData';

export const MembersPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [studyProgramFilter, setStudyProgramFilter] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | undefined>();
    const [deletingMember, setDeletingMember] = useState<Member | undefined>();

    const limit = 10;

    const { data, isLoading, isError } = useMembers({
        page,
        limit,
        filters: {
            search,
            study_program: studyProgramFilter || undefined,
        },
        sortBy: 'name',
        sortOrder: 'asc',
    });

    const deleteMutation = useDeleteMember();

    const handleEdit = (member: Member) => {
        setEditingMember(member);
        setIsFormOpen(true);
    };

    const handleDelete = (member: Member) => {
        setDeletingMember(member);
    };

    const confirmDelete = async () => {
        if (deletingMember) {
            await deleteMutation.mutateAsync(deletingMember.id);
            setDeletingMember(undefined);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingMember(undefined);
    };

    const members = data?.data || [];
    const pagination = data?.pagination;

    // Get unique study programs for filter
    const studyPrograms = Array.from(new Set(members.map((m: Member) => m.study_program)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Members</h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Manage library members</p>
                </div>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                >
                    Add Member
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                        />
                    </div>

                    <div>
                        <Select
                            value={studyProgramFilter}
                            onChange={(e) => {
                                setStudyProgramFilter(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Programs</option>
                            {studyPrograms.map((program: string) => (
                                <option key={program} value={program}>{program}</option>
                            ))}
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Error State */}
            {isError && (
                <div className="bg-error-light border border-error rounded-xl p-4">
                    <p className="text-error-dark font-medium">Failed to load members</p>
                    <p className="text-error text-sm mt-1">Please try again later</p>
                </div>
            )}

            {/* Table */}
            <MembersTable
                members={members}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                        {pagination.total} results
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={pagination.page === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Page {pagination.page} of {pagination.totalPages}
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={pagination.page === pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <MemberFormModal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                member={editingMember}
            />

            <DeleteMemberDialog
                isOpen={!!deletingMember}
                memberName={deletingMember?.name || ''}
                onConfirm={confirmDelete}
                onCancel={() => setDeletingMember(undefined)}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
};
