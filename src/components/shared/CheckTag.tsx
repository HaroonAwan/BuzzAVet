'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Toggleable pill-style tag for filter-like selections.
 *
 * Usage:
 * ```tsx
 * <CheckTag active>Active tag</CheckTag>
 * <CheckTag disabled>Disabled tag</CheckTag>
 * ```
 *
 * Props:
 * - `active`: controls selected/pressed visual state.
 * - `disabled`: disables interaction and dims visual styles.
 * - `className`: additional CSS classes to apply to the check tag.
 * - Inherits button attributes for click handlers and accessibility.
 */
export interface CheckTagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

// *NOTES: Check Example Usage Below

const CheckTag = React.forwardRef<HTMLButtonElement, CheckTagProps>(
  ({ active = false, disabled = false, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-xl font-medium transition-colors',
          'focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          'px-4 py-2 text-sm',
          className
        )}
        style={{
          backgroundColor: disabled ? theme.colors.disabledBackground : 'white',
          border: `1px solid ${active ? theme.colors.active : theme.colors.defaultBorder}`,
          color: disabled ? theme.colors.placeholder : theme.colors.text.default,
        }}
        aria-pressed={active}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CheckTag.displayName = 'CheckTag';

export { CheckTag };
