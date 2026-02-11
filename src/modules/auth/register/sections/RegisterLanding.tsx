'use client';

import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import { GoogleIcon } from '@/assets/icon-components/GoogleIcon';
import { EmailIcon } from '@/assets/icon-components/EmailIcon';
import AppleIcon from '@/assets/images/auth/apple-icon.png';
import Link from 'next/link';

/**
 * Register landing page component - JSX only.
 * Displays sign-up options: Google, Apple, and Email.
 */
export default function RegisterLanding() {
  return (
    <>
      <div className="mb-8">
        <h1 className="thirty-six mb-2 leading-tight font-semibold">Create your account</h1>
        <p className={'text-base'} style={{ color: theme.colors.text.secondary }}>
          Join thousands of pet parents today,
        </p>
      </div>

      {/* Social login buttons */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Button
          type="button"
          size="lg"
          variant="outline"
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
          className="w-full md:w-[calc(50%-8px)]"
          icon={<img src={AppleIcon.src} alt="Apple" className="mb-1 h-5 w-5" />}
          iconPlacement="start"
        >
          Log In with Apple
        </Button>
      </div>

      {/* OR divider */}
      <div className="my-4 flex items-center gap-4">
        <div className="h-px w-full bg-(--color-muted)" />
        <p className="text-muted-foreground text-[12px] font-medium">OR</p>
        <div className="h-px w-full bg-(--color-muted)" />
      </div>

      {/* Email button */}
      <Link href="/auth/register/email" className="block w-full">
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full"
          icon={<EmailIcon size={20} />}
          iconPlacement="start"
        >
          Continue with Email
        </Button>
      </Link>

      {/* Login link footer */}
      <div className="mt-8 flex items-center justify-center">
        <p className={'text-base'} style={{ color: theme.colors.text.secondary }}>
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-foreground font-medium underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
