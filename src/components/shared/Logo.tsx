'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/images/logo/Buzz-a-Vet.png';

export interface LogoProps {
  /**
   * URL to navigate to when the logo is clicked.
   * If provided, the logo will be wrapped in a Link component.
   * If not provided or empty, the logo will render as a static image.
   */
  isUrl?: string;
  /**
   * Additional CSS classes to apply to the logo container.
   */
  className?: string;
}

/**
 * Logo component for BuzzAVet brand.
 *
 * Usage:
 * ```tsx
 * // As a clickable link
 * <Logo isUrl="/" />
 *
 * // As a static logo
 * <Logo />
 * ```
 */
export default function Logo({ isUrl, className }: LogoProps) {
  const logoContent = (
    <Image
      src={logoImage}
      alt="BuzzAVet Logo"
      className={cn('h-10 w-41.25 object-contain', className)}
      priority
    />
  );

  // If isUrl is provided, wrap in Link; otherwise return just the image
  if (isUrl) {
    return (
      <Link href={isUrl} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
