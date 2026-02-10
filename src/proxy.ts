import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { store } from './lib/store';

const publicPaths = [
  '/landing',
  '/auth/login',
  '/auth/register',
  '/auth/register/email',
  '/auth/register/email/otp',
  '/terms-of-service',
  '/privacy-policy',
];

// TODO: REMOVE NOTES AND CLEANUP ONCE DONE TESTING

const onboardingPaths = ['/auth/register/onboarding', '/auth/register/onboarding/success'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get authentication state from cookies
  const token = request.cookies.get('auth_token')?.value;
  const isVerified = request.cookies.get('is_verified')?.value === 'true';
  const hasProfile = request.cookies.get('has_profile')?.value;
  const onboardingStep = request.cookies.get('onboarding_step')?.value;

  // Path checks
  const isAuthenticated = !!token;
  const isPublicPath = publicPaths.includes(pathname);
  const isOnboardingPath = onboardingPaths.includes(pathname);
  const isOtpPage = pathname === '/auth/register/email/otp';

  // Not authenticated: redirect to landing-page for protected routes
  if (!isAuthenticated && !isPublicPath) {
    const landingPageUrl = new URL('/landing', request.url);
    landingPageUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(landingPageUrl);
  }

  // Authenticated but not verified: restrict to OTP page only
  if (isAuthenticated && !isVerified) {
    if (isOtpPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/register/email/otp', request.url));
  }

  // Authenticated and verified: handle various protected/public paths
  if (isAuthenticated && isVerified) {
    // Redirect away from OTP page
    if (isOtpPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to terms-of-service and privacy-policy pages (before other redirects)
    if (pathname === '/terms-of-service' || pathname === '/privacy-policy') {
      return NextResponse.next();
    }

    // Redirect away from public auth routes (login, register)
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to onboarding pages
    if (isOnboardingPath) {
      return NextResponse.next();
    }

    // Optional: Redirect to onboarding if user has profile but onboarding is incomplete
    // This is a stricter check that ensures users complete onboarding before accessing main app features

    if (
      (onboardingStep && parseInt(onboardingStep) < 2 && hasProfile) ||
      (hasProfile && !onboardingStep)
    ) {
      return NextResponse.redirect(new URL('/auth/register/onboarding', request.url));
    }
    // Redirect to onboarding if user has no profile
    // Profile is set as a cookie when getCurrentUser is called after login
    if (!hasProfile) {
      return NextResponse.redirect(new URL('/auth/register/onboarding', request.url));
    }
  }

  // Allow access for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
