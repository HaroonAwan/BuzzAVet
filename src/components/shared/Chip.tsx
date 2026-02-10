'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Small labeled status chip for displaying state like warning, alert, or success.
 *
 * Usage:
 * ```tsx
 * <Chip variant="warning">Pending</Chip>
 * <Chip variant="success" size="sm">Active</Chip>
 * ```
 *
 * Props:
 * - `variant`: visual semantic style (`\"warning\" | \"alert\" | \"normal\" | \"success\" | \"pink\" | \"info\"`).
 * - `size`: chip size (`\"md\" | \"sm\"`).
 * - `disabled`: dims and disables interactive behavior.
 * - `onClick`: when provided, renders as an interactive `button`; otherwise as a `span`.
 */
export type ChipVariant = 'warning' | 'alert' | 'normal' | 'success' | 'pink' | 'info';

export type ChipSize = 'md' | 'sm';

export interface ChipProps extends React.HTMLAttributes<HTMLButtonElement | HTMLSpanElement> {
  size?: ChipSize;
  variant: ChipVariant;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

// *NOTES: Check Example Usage Below

const sizeStyles: Record<ChipSize, { padding: string; text: string; height: string }> = {
  md: {
    padding: 'px-2 py-1',
    text: 'text-xs font-medium',
    height: 'h-5.5',
  },
  sm: {
    padding: 'px-1 py-0.5',
    text: 'text-[10px]',
    height: 'h-4.5',
  },
};

const getVariantColors = (variant: ChipVariant) => {
  const chipTheme = theme.colors.chip;

  switch (variant) {
    case 'warning':
      return chipTheme.warning;
    case 'alert':
      return chipTheme.alert;
    case 'normal':
      return chipTheme.normal;
    case 'success':
      return chipTheme.success;
    case 'pink':
      return chipTheme.pink;
    case 'info':
      return chipTheme.info;
    default:
      return chipTheme.normal;
  }
};

const getDefaultLabel = (variant: ChipVariant): string => {
  switch (variant) {
    case 'warning':
      return 'Warning';
    case 'alert':
      return 'Alert';
    case 'normal':
      return 'Normal';
    case 'success':
      return 'Success';
    case 'pink':
      return 'Pink';
    default:
      return '';
  }
};

export const Chip = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ChipProps>(
  (
    { size = 'md', variant, disabled = false, onClick, children, className, style, ...props },
    ref
  ) => {
    const currentSize = sizeStyles[size];
    const { background, text } = getVariantColors(variant);
    const label = children ?? getDefaultLabel(variant);

    const isInteractive = typeof onClick === 'function' && !disabled;

    if (isInteractive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            'inline-flex items-center justify-center rounded-md font-medium',
            'focus-visible:outline-none',
            'disabled:pointer-events-none disabled:opacity-50',
            currentSize.padding,
            currentSize.text,
            currentSize.height,
            className
          )}
          style={{
            backgroundColor: background,
            color: text,
            ...(style as React.CSSProperties),
          }}
          aria-disabled={disabled}
          {...props}
        >
          {label}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium',
          currentSize.padding,
          currentSize.text,
          currentSize.height,
          className
        )}
        style={{
          backgroundColor: background,
          color: text,
          ...(style as React.CSSProperties),
        }}
        {...props}
      >
        {label}
      </span>
    );
  }
);

Chip.displayName = 'Chip';
