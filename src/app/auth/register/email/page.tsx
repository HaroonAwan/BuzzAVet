import { SharedAuthLayout, RegisterForm } from '@modules/auth/register';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.registerEmailPageMetadata,
};

export default function RegisterPage() {
  return (
    <SharedAuthLayout>
      <RegisterForm />
    </SharedAuthLayout>
  );
}
