import React from 'react';
import { DialogLayout } from '../DialogLayout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/components/form-inputs';
import { confirmPasswordRule, passwordRule } from '@/lib/validationRules';

interface ChangePasswordModelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
interface VerifyAccountData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const changePasswordSchema = yup
  .object({
    currentPassword: yup.string().required('Current password is required'),
    password: passwordRule,
    confirmPassword: confirmPasswordRule,
  })
  .strict();

const ChangePasswordModel = ({ isOpen, setIsOpen }: ChangePasswordModelProps) => {
  const { control, handleSubmit, setError } = useForm<VerifyAccountData>({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleChangePassword = (data: VerifyAccountData) => {
    if (data.password === data.currentPassword) {
      setError('password', {
        type: 'manual',
        message: 'New password must be different from current password',
      });
      return;
    }
    console.log('Password change confirmed with data:', data);
    // setIsOpen(false);
  };

  return (
    <DialogLayout
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Change Password"
      description="Enter your current password and choose a new one."
      isForm={true}
      handleSubmit={handleSubmit(handleChangePassword)}
      actions={[{ label: 'Update Password', type: 'submit' }]}
    >
      <FormInput
        control={control}
        name="currentPassword"
        label="Current Password"
        placeholder="Enter your current password"
        type="password"
      />
      <FormInput
        control={control}
        name="password"
        label="New Password"
        placeholder="Enter your new password"
        type="password"
      />
      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm New Password"
        placeholder="Confirm your new password"
        type="password"
      />
    </DialogLayout>
  );
};

export default ChangePasswordModel;
