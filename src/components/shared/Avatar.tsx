'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Avatar component for user profiles.
 *
 * - Shows a user image when `url` is provided and loads correctly.
 * - Falls back to initials derived from `name` when image is missing or fails.
 * - Supports five sizes (`"sm" | "md" | "lg" | "xl" | "max"`) and custom surface styles.
 *
 * Usage:
 * ```tsx
 * <Avatar name="Nauman Majeed" url="/avatar.png" size="lg" />
 * <Avatar name="Nauman" size="sm" />
 * ```
 */

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'max';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Full name, e.g. "Nauman Majeed" or "Nauman". Used for initials and aria-label. */
  name: string;
  /** Optional image URL; falls back to initials when missing or on error. */
  url?: string | null;
  /** Visual size of the avatar (`"sm" | "md" | "lg"`). */
  size?: AvatarSize;
  /** Optional style overrides for the avatar surface (background, border, shadow, etc.). */
  variantStyles?: React.CSSProperties;
  /** Additional CSS classes for the avatar container. */
  className?: string;
  alt?: string;
  src?: string;
}

const sizeConfig: Record<
  AvatarSize,
  {
    container: string;
    text: string;
  }
> = {
  sm: {
    container: 'h-8 w-8',
    text: 'text-xs',
  },
  md: {
    container: 'h-10 w-10',
    text: 'text-sm',
  },
  lg: {
    container: 'h-12 w-12',
    text: 'text-base',
  },
  xl: {
    container: 'h-13 w-13',
    text: 'text-xl',
  },
  max: {
    container: 'h-25 w-25',
    text: 'text-3xl',
  },
};

const getInitials = (name: string): string => {
  if (!name) return '';

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() ?? '';
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return `${first ?? ''}${last ?? ''}`.toUpperCase();
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, url, size = 'md', variantStyles, className, ...props }, ref) => {
    const [hasImageError, setHasImageError] = React.useState(false);
    const initials = React.useMemo(() => getInitials(name), [name]);
    const sizeClasses = sizeConfig[size];
    const showImage = !!url && !hasImageError;

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-xl select-none',
          'bg-(--avatar-bg-color) text-(--avatar-text-color)',
          sizeClasses.container,
          className
        )}
        style={
          {
            '--avatar-bg-color': theme.colors.background.muted,
            '--avatar-text-color': theme.colors.text.default,
            ...variantStyles,
          } as React.CSSProperties
        }
        aria-label={name}
        {...props}
      >
        {showImage ? (
          <Image
            src={((url as string) || props.src) ?? ''}
            alt={name || props.alt || 'Avatar'}
            fill
            sizes="100%"
            className="object-cover"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <span className={cn('font-medium uppercase', sizeClasses.text)}>{initials}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
