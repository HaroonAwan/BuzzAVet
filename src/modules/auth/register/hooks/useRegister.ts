'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '@/apis/auth/authApi';
import { useAppDispatch } from '@/lib/hooks';
import { setCredentials } from '@/apis/auth/authSlice';
import type { RegisterRequest } from '@/types/auth';
import { getTimeZoneInfo } from '@/lib/timezone';
import { COOKIE_MAX_AGE } from '@/constants';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .test('no-whitespace', 'Password cannot start/end with spaces', (value) => {
      if (!value) return true;
      return value === value.trim();
    })
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

/**
 * Custom hook for register form business logic.
 * Handles form state, validation, submission, and authentication flow.
 */
export function useRegister() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { timeZone } = getTimeZoneInfo();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const registerData: RegisterRequest = {
      email: data.email.toLocaleLowerCase(),
      password: data.password,
      portalType: 'CUSTOMER',
      role: 'CUSTOMER',
      timeZone: timeZone,
      firstName: data.email.split('@')[0],
      lastName: '&nbsp',
    };

    try {
      const result = await register(registerData).unwrap();

      toast.success('Account created successfully!');

      dispatch(
        setCredentials({
          accessToken: result.accessToken,
          email: data.email.toLocaleLowerCase(),
          isVerified: result.isVerified,
        })
      );

      if (result.accessToken) {
        document.cookie = `auth_token=${result.accessToken}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
        document.cookie = `is_verified=${result.isVerified}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      }
      if (result.email) {
        document.cookie = `email=${result.email}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      }

      router.push(
        `/auth/register/email/otp?email=${encodeURIComponent(data.email.toLocaleLowerCase())}`
      );
    } catch (err: any) {
      console.error('Registration failed:', err);

      if (err?.status === 406 && err?.data?.message?.includes('email already exist')) {
        setError('email', {
          type: 'manual',
          message: err.data.message,
        });
        return;
      }

      if (err?.data?.message) {
        if (Array.isArray(err.data.message)) {
          toast.error(err.data.message.join(', '));
        } else {
          toast.error(err.data.message);
        }
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isRegistering: isLoading,
    error,
    errors,
  };
}
