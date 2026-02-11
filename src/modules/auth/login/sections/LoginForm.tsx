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
        <h1 className="thirty-six mb-2 leading-tight font-semibold">Welcome to BuzzAVet</h1>
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

        <Button type="submit" size="lg" variant="pill" disabled={isLoading} className="mt-3 w-full">
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      {/* or divide the form into two sections */}
      <div className="my-4 flex items-center gap-4">
        <div className="h-px w-full bg-(--color-muted)" />
        <p className="text-muted-foreground text-[12px] font-medium">OR</p>
        <div className="h-px w-full bg-(--color-muted)" />
      </div>
      {/* Social logins */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
          icon={<img src={AppleIcon.src} alt="Apple" className="mb-1 h-5 w-5" />}
          iconPlacement="start"
        >
          Log in with Apple
        </Button>
      </div>
      {/* signup section */}
      <div className="mt-8 flex items-center justify-center">
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
