'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { CheckboxField } from '@/components/form-inputs/CheckboxField';
import { EncryptedRecordsIcon, VerifiedVetsIcon } from '@/assets/icon-components';
import { theme } from '@/lib/theme';
import { useAppSelector } from '@/lib/hooks';
import { selectCurrentUser } from '@/apis/auth/authSlice';
import { selectStep1Data, setStep1Data } from '@/apis/onBoarding/onBoardingSlice';
import { medicalDataConsentRule, termsAcceptedRule } from '@/lib/validationRules';

// Validation schema for Step 1
const step1Schema = yup.object().shape({
  termsAccepted: termsAcceptedRule,
  medicalDataConsent: medicalDataConsentRule,
});

interface Step1FormData {
  termsAccepted: boolean;
  medicalDataConsent: boolean;
}

/**
 * Step 1: Privacy Consent (Presentational Component)
 * User must agree to Terms of Service and Privacy Policy
 * Optional consent for medical data processing
 */
export default function Step1Privacy() {
  const dispatch = useDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const step1Data = useSelector(selectStep1Data);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Step1FormData>({
    mode: 'onChange',
    resolver: yupResolver(step1Schema),
    defaultValues: {
      termsAccepted: step1Data?.termsAccepted || false,
      medicalDataConsent: step1Data?.medicalDataConsent || false,
    },
  });

  const termsAccepted = watch('termsAccepted');
  const medicalDataConsent = watch('medicalDataConsent');

  // Update form values when step1Data from Redux changes
  React.useEffect(() => {
    if (step1Data) {
      reset({
        termsAccepted: step1Data.termsAccepted,
        medicalDataConsent: step1Data.medicalDataConsent,
      });
    }
  }, [step1Data, reset]);

  // Save form data to Redux on changes
  React.useEffect(() => {
    dispatch(
      setStep1Data({
        termsAccepted,
        medicalDataConsent,
      })
    );
  }, [termsAccepted, medicalDataConsent, dispatch]);

  // Expose form data to parent component via ref or context if needed
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__step1Form = { control, handleSubmit };
    }
  }, [control, handleSubmit]);

  // Save profile _id to parent onboarding form when user data is available
  React.useEffect(() => {
    if (currentUser?.profile && typeof window !== 'undefined') {
      const profileId =
        typeof currentUser.profile === 'string' ? currentUser.profile : currentUser.profile._id;

      const parentForm = (window as any).__onboardingForm;
      if (parentForm?.setValue) {
        parentForm.setValue('profileId', profileId);
      }
    }
  }, [currentUser]);

  return (
    <div className="mt-3 flex w-full flex-1 flex-col">
      <h1 className="thirty-six mb-4 font-semibold">Your privacy comes first.</h1>
      <p className="mb-10" style={{ color: theme.colors.text.secondary }}>
        BuzzAVet is built on trust. We verify every provider and encrypt every record. Before we
        begin, please confirm you understand how we protect you.
      </p>

      {/* Feature Cards */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Encrypted Records Card */}
        <div className="flex flex-col items-start gap-3 p-4 md:gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: theme.colors.background.lightGreen }}
          >
            <EncryptedRecordsIcon size={24} />
          </div>
          <div>
            <h3 className="mb-1.5 text-[18px] font-semibold">Encrypted Records</h3>
            <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
              Your pet's medical history is yours. We never share it without permission.
            </p>
          </div>
        </div>

        {/* Verified Vets Card */}
        <div className="flex flex-col items-start gap-3 p-4 md:gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: theme.colors.chip.alert.background }}
          >
            <VerifiedVetsIcon size={24} />
          </div>
          <div>
            <h3 className="mb-1.5 text-[18px] font-semibold">Verified Vets</h3>
            <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
              Every doctor and hospital on BuzzAVet is manually verified by our team.
            </p>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <CheckboxField<Step1FormData>
          control={control}
          name="termsAccepted"
          label={
            <>
              I agree to the{' '}
              <Link
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.text.linkHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit';
                }}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.text.linkHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit';
                }}
              >
                Privacy Policy
              </Link>
            </>
          }
          rules={{ required: true }}
        />

        <CheckboxField<Step1FormData>
          control={control}
          name="medicalDataConsent"
          label="I consent to the processing of my pet's medical data for treatment purposes."
          rules={{ required: true }}
        />
      </div>
    </div>
  );
}
