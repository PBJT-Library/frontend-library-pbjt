import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LockClosedIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { passwordSchema, type PasswordFormData } from '../schemas/passwordSchema';
import { Input, Button, Card } from '@/components/ui';
import { adminApi } from '@/services/api';

export const SecurityTab: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = async (data: PasswordFormData) => {
        try {
            // Call API to change password
            await adminApi.updateProfile({
                password: data.newPassword
            });

            toast.success('Password changed successfully');
            reset();
            setIsEditing(false);
        } catch (error) {
            toast.error((error as Error).message || 'Failed to change password');
        }
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <Card>
            <div className="space-y-6">
                {/* Header with Edit Button */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary-100 rounded-xl">
                            <LockClosedIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Change Password</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Update your password to keep your account secure</p>
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

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Current Password"
                        type="password"
                        autoComplete="current-password"
                        {...register('currentPassword')}
                        error={errors.currentPassword?.message}
                        placeholder="Enter your current password"
                        disabled={!isEditing}
                    />

                    <Input
                        label="New Password"
                        type="password"
                        autoComplete="new-password"
                        {...register('newPassword')}
                        error={errors.newPassword?.message}
                        placeholder="Enter new password (min. 6 characters)"
                        helperText="Password must be at least 6 characters long"
                        disabled={!isEditing}
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        autoComplete="new-password"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                        placeholder="Confirm your new password"
                        disabled={!isEditing}
                    />

                    {/* Security Tips */}
                    <div className="bg-info-light/30 dark:bg-info/10 border border-info-light dark:border-info/30 rounded-xl p-4">
                        <p className="text-sm font-medium text-info-dark dark:text-info-light mb-2">💡 Password Tips:</p>
                        <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                            <li>Use at least 6 characters</li>
                            <li>Mix uppercase and lowercase letters</li>
                            <li>Include numbers and special characters</li>
                            <li>Don't reuse passwords from other accounts</li>
                        </ul>
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
                                Update Password
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </Card>
    );
};
