import { useEffect, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { phoneNumberRule, verificationCodeRule } from '@/lib/validationRules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface AddPhoneFormData {
  phoneNumber: string;
}

interface OtpFormData {
  verificationCode: string;
}

const addPhoneSchema = yup.object({
  phoneNumber: phoneNumberRule,
});

const otpSchema = yup.object({
  verificationCode: verificationCodeRule,
});

export interface PhoneNumberMenuModelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
  variant: 'new' | 'change' | 'verify';
  setPhoneModalVariant: Dispatch<SetStateAction<'new' | 'change' | 'verify'>>;
}

export const usePhoneNumberModel = ({
  setPhoneModalVariant,
  variant,
}: {
  setPhoneModalVariant: Dispatch<SetStateAction<'new' | 'change' | 'verify'>>;
  variant: PhoneNumberMenuModelProps['variant'];
}) => {
  const titleMap: Record<PhoneNumberMenuModelProps['variant'], string> = {
    new: 'Add Phone Number',
    change: 'Change Phone Number',
    verify: 'Verify Phone Number',
  };

  const OTP_STORAGE_KEY = 'phone-otp-timestamp';
  const OTP_TTL_MS = 2 * 60 * 1000;

  // =========================
  // ADD NEW
  // =========================
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    setError: setAddError,
    watch: watchAdd,
    formState: { errors: addErrors },
  } = useForm<AddPhoneFormData>({
    resolver: yupResolver(addPhoneSchema),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
    },
  });

  const handleRequestOtp = (data: AddPhoneFormData, mode: 'new' | 'change' | 'verify') => {
    console.log('Requesting OTP:', { mode, ...data });
    const now = Date.now();
    if (typeof window !== 'undefined') {
      localStorage.setItem(OTP_STORAGE_KEY, String(now));
    }
    setPhoneModalVariant('verify');
  };

  // =========================
  // OTP
  // =========================
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    setError: setOtpError,
    watch: watchOtp,
    formState: { errors: otpErrors },
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    mode: 'onChange',
    defaultValues: {
      verificationCode: '',
    },
  });

  const handleVerifyOtp = (data: OtpFormData) => {
    console.log('Verifying OTP:', data);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(OTP_STORAGE_KEY);
    }
  };

  const handleResendOtp = () => {
    console.log('Resend OTP');
    const now = Date.now();
    if (typeof window !== 'undefined') {
      localStorage.setItem(OTP_STORAGE_KEY, String(now));
    }
  };

  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateRemaining = () => {
      const stored = localStorage.getItem(OTP_STORAGE_KEY);
      const timestamp = stored ? Number(stored) : null;

      if (!timestamp || Number.isNaN(timestamp)) {
        setRemainingMs(null);
        return;
      }

      const elapsed = Date.now() - timestamp;
      const remaining = OTP_TTL_MS - elapsed;
      setRemainingMs(remaining > 0 ? remaining : null);
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [OTP_TTL_MS]);

  useEffect(() => {
    if (typeof window === 'undefined' || variant !== 'verify') return;

    const stored = localStorage.getItem(OTP_STORAGE_KEY);
    const timestamp = stored ? Number(stored) : null;
    const hasValidTimestamp =
      timestamp && !Number.isNaN(timestamp) && Date.now() - timestamp < OTP_TTL_MS;

    if (!hasValidTimestamp) {
      const now = Date.now();
      localStorage.setItem(OTP_STORAGE_KEY, String(now));
      setRemainingMs(OTP_TTL_MS);
      console.log('OTP requested');
    }
  }, [OTP_TTL_MS, variant]);

  const remainingTime = useMemo(() => {
    if (remainingMs === null) return null;
    const totalSeconds = Math.ceil(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [remainingMs]);

  const canResend = remainingMs === null;

  const mapActions: Record<PhoneNumberMenuModelProps['variant'], any[]> = {
    new: [
      {
        label: 'Add',
        type: 'submit' as 'submit',
        variant: 'pill' as 'pill',
        onClick: handleAddSubmit((data) => handleRequestOtp(data, 'new')),
      },
    ],
    change: [
      {
        label: 'Change',
        type: 'submit' as 'submit',
        variant: 'pill' as 'pill',
        onClick: handleAddSubmit((data) => handleRequestOtp(data, 'change')),
      },
    ],
    verify: [
      {
        label: 'Resend OTP',
        type: 'button' as 'button',
        variant: 'underline' as 'underline',
        onClick: handleResendOtp,
        disabled: !canResend,
      },
      {
        label: 'Submit',
        type: 'submit' as 'submit',
        variant: 'pill' as 'pill',
        onClick: handleOtpSubmit(handleVerifyOtp),
      },
    ],
  };

  const handleSubmitMap: Record<PhoneNumberMenuModelProps['variant'], () => void> = {
    new: handleAddSubmit((data) => handleRequestOtp(data, 'new')),
    change: handleAddSubmit((data) => handleRequestOtp(data, 'change')),
    verify: handleOtpSubmit(handleVerifyOtp),
  };

  return {
    addControl,
    addErrors,
    otpControl,
    otpErrors,
    setAddError,
    setOtpError,
    watchAdd,
    watchOtp,
    titleMap,
    mapActions,
    handleSubmitMap,
    remainingTime,
  };
};
