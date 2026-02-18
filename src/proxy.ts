import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only these routes require authentication; all others are public by default
const privateRoutes = ['/user-menu', '/appointments', '/pets'];

const onboardingPaths = ['/auth/register/onboarding', '/auth/register/onboarding/success'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get authentication state from cookies
  const token = request.cookies.get('auth_token')?.value;
  const isVerified = request.cookies.get('is_verified')?.value === 'true';
  const hasProfile = request.cookies.get('has_profile')?.value;
  const onboardingStep = request.cookies.get('onboarding_step')?.value;
  const onboardingCompleted = request.cookies.get('onboarding_completed')?.value === 'true';

  const isAuthenticated = !!token;
  // A route is private if it starts with any of the privateRoutes prefixes
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isOtpPage = pathname === '/auth/register/email/otp';
  const isOnboardingPath = onboardingPaths.includes(pathname);

  // 1. Block unauthenticated users from private routes
  if (isPrivateRoute && !isAuthenticated) {
    const landingPageUrl = new URL('/landing', request.url);
    landingPageUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(landingPageUrl);
  }

  // 2. OTP page - requires authenticated but NOT verified
  if (isOtpPage) {
    if (isAuthenticated && !isVerified) {
      return NextResponse.next();
    }
    // Redirect authenticated & verified users away from OTP
    if (isAuthenticated && isVerified) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Redirect unauthenticated users to landing
    return NextResponse.redirect(new URL('/landing', request.url));
  }

  // 3. (Removed: all other routes are public by default)

  // 4. Authenticated but not verified - redirect to OTP
  if (isAuthenticated && !isVerified) {
    return NextResponse.redirect(new URL('/auth/register/email/otp', request.url));
  }

  // 5. Onboarding paths - require authenticated, verified, and onboarding < 2
  if (isOnboardingPath) {
    const currentStep = onboardingStep ? parseInt(onboardingStep) : 0;
    if (!hasProfile || (currentStep < 4 && !onboardingCompleted)) {
      return NextResponse.next();
    }
    // Onboarding complete, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 6. All other routes - require complete onboarding only for private routes
  const currentStep = onboardingStep ? parseInt(onboardingStep) : 0;
  if (isPrivateRoute && (!hasProfile || (currentStep < 4 && !onboardingCompleted))) {
    return NextResponse.redirect(new URL('/auth/register/onboarding', request.url));
  }

  // All checks passed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
