import { SharedAuthLayout, RegisterLanding } from '@modules/auth/register';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.registerPageMetadata,
};

export default function RegisterPage() {
  return (
    <SharedAuthLayout>
      <RegisterLanding />
    </SharedAuthLayout>
  );
}
