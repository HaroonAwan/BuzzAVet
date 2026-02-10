'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useLazyGetCurrentUserQuery, useLoginMutation } from '@/apis/auth/authApi';
import { useAppDispatch } from '@/lib/hooks';
import { setCredentials } from '@/apis/auth/authSlice';
import { getTimeZone } from '@/lib/timezone';
import type { LoginRequest } from '@/types/auth';
import { COOKIE_MAX_AGE } from '@/constants';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export function useLogin() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const loginPayload: LoginRequest = {
      email: data.email.toLocaleLowerCase(),
      password: data.password,
      portalType: 'CUSTOMER',
      timeZone: getTimeZone(),
    };

    try {
      const result = await login(loginPayload).unwrap();
      dispatch(
        setCredentials({
          token: result.accessToken,
          isVerified: result.isVerified,
        })
      );

      if (result.accessToken) {
        document.cookie = `auth_token=${result.accessToken}; path=/; max-age=${
          COOKIE_MAX_AGE
        }; SameSite=Lax`;
        document.cookie = `is_verified=${result.isVerified}; path=/; max-age=${
          COOKIE_MAX_AGE
        }; SameSite=Lax`;
      }
      if (result.profile) {
        const profileId = typeof result.profile === 'string' ? result.profile : result.profile._id;
        document.cookie = `has_profile=${profileId}; path=/; max-age=${
          COOKIE_MAX_AGE
        }; SameSite=Lax`;
      }
      if (result.email) {
        document.cookie = `email=${result.email}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      }
      await getCurrentUser(true).unwrap();
      router.push('/');
    } catch (err: any) {
      const errorMessage = err?.data?.message || '';
      if (errorMessage.includes('email')) {
        setError('email', {
          type: 'manual',
          message: errorMessage,
        });
      } else if (errorMessage.includes('password')) {
        setError('password', {
          type: 'manual',
          message: errorMessage,
        });
      } else {
        setError('email', {
          type: 'manual',
          message: errorMessage || 'Login failed. Please try again.',
        });
      }

      console.error('Login failed:', err);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
  };
}
