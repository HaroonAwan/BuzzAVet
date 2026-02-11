'use client';

import * as React from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/Logo';
import authBannerImage from '@/assets/images/banners/auth-banner-login.png';
import registerBanner from '@/assets/images/banners/auth-banner-register.png';
import registerEmailBanner from '@/assets/images/banners/auth-banner-register-email.png';
import otpBanner from '@/assets/images/banners/auth-banner-otp.png';
import authStars from '@/assets/images/auth/stars.svg';

export interface SharedAuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared authentication layout component used for both login and register pages.
 * This layout handles the visual arrangement of auth forms and branding elements.
 * Banner image is dynamically selected based on the current pathname.
 */
export default function SharedAuthLayout({ children, className }: SharedAuthLayoutProps) {
  const pathname = usePathname();

  // Banner image mapping based on pathname
  const bannerMap: Record<string, StaticImageData> = {
    '/auth/login': authBannerImage,
    '/auth/register': registerBanner,
    '/auth/register/email': registerEmailBanner,
    '/auth/register/email/otp': otpBanner,
  };

  const currentBanner = bannerMap[pathname] || authBannerImage;

  return (
    <div className={cn('flex h-screen overflow-hidden', className)}>
      {/* Left side - Form area */}
      <div className="bg-background flex min-h-screen w-full items-center justify-center overflow-y-auto md:w-[54%]">
        <div className="w-full max-w-119">
          <div className="flex h-screen flex-col p-4 md:gap-32">
            {/* Logo section */}
            <div className="flex h-20 w-full items-center justify-start">
              <Logo isUrl="/" />
            </div>

            {/* Form content */}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>

      {/* Right side - Branding/Image area (hidden on mobile) */}
      <div className="relative hidden w-full overflow-hidden md:flex md:w-[46%]">
        <Image
          src={currentBanner}
          alt="Vee.Vet Authentication Banner"
          className="absolute inset-0 h-full w-full object-cover object-center"
          priority
        />
        <div className="z-15 flex w-full flex-col items-start justify-end gap-5 p-15 leading-tight">
          <Image
            src={authStars}
            alt="Vee.Vet Authentication Stars"
            className="h-5 w-33 object-cover object-center"
            priority
          />
          <h1 className="text-[28px] font-semibold text-white">
            "BuzzAVet made finding a specialist for Bella so incredibly easy. I feel so much safer
            now."
          </h1>
          <p className="text-[16px] text-white">— Sarah & Bella (Golden Retriever)</p>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 51.94%, #000000 100%)',
          }}
        />
      </div>
    </div>
  );
}
