import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema, type MemberFormData } from '../schemas/memberSchema';
import { useCreateMember, useUpdateMember } from '../hooks/useMembers';
import { Input, Modal, ModalFooter, Button } from '@/components/ui';
import type { Member } from '@/types';

interface MemberFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    member?: Member;
}

export const MemberFormModal: React.FC<MemberFormModalProps> = ({
    isOpen,
    onClose,
    member,
}) => {
    const isEditMode = !!member;
    const createMutation = useCreateMember();
    const updateMutation = useUpdateMember();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<MemberFormData>({
        resolver: zodResolver(memberSchema),
        defaultValues: member || {
            semester: 1,
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (member) {
                reset(member);
            } else {
                reset({
                    id: '',
                    name: '',
                    study_program: '',
                    semester: 1,
                });
            }
        }
    }, [isOpen, member, reset]);

    const onSubmit = async (data: MemberFormData) => {
        try {
            if (isEditMode) {
                await updateMutation.mutateAsync({ id: member.id, data });
            } else {
                await createMutation.mutateAsync(data);
            }
            onClose();
        } catch (error) {
            // Error handled by mutation
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Member' : 'Add New Member'}
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Input
                        label="NIM (Student ID)"
                        {...register('id')}
                        error={errors.id?.message}
                        placeholder="e.g., 23190001"
                        helperText="Nomor Induk Mahasiswa (8-15 digit angka)"
                    />

                    <Input
                        label="Name"
                        {...register('name')}
                        error={errors.name?.message}
                        placeholder="Enter member name"
                    />

                    <Input
                        label="Study Program"
                        {...register('study_program')}
                        error={errors.study_program?.message}
                        placeholder="e.g., Teknik Informatika"
                    />

                    <Input
                        label="Semester"
                        type="number"
                        {...register('semester', { valueAsNumber: true })}
                        error={errors.semester?.message}
                        placeholder="1-14"
                        min="1"
                        max="14"
                    />
                </div>

                <ModalFooter>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                    >
                        {isEditMode ? 'Update Member' : 'Add Member'}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
