import apiClient from './client';
import { type Member, type CreateMemberDTO, type UpdateMemberDTO } from '../../types';
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
            let members: Member[];

            // If search query exists, use search endpoint for server-side filtering
            if (params.filters?.search && params.filters.search.trim().length > 0) {
                console.log('[API] Using search endpoint with query:', params.filters.search);
                const response = await apiClient.get<Member[]>(`/members/search?q=${encodeURIComponent(params.filters.search)}`);
                members = response.data;

                // Apply additional client-side filters if needed
                if (params.filters?.study_program) {
                    members = members.filter(member => member.study_program === params.filters?.study_program);
                }
            } else {
                // No search query, use regular endpoint
                console.log('[API] Using regular members endpoint');
                const response = await apiClient.get<Member[]>('/members');
                members = response.data;

                // Apply client-side filters
                if (params.filters?.study_program) {
                    members = members.filter(member => member.study_program === params.filters?.study_program);
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
    createMember: async (data: CreateMemberDTO): Promise<void> => {
        await apiClient.post('/members', data);
    },

    /**
     * PUT /members/:id - Update member
     */
    updateMember: async (id: string, data: UpdateMemberDTO): Promise<void> => {
        await apiClient.put(`/members/${id}`, data);
    },

    /**
     * DELETE /members/:id - Delete member
     */
    deleteMember: async (id: string): Promise<void> => {
        await apiClient.delete(`/members/${id}`);
    },
};
