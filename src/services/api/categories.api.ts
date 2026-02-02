import apiClient from './client';
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../../types/category';

export const categoriesApi = {
    /**
     * GET /categories - Get all categories with book counts
     */
    getCategories: async (): Promise<Category[]> => {
        try {
            const response = await apiClient.get<{ success: boolean; data: Category[] }>('/categories');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * GET /categories/:code - Get single category
     */
    getCategory: async (code: string): Promise<Category> => {
        try {
            const response = await apiClient.get<{ success: boolean; data: Category }>(`/categories/${code}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching category ${code}:`, error);
            throw new Error('Category not found');
        }
    },

    /**
     * POST /categories - Create new category (admin only)
     */
    createCategory: async (data: CreateCategoryDTO): Promise<void> => {
        await apiClient.post('/categories', data);
    },

    /**
     * PUT /categories/:code - Update category (admin only)
     */
    updateCategory: async (code: string, data: UpdateCategoryDTO): Promise<void> => {
        await apiClient.put(`/categories/${code}`, data);
    },

    /**
     * DELETE /categories/:code - Delete category (admin only)
     */
    deleteCategory: async (code: string): Promise<void> => {
        await apiClient.delete(`/categories/${code}`);
    },
};
