import apiClient from './client';
import { type Member } from '../mockData';
import { paginate, type PaginationParams, type PaginatedResponse } from '../utils/pagination';
import { sortData } from '../utils/filter';

export interface MembersFilters {
    search?: string;
    study_program?: string;
}

export interface MembersParams extends PaginationParams {
    filters?: MembersFilters;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const membersApi = {
    /**
     * GET /members - Get all members
     */
    getMembers: async (params: MembersParams): Promise<PaginatedResponse<Member>> => {
        try {
            const response = await apiClient.get<Member[]>('/members');
            let members = response.data;

            // Apply client-side filters
            if (params.filters) {
                const { search, study_program } = params.filters;

                if (search) {
                    members = members.filter(member =>
                        member.name.toLowerCase().includes(search.toLowerCase()) ||
                        member.id.includes(search)
                    );
                }

                if (study_program) {
                    members = members.filter(member => member.study_program === study_program);
                }
            }

            // Apply client-side sorting
            if (params.sortBy) {
                members = sortData(members, params.sortBy, params.sortOrder);
            }

            // Apply client-side pagination
            return paginate(members, { page: params.page, limit: params.limit });
        } catch (error) {
            console.error('Error fetching members:', error);
            throw error;
        }
    },

    /**
     * GET /members/:id - Get single member
     */
    getMember: async (id: string): Promise<Member> => {
        try {
            const response = await apiClient.get<Member>(`/members/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching member ${id}:`, error);
            throw new Error('Member not found');
        }
    },

    /**
     * POST /members - Create new member
     */
    createMember: async (data: Omit<Member, 'uuid'>): Promise<Member> => {
        try {
            const response = await apiClient.post<Member>('/members', data);
            return response.data;
        } catch (error) {
            console.error('Error creating member:', error);
            throw error;
        }
    },

    /**
     * PUT /members/:id - Update member
     */
    updateMember: async (id: string, data: Partial<Member>): Promise<Member> => {
        try {
            const response = await apiClient.put<Member>(`/members/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating member ${id}:`, error);
            throw new Error('Failed to update member');
        }
    },

    /**
     * DELETE /members/:id - Delete member
     */
    deleteMember: async (id: string): Promise<void> => {
        try {
            await apiClient.delete(`/members/${id}`);
        } catch (error) {
            console.error(`Error deleting member ${id}:`, error);
            throw new Error('Failed to delete member');
        }
    },
};
