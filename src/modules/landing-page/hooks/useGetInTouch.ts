import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const getInTouchSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  phoneNumber: yup.string().required('Phone number is required'),
  message: yup.string().required('Message is required'),
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
