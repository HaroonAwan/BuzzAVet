import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.onboardingSuccessPageMetadata,
};

export default function OnboardingSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
