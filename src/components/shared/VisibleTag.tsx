'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Read-only rounded tag used to indicate visible/active states in the UI.
 *
 * Usage:
 * ```tsx
 * <VisibleTag size="md">Visible</VisibleTag>
 * ```
 *
 * Props:
 * - `size`: visual size of the tag (`"lg" | "md" | "sm"`).
 * - `children`: content to render inside the tag.
 * - `className`: additional CSS classes to apply to the tag.
 * - `style`: additional inline styles to apply to the tag.
 */
export interface VisibleTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  size: 'lg' | 'md' | 'sm';
  children: React.ReactNode;
}

// *NOTES: Check Example Usage Below

const sizeStyles: Record<VisibleTagProps['size'], { padding: string; text: string }> = {
  lg: {
    padding: 'px-6 py-3',
    text: 'text-sm',
  },
  md: {
    padding: 'px-5 py-2.5',
    text: 'text-sm',
  },
  sm: {
    padding: 'px-4 py-1.5 h-8',
    text: 'text-xs',
  },
};

export const VisibleTag = React.forwardRef<HTMLSpanElement, VisibleTagProps>(
  ({ size, children, className, style, ...props }, ref) => {
    const currentSize = sizeStyles[size];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex w-fit items-center justify-center rounded-lg font-medium',
          currentSize.padding,
          currentSize.text,
          className
        )}
        style={{
          backgroundColor: theme.colors.background.tertiary,
          color: theme.colors.text.default,
          ...(style as React.CSSProperties),
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

VisibleTag.displayName = 'VisibleTag';
