import React from 'react';
import { DialogLayout } from '../DialogLayout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/components/form-inputs';

interface DeleteAccountModelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
interface VerifyAccountData {
  confirmationText: string;
}

const verifyDeleteAccountSchema = yup
  .object({
    confirmationText: yup
      .string()
      .required('Confirmation text is required')
      .oneOf(['DELETE'], 'You must type DELETE to confirm account deletion'),
  })
  .strict();

const DeleteAccountModel = ({ isOpen, setIsOpen }: DeleteAccountModelProps) => {
  const { control, handleSubmit } = useForm<VerifyAccountData>({
    resolver: yupResolver(verifyDeleteAccountSchema),
    mode: 'onSubmit',
    defaultValues: {
      confirmationText: '',
    },
  });

  const handleDeleteAccount = (data: VerifyAccountData) => {
    console.log('Account deletion confirmed with data:', data);
    // setIsOpen(false);
  };

  return (
    <DialogLayout
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Delete Account"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      isForm={true}
      handleSubmit={handleSubmit(handleDeleteAccount)}
      actions={[{ label: 'Permanently Delete', type: 'submit', variant: 'destructive' }]}
    >
      <FormInput
        control={control}
        name="confirmationText"
        label='Type "DELETE" to confirm'
        placeholder="Type DELETE to confirm"
      />
    </DialogLayout>
  );
};

export default DeleteAccountModel;
