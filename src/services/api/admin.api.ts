import apiClient from './client';

export interface UpdateAdminProfileData {
    username?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
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
     * PUT /admin/me - Update admin profile (username only)
     */
    updateProfile: async (data: UpdateAdminProfileData): Promise<void> => {
        await apiClient.put('/admin/me', data);
    },

    /**
     * PUT /admin/password - Change admin password
     */
    changePassword: async (data: ChangePasswordData): Promise<void> => {
        await apiClient.put('/admin/me/pass', data);
    },
};
