import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Modal, ModalFooter, Button } from '@/components/ui';

interface DeleteBookDialogProps {
    isOpen: boolean;
    bookTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting?: boolean;
}

export const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
    isOpen,
    bookTitle,
    onConfirm,
    onCancel,
    isDeleting = false,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} size="sm">
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-error-light dark:bg-error/20 rounded-full mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-error" />
            </div>

            {/* Content */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Delete Book
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-slate-100">"{bookTitle}"</span>?
                    <br />
                    This action cannot be undone.
                </p>
            </div>

            {/* Actions */}
            <ModalFooter>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={isDeleting}
                    isLoading={isDeleting}
                    className="flex-1"
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};
