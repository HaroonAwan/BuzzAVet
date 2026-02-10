import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  emailRule,
  firstNameRule,
  lastNameRule,
  messageRule,
  phoneNumberRule,
} from '@/lib/validationRules';

const getInTouchSchema = yup.object({
  firstName: firstNameRule,
  lastName: lastNameRule,
  email: emailRule,
  phoneNumber: phoneNumberRule,
  message: messageRule,
});

interface GetInTouchFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const useGetInTouch = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GetInTouchFormData>({
    resolver: yupResolver(getInTouchSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  });

  const onSubmit = (data: GetInTouchFormData) => {
    console.log('Get in touch form submitted:', data);
  };

  return { control, handleSubmit: handleSubmit(onSubmit), setError, errors };
};
