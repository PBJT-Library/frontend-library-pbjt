import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockClosedIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Card, Input, Button } from '@/components/ui';
import { passwordSchema, type PasswordFormData } from '../schemas/passwordSchema';
import { useChangePassword } from '../hooks/usePassword';

export const SecurityTab: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const changePasswordMutation = useChangePassword();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const newPassword = watch('newPassword');

    // Calculate password strength
    const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 4) return { strength: 2, label: 'Medium', color: 'bg-yellow-500' };
        return { strength: 3, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(newPassword);

    const onSubmit = async (data: PasswordFormData) => {
        try {
            await changePasswordMutation.mutateAsync({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
            reset();
            setIsEditing(false);
        } catch (error) {
            // Error handled by mutation
        }
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Header with Edit Button */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                            <LockClosedIcon className="w-6 h-6 text-primary-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Security Settings</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Manage your account password</p>
                        </div>
                    </div>

                    {!isEditing && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            leftIcon={<PencilIcon className="w-4 h-4" />}
                        >
                            Change Password
                        </Button>
                    )}
                </div>

                {/* Security Status */}
                <div className="bg-success-light/30 dark:bg-success/10 border border-success-light dark:border-success/30 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-success-dark dark:text-success-light flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-medium text-success-dark dark:text-success-light mb-1">Account Secured</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">Your account is protected with a secure password</p>
                        </div>
                    </div>
                </div>

                {/* Password Change Form - Only show when editing */}
                {isEditing && (
                    <>
                        {/* Password Fields */}
                        <div className="space-y-4">
                            {/* Current Password */}
                            <div className="relative">
                                <Input
                                    label="Current Password"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    {...register('currentPassword')}
                                    error={errors.currentPassword?.message}
                                    placeholder="Enter your current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showCurrentPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* New Password */}
                            <div className="relative">
                                <Input
                                    label="New Password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    {...register('newPassword')}
                                    error={errors.newPassword?.message}
                                    placeholder="Enter your new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showNewPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {newPassword && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Password Strength:</span>
                                        <span className={`font-medium ${passwordStrength.strength === 1 ? 'text-red-600 dark:text-red-400' :
                                                passwordStrength.strength === 2 ? 'text-yellow-600 dark:text-yellow-400' :
                                                    'text-green-600 dark:text-green-400'
                                            }`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-2 flex-1 rounded-full ${level <= passwordStrength.strength
                                                        ? passwordStrength.color
                                                        : 'bg-slate-200 dark:bg-slate-700'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Confirm Password */}
                            <div className="relative">
                                <Input
                                    label="Confirm New Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    error={errors.confirmPassword?.message}
                                    placeholder="Confirm your new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Security Tips */}
                        <div className="bg-info-light/30 dark:bg-info/10 border border-info-light dark:border-info/30 rounded-xl p-4">
                            <p className="text-sm font-medium text-info-dark dark:text-info-light mb-2">🔒 Password Requirements:</p>
                            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 ml-4 list-disc">
                                <li>At least 8 characters long</li>
                                <li>Contains uppercase and lowercase letters</li>
                                <li>Contains at least one number</li>
                                <li>Use a unique password you haven't used before</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
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
                                disabled={isSubmitting}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </>
                )}

                {/* Security Information - Only show when NOT editing */}
                {!isEditing && (
                    <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-start gap-3">
                                <LockClosedIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-1">Password Protection</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">Your password is encrypted and stored securely</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-info-light/30 dark:bg-info/10 border border-info-light dark:border-info/30 rounded-xl p-4">
                            <p className="text-sm font-medium text-info-dark dark:text-info-light mb-2">🔒 Security Tips:</p>
                            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 ml-4 list-disc">
                                <li>Always log out when using shared computers</li>
                                <li>Keep your password confidential</li>
                                <li>Use a strong, unique password</li>
                                <li>Change your password regularly</li>
                            </ul>
                        </div>
                    </div>
                )}
            </form>
        </Card>
    );
};
