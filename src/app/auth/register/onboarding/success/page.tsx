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
      <div className="w-full bg-background flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between py-5 px-15 w-full relative shrink-0">
          <Logo />
        </div>
        {/* Success Content */}
        <div className="flex-1 flex flex-col items-center max-w-133.5 mx-auto w-full px-6">
          {/* Success Illustration */}
          <Image src={SuccessIcon} alt="Success" width={140} height={140} />

          {/* Title */}
          <h1 className="thirty-six font-bold mb-2.5 leading-tight">You're all set!</h1>

          {/* Description */}
          <p className="text-[18px] mb-8 text-center" style={{ color: theme.colors.text.tertiary }}>
            We've created a secure profile for{' '}
            <span className="font-semibold capitalize" style={{ color: theme.colors.text.default }}>
              {petName}
            </span>
            . You can now book appointments instantly.
          </p>

          {/* Pet Profile Card */}
          <div className="rounded-2xl p-5 w-full mb-8 border">
            <div className="flex items-center gap-4 justify-between w-full">
              <div className="shrink-0 flex items-center gap-4">
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
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-muted">
                    <span className="text-3xl">🐾</span>
                  </div>
                )}

                {/* Pet Details */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
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
          <div className="space-y-4 w-full items-center justify-center flex flex-col">
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
