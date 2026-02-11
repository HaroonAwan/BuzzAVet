'use client';

import { FormInput } from '@/components/form-inputs/Input';
import { Button } from '@/components/shared/Button';
import { useOtpVerification } from '../hooks/useOtpVerification';
import { useAccountValidity } from '../hooks/useAccountValidity';
import { theme } from '@/lib/theme';
import { ArrowLeftIcon } from '@/assets/icon-components/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import { useLogout } from '../../hooks/useLogout';

/**
 * OTP verification form section component - JSX only.
 * All business logic is handled by the useOtpVerification hook.
 */
export default function OtpVerificationForm() {
  // email from cookie
  const email = (() => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )email=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  })();
  const { control, handleSubmit, onSubmit, handleResendCode, isResending, isVerifying } =
    useOtpVerification();
  const {
    showOtp,
    isLoading: isCheckingValidity,
    error,
  } = useAccountValidity({ email: email || '' });
  const handleLogout = useLogout();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  if (!email) {
    router.push('/auth/register');
    return null;
  }

  // Show loading state while checking account validity
  if (isCheckingValidity) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-base" style={{ color: theme.colors.text.secondary }}>
          Checking account status...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-base text-red-500">
          Failed to check account validity. Please try again.
        </p>
      </div>
    );
  }

  // Only show OTP form if account is not verified
  if (!showOtp) {
    return null;
  }

  return (
    <>
      {/* back button */}
      {/* <div className="hidden md:flex justify-start mb-7">
        <Button
          type="button"
          size="lg"
          variant="ghost"
          className="w-fit p-0"
          icon={<ArrowLeftIcon />}
          iconPlacement="start"
          onClick={handleBack}
        >
          Back
        </Button>
      </div> */}

      {/* title */}
      <div className="mb-8">
        <h1 className="thirty-six mb-2 leading-tight font-semibold">Check your messages</h1>
        <p className={'text-base'} style={{ color: theme.colors.text.secondary }}>
          We sent a 6-digit code to{' '}
          <span className="font-semibold" style={{ color: theme.colors.text.default }}>
            {email || 'your email'}
          </span>
          .
        </p>
      </div>

      {/* OTP form section */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput control={control} name="verificationCode" type="otp" />

        {/* Resend code section */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
            Didn't receive it?
          </p>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-sm font-medium underline underline-offset-2 transition-opacity hover:opacity-70 disabled:cursor-not-allowed! disabled:opacity-50"
            style={{ color: theme.colors.active }}
          >
            Resend Code
          </button>
        </div>

        <Button
          disabled={isVerifying}
          type="submit"
          size="lg"
          variant="pill"
          className="mt-3 w-full disabled:cursor-not-allowed!"
        >
          Verify
        </Button>
        <Button type="button" onClick={handleLogout} variant="outline" className="w-full">
          Logout
        </Button>
        {/* <Button type="button" onClick={handleBack} variant="underline" className="w-full md:hidden">
          Back
        </Button> */}
      </form>
    </>
  );
}
