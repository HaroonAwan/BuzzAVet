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
    <div className={cn('flex overflow-hidden h-screen', className)}>
      {/* Left side - Form area */}
      <div className="w-full md:w-[54%] flex items-center justify-center bg-background min-h-screen overflow-y-auto">
        <div className="w-full max-w-119">
          <div className="h-screen flex flex-col p-4 md:gap-32">
            {/* Logo section */}
            <div className="flex justify-start h-20 w-full items-center">
              <Logo isUrl="/" />
            </div>

            {/* Form content */}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>

      {/* Right side - Branding/Image area (hidden on mobile) */}
      <div className="hidden md:flex w-full md:w-[46%] relative overflow-hidden">
        <Image
          src={currentBanner}
          alt="Vee.Vet Authentication Banner"
          className="object-cover w-full h-full object-center absolute inset-0"
          priority
        />
        <div className="flex items-start z-15 gap-5 w-full leading-tight justify-end p-15 flex-col">
          <Image
            src={authStars}
            alt="Vee.Vet Authentication Stars"
            className="object-cover object-center w-33 h-5"
            priority
          />
          <h1 className="text-white text-[28px] font-semibold">
            "BuzzAVet made finding a specialist for Bella so incredibly easy. I feel so much safer
            now."
          </h1>
          <p className="text-white text-[16px]">— Sarah & Bella (Golden Retriever)</p>
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
