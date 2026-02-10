'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCredentials, selectEmail } from '@/apis/auth/authSlice';
import {
  useLazyResendOtpQuery,
  useVerifyOtpMutation,
  useLazyGetCurrentUserQuery,
} from '@/apis/auth/authApi';
import { COOKIE_MAX_AGE } from '@/constants';
import { verificationCodeRule } from '@/lib/validationRules';

interface OtpFormData {
  verificationCode: string;
}

const otpSchema = yup.object({
  verificationCode: verificationCodeRule,
});

/**
 * Custom hook for OTP verification form business logic.
 * Handles form state, validation, submission, and authentication flow.
 */
export function useOtpVerification() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const email = useAppSelector(selectEmail) || '';
  const [resendOtp, { isFetching: isResending }] = useLazyResendOtpQuery();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const onSubmit = async (data: OtpFormData) => {
    const verifyPromise = verifyOtp(data.verificationCode)
      .unwrap()
      .then(async (result) => {
        if (result.statusCode === 200) {
          // Update verification status
          dispatch(setCredentials({ isVerified: true }));
          document.cookie = `is_verified=true; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;

          // Fetch current user data
          const userResult = await getCurrentUser(false).unwrap();

          // Update store with user data
          dispatch(setCredentials({ user: userResult }));

          // Navigate based on profile key
          if (userResult.profile) {
            router.push('/');
          } else {
            router.push('/auth/register/onboarding');
          }

          return result;
        }
        throw new Error(result.message || 'Verification failed');
      });

    toast.promise(verifyPromise, {
      loading: 'Verifying code...',
      success: (data) => data.message || 'Code verified successfully!',
      error: (err: any) => {
        reset();
        setError('verificationCode', {
          type: 'manual',
          message: '',
        });

        if (err?.data?.message) {
          return err.data.message;
        } else if (err?.message) {
          return err.message;
        }
        return 'Verification failed. Please try again.';
      },
    });
  };

  const handleResendCode = async () => {
    // Clear the form when resending
    reset();

    const resendPromise = resendOtp().then((result) => {
      if (result.data && result.data.statusCode === 200) {
        return result.data;
      } else if (result.error) {
        throw result.error;
      }
      throw new Error('Failed to resend code');
    });

    toast.promise(resendPromise, {
      loading: 'Sending verification code...',
      success: (data) => data.message,
      error: (err: any) => {
        if (err?.statusCode === 406 && err?.data?.message) {
          return err.data.message;
        } else if (err?.data?.message) {
          return err.data.message;
        }
        return 'Failed to resend code. Please try again.';
      },
    });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    handleResendCode,
    isResending,
    isVerifying,
    errors,
  };
}
