'use client';

import * as React from 'react';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/shared/Button';
import { ArrowLeftIcon } from '@/assets/icon-components';
import { useRouter } from 'next/navigation';
import { theme } from '@/lib/theme';

export interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  onSaveAndExit?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  nextButtonText?: string;
  showSaveAndExit?: boolean;
  isSubmitting?: boolean;
}

/**
 * Layout component for onboarding flow.
 * Provides header with logo and save & exit, progress indicator, and footer navigation.
 */
export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps = 4,
  onBack,
  onNext,
  onSaveAndExit,
  canGoBack = true,
  canGoNext = false,
  nextButtonText = 'Next',
  showSaveAndExit = true,
  isSubmitting = false,
}: OnboardingLayoutProps) {
  const router = useRouter();

  return (
    <>
      <div className="bg-background flex h-screen w-full flex-col">
        {/* Header */}
        <div className="relative flex w-full shrink-0 items-center justify-between px-15 py-5">
          <Logo />
          {showSaveAndExit && (
            <Button
              variant="underline"
              size="sm"
              onClick={onSaveAndExit || (() => router.push('/'))}
              disabled={isSubmitting}
            >
              Save & Exit
            </Button>
          )}
          <div className="absolute right-0 bottom-0 left-0 h-1">
            <div
              className="h-full rounded-r-full"
              style={{
                width: `${(100 / totalSteps) * currentStep}%`,
                backgroundColor: theme.colors.active,
              }}
            ></div>
          </div>
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="mx-auto mt-10 flex w-full max-w-3xl flex-1 flex-col overflow-y-auto">
            {/* Step Counter */}
            <div className="shrink-0 px-6">
              <p
                className="text-sm font-medium tracking-wide uppercase"
                style={{ color: theme.colors.text.secondary }}
              >
                STEP {currentStep} OF {totalSteps}
              </p>
            </div>
            <div className="w-full flex-1 px-6 pb-6">{children}</div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div
          className="flex w-full shrink-0 items-center justify-between px-6 py-5 md:px-15"
          style={{ borderColor: theme.colors.border.default }}
        >
          <div>
            {canGoBack && onBack && (
              <Button
                onClick={onBack}
                size="md"
                variant="ghost"
                icon={<ArrowLeftIcon size={7} />}
                iconPlacement="start"
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
          </div>
          <div>
            {onNext && (
              <Button
                size="lg"
                variant="pill"
                onClick={onNext}
                disabled={isSubmitting}
                icon={<ArrowLeftIcon className="rotate-180" size={7} />}
                iconPlacement="end"
              >
                {nextButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
