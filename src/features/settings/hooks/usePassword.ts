import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi, type ChangePasswordData } from '@/services/api/admin.api';

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangePasswordData) => adminApi.changePassword(data),
        onSuccess: () => {
            toast.success('Password changed successfully');
            queryClient.invalidateQueries({ queryKey: ['admin', 'profile'] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to change password';
            toast.error(message);
        },
    });
};
