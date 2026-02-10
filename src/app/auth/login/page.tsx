import { SharedAuthLayout, LoginForm } from '@modules/auth/login';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.loginPageMetadata,
};

export default function LoginPage() {
  return (
    <SharedAuthLayout>
      <LoginForm />
    </SharedAuthLayout>
  );
}
