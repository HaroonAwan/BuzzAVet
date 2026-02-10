'use client';

import { FormInput } from '@/components/form-inputs/Input';
import { Button } from '@/components/shared/Button';
import { useRegister } from '../hooks/useRegister';
import { theme } from '@/lib/theme';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/assets/icon-components/ArrowLeftIcon';
import { useRouter } from 'next/navigation';

/**
 * Register form section component - JSX only.
 * All business logic is handled by the useRegister hook.
 */
export default function RegisterForm() {
  const { control, handleSubmit, onSubmit, isRegistering, error } = useRegister();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {/* back button */}
      <div className="hidden md:flex justify-start mb-7">
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
      </div>
      {/* title */}
      <div className="mb-8">
        <h1 className="thirty-six font-semibold leading-tight mb-2">Create Your Account</h1>
        <p className={'text-base'} style={{ color: theme.colors.text.secondary }}>
          Join thousands of pet parents today.
        </p>
      </div>
      {/* register form section */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
        />

        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
        />

        <Button
          type="submit"
          size="lg"
          variant="pill"
          disabled={isRegistering}
          className="w-full mt-3"
        >
          {isRegistering ? 'Creating account...' : 'Continue'}
        </Button>
        <Button type="button" onClick={handleBack} variant="underline" className="w-full md:hidden">
          Back
        </Button>
      </form>
    </>
  );
}
