'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export type RadioSize = 'lg' | 'md' | 'sm';

export interface RadioProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: RadioSize;
}

const sizeStyles: Record<RadioSize, number> = {
  lg: 24,
  md: 20,
  sm: 16,
};

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ checked, onCheckedChange, size = 'md', disabled, className, style, ...props }, ref) => {
    const outerSize = sizeStyles[size];
    const innerSize = checked ? Math.round(outerSize * 0.66) : 0;
    const borderWidth = 1.67;

    const handleClick = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full',
          'transition-colors focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        style={{
          width: `${outerSize}px`,
          height: `${outerSize}px`,
          backgroundColor: theme.colors.surface,
          border: `${borderWidth}px solid ${
            checked ? theme.colors.active : theme.colors.mutedBorder
          }`,
          padding: 0,
          ...(style as React.CSSProperties),
        }}
        {...props}
      >
        {checked && (
          <span
            aria-hidden="true"
            className="rounded-full"
            style={{
              width: `${innerSize}px`,
              height: `${innerSize}px`,
              backgroundColor: theme.colors.active,
            }}
          />
        )}
      </button>
    );
  }
);

Radio.displayName = 'Radio';
