import type { Metadata } from 'next';
import OnboardingPage from '@/modules/auth/onboarding';
import { DEFAULT_METADATA } from '@/seo/metadata';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.onboardingPageMetadata,
};

export default OnboardingPage;
