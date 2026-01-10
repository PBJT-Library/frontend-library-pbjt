import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { membersApi, type MembersParams } from '@/services/api';
import type { MemberFormData } from '../schemas/memberSchema';
import { toast } from 'sonner';

/**
 * Hook to fetch members with pagination and filters
 */
export const useMembers = (params: MembersParams) => {
    return useQuery({
        queryKey: ['members', params],
        queryFn: () => membersApi.getMembers(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch single member
 */
export const useMember = (id: string) => {
    return useQuery({
        queryKey: ['member', id],
        queryFn: () => membersApi.getMember(id),
        enabled: !!id,
    });
};

/**
 * Hook to create new member
 */
export const useCreateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: MemberFormData) => {
            return membersApi.createMember(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member created successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create member');
        },
    });
};

/**
 * Hook to update member
 */
export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<MemberFormData> }) => {
            return membersApi.updateMember(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member updated successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update member');
        },
    });
};

/**
 * Hook to delete member
 */
export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => membersApi.deleteMember(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member deleted successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete member');
        },
    });
};
