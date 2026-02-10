'use client';

import { FormInput } from '@/components/form-inputs/Input';
import { Button } from '@/components/shared/Button';
import { useLogin } from '../hooks/useLogin';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { GoogleIcon } from '@/assets/icon-components/GoogleIcon';
import AppleIcon from '@/assets/images/auth/apple-icon.png';
import Link from 'next/link';

/**
 * Login form section component - JSX only.
 * All business logic is handled by the useLogin hook.
 */
export default function LoginForm() {
  const { control, handleSubmit, onSubmit, isLoading } = useLogin();

  return (
    <>
      <div className="mb-8">
        <h1 className="thirty-six font-semibold leading-tight mb-2">Welcome to BuzzAVet</h1>
        <p className={'text-base'} style={{ color: theme.colors.text.secondary }}>
          The trusted way to care for your furry family members.
        </p>
      </div>
      {/* login form section */}
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
          placeholder="Enter your password"
        />

        <Button type="submit" size="lg" variant="pill" disabled={isLoading} className="w-full mt-3">
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      {/* or divide the form into two sections */}
      <div className="flex items-center gap-4 my-4">
        <div className="w-full h-px bg-(--color-muted)" />
        <p className="text-[12px] font-medium text-muted-foreground">OR</p>
        <div className="w-full h-px bg-(--color-muted)" />
      </div>
      {/* Social logins */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Button
          type="button"
          size="lg"
          variant="outline"
          disabled={isLoading}
          className="w-full md:w-[calc(50%-8px)]"
          icon={<GoogleIcon size={20} />}
          iconPlacement="start"
        >
          Log in with Google
        </Button>

        <Button
          type="button"
          size="lg"
          variant="outline"
          disabled={isLoading}
          className="w-full md:w-[calc(50%-8px)]"
          icon={<img src={AppleIcon.src} alt="Apple" className="w-5 h-5 mb-1" />}
          iconPlacement="start"
        >
          Log in with Apple
        </Button>
      </div>
      {/* signup section */}
      <div className="flex items-center justify-center mt-8">
        <p className={'text-base'} style={{ color: theme.colors.text.secondary }}>
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="text-foreground font-medium underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
