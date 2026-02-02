import React from 'react';
import { Modal, ModalFooter, Button } from '@/components/ui';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'destructive' | 'warning';
    isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'destructive',
    isLoading = false,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div className="space-y-4">
                {/* Warning Icon */}
                <div className="flex justify-center">
                    <div className={`
                        rounded-full p-3
                        ${variant === 'destructive' ? 'bg-error/10' : 'bg-warning/10'}
                    `}>
                        <ExclamationTriangleIcon
                            className={`w-12 h-12 ${variant === 'destructive' ? 'text-error' : 'text-warning'}`}
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="text-center">
                    <div className="text-slate-700 dark:text-slate-200 leading-relaxed">
                        {message}
                    </div>
                </div>
            </div>

            <ModalFooter>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {cancelText}
                </Button>
                <Button
                    type="button"
                    variant={variant === 'destructive' ? 'destructive' : 'primary'}
                    onClick={onConfirm}
                    isLoading={isLoading}
                >
                    {confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    );
};
