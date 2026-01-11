import React from 'react';
import { LockClosedIcon, ShieldCheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/ui';

export const SecurityTab: React.FC = () => {
    return (
        <Card>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-600">
                    <div className="p-3 bg-primary-100 rounded-xl">
                        <LockClosedIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Security</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Your account security information</p>
                    </div>
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

                {/* Security Information */}
                <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                        <div className="flex items-start gap-3">
                            <KeyIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-1">Password Protection</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300">Your password is encrypted and stored securely</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
                        <div className="flex items-start gap-3">
                            <LockClosedIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-1">Session Security</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300">Your session is protected with secure authentication tokens</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Tips */}
                <div className="bg-info-light/30 dark:bg-info/10 border border-info-light dark:border-info/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-info-dark dark:text-info-light mb-2">🔒 Security Tips:</p>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 ml-4 list-disc">
                        <li>Always log out when using shared computers</li>
                        <li>Keep your password confidential</li>
                        <li>Use a strong, unique password</li>
                        <li>Contact administrator if you suspect unauthorized access</li>
                    </ul>
                </div>
            </div>
        </Card>
    );
};
