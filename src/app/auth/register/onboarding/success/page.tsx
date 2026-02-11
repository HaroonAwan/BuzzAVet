'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import { theme } from '@/lib/theme';
import type { OnboardingFormData } from '@/types/onboarding';
import SuccessIcon from '@/assets/images/auth/success-image.png';
import { VerifiedVetsIcon } from '@/assets/icon-components/VerifiedVetsIcon';

/**
 * Success screen shown after completing onboarding
 */
export default function OnboardingSuccessPage() {
  const router = useRouter();
  const [submittedData, setSubmittedData] = React.useState<OnboardingFormData | null>(null);

  // Load submitted data from sessionStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('onboarding_submitted_data');
      if (stored) {
        try {
          setSubmittedData(JSON.parse(stored));
          // Clean up after reading
          sessionStorage.removeItem('onboarding_submitted_data');
        } catch (error) {
          console.error('Failed to parse submitted data:', error);
        }
      }
    }
  }, []);

  const handleContinueBooking = () => {
    router.push('/');
  };

  const handleGoToDashboard = () => {
    router.push('/');
  };

  const petName = submittedData?.petName || 'your pet';
  const breed = submittedData?.breed || 'Unknown';
  const age =
    submittedData?.age !== null && submittedData?.age !== undefined
      ? `${submittedData.age} ${submittedData.age === 1 ? 'year' : 'years'} old`
      : 'Unknown age';

  return (
    <>
      <div className="bg-background flex h-screen w-full flex-col">
        {/* Header */}
        <div className="relative flex w-full shrink-0 items-center justify-between px-15 py-5">
          <Logo />
        </div>
        {/* Success Content */}
        <div className="mx-auto flex w-full max-w-133.5 flex-1 flex-col items-center px-6">
          {/* Success Illustration */}
          <Image src={SuccessIcon} alt="Success" width={140} height={140} />

          {/* Title */}
          <h1 className="thirty-six mb-2.5 leading-tight font-bold">You're all set!</h1>

          {/* Description */}
          <p className="mb-8 text-center text-[18px]" style={{ color: theme.colors.text.tertiary }}>
            We've created a secure profile for{' '}
            <span className="font-semibold capitalize" style={{ color: theme.colors.text.default }}>
              {petName}
            </span>
            . You can now book appointments instantly.
          </p>

          {/* Pet Profile Card */}
          <div className="mb-8 w-full rounded-2xl border p-5">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex shrink-0 items-center gap-4">
                {/* Pet Photo */}
                {submittedData?.photo ? (
                  <Image
                    src={
                      typeof submittedData.photo === 'string'
                        ? submittedData.photo
                        : URL.createObjectURL(submittedData.photo)
                    }
                    alt={petName}
                    width={80}
                    height={80}
                    className="rounded-2xl object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-2xl">
                    <span className="text-3xl">🐾</span>
                  </div>
                )}

                {/* Pet Details */}
                <div className="text-left">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{petName}</h3>
                  </div>
                  <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
                    Breed{' '}
                    <span className="font-semibold" style={{ color: theme.colors.text.default }}>
                      {breed}
                    </span>
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
                    Age{' '}
                    <span className="font-semibold" style={{ color: theme.colors.text.default }}>
                      {age}
                    </span>
                  </p>
                </div>
              </div>
              {/* Verified Badge */}
              <p className="inline-flex items-center gap-1.5 text-sm font-medium">
                <VerifiedVetsIcon size={22} />
                <span className="hidden md:flex">Verified</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <Button size="lg" variant="pill" onClick={handleContinueBooking} className="w-full">
              Continue Booking
            </Button>
            <Button variant="underline" size="lg" onClick={handleGoToDashboard}>
              Go To <span className="font-semibold capitalize">{petName}</span> Dashboard
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
