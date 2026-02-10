import { APP_DESCRIPTION, APP_NAME } from '@/constants';

export const DEFAULT_METADATA = {
  rootLayoutMetadata: {
    title: {
      default: APP_NAME,
      template: '%s | ' + APP_NAME,
    },
    description: APP_DESCRIPTION,
    icons: {
      icon: [{ url: '/favicon.ico' }, { url: '/icon.png', sizes: '32x32', type: 'image/png' }],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [
        {
          rel: 'android-chrome-192x192',
          url: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          rel: 'android-chrome-512x512',
          url: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: APP_NAME,
      description: APP_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  },
  homePageMetadata: {
    title: 'Home',
  },
  loginPageMetadata: {
    title: 'Login',
  },
  registerPageMetadata: {
    title: 'Register',
  },
  onboardingPageMetadata: {
    title: 'Onboarding',
  },
  onboardingSuccessPageMetadata: {
    title: 'Onboarding Success',
  },
  registerEmailPageMetadata: {
    title: 'Register Email',
  },
  otpVerificationPageMetadata: {
    title: 'OTP Verification',
  },
  hospitalsMetadata: {
    title: 'Hospitals',
  },
  hospitalsBookingMetadata: {
    title: 'Hospital Appointment Booking',
  },
};
