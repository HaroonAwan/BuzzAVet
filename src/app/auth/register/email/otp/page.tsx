import { DEFAULT_METADATA } from '@/seo/metadata';
import { SharedAuthLayout, OtpVerificationForm } from '@modules/auth/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.otpVerificationPageMetadata,
};

export default function OtpVerificationPage() {
  return (
    <SharedAuthLayout>
      <OtpVerificationForm />
    </SharedAuthLayout>
  );
}
