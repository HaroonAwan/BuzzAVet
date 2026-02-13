'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckAccountValidityQuery, useLazyGetCurrentUserQuery } from '@/apis/auth/authApi';

interface UseAccountValidityProps {
  email: string;
}

/**
 * Custom hook for checking account validity.
 * Invalidates the query on mount and handles navigation based on verification status.
 * - If isVerified is true, navigates to landing page
 * - If isVerified is false, shows OTP screen (returns showOtp: true)
 */
export function useAccountValidity({ email }: UseAccountValidityProps) {
  const router = useRouter();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const { data, error, isLoading, refetch } = useCheckAccountValidityQuery(email, {
    skip: !email,
  });

  useEffect(() => {
    if (email) {
      refetch();
    }
  }, [email, refetch]);

  useEffect(() => {
    if (data?.isVerified) {
      getCurrentUser(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [data, router]);

  const showOtp = !isLoading && data !== undefined && !data.isVerified;

  return {
    isVerified: data?.isVerified ?? false,
    showOtp,
    isLoading,
    error,
  };
}
