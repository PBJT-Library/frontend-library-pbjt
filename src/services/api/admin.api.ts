import apiClient from './client';

export interface UpdateAdminProfileData {
    username?: string;
    password?: string;
}

export const adminApi = {
    /**
     * GET /admin/me - Get current admin profile
     */
    getProfile: async () => {
        const response = await apiClient.get('/admin/me');
        return response.data;
    },

    /**
     * PUT /admin/me - Update admin profile (username and/or password)
     */
    updateProfile: async (data: UpdateAdminProfileData): Promise<void> => {
        await apiClient.put('/admin/me', data);
    },
};
