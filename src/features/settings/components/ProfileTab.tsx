import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { profileSchema, type ProfileFormData } from '../schemas/profileSchema';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Input, Button, Card } from '@/components/ui';

export const ProfileTab: React.FC = () => {
    const { user, setUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        try {
            // Update user in store
            setUser({
                ...user!,
                name: data.name,
            });

            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    const handleCancel = () => {
        reset({
            name: user?.name || '',
        });
        setIsEditing(false);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Header with Edit Button */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-soft">
                            <span className="text-3xl text-white font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{user?.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 capitalize">{user?.role || 'admin'}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Member since {new Date().getFullYear()}</p>
                        </div>
                    </div>

                    {!isEditing && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            leftIcon={<PencilIcon className="w-4 h-4" />}
                        >
                            Edit
                        </Button>
                    )}
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    <Input
                        label="Full Name"
                        {...register('name')}
                        error={errors.name?.message}
                        placeholder="Enter your full name"
                        disabled={!isEditing}
                    />

                    {/* Role Display */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Account Role</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Your current permission level</p>
                            </div>
                            <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-blue-300 text-sm font-medium rounded-full capitalize border border-primary-200 dark:border-primary-800">
                                {user?.role || 'admin'}
                            </span>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Username</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Your login identifier</p>
                                </div>
                                <span className="text-sm font-mono text-slate-700 dark:text-slate-200">
                                    {user?.name || 'admin'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions - Only show when editing */}
                {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-600">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            leftIcon={<XMarkIcon className="w-4 h-4" />}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isSubmitting}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </form>
        </Card>
    );
};
