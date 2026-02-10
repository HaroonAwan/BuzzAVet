'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export type SwitchSize = 'lg' | 'md' | 'sm';

export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
}

const sizeStyles: Record<
  SwitchSize,
  { trackWidth: number; trackHeight: number; thumb: number; gap: number }
> = {
  lg: { trackWidth: 56, trackHeight: 32, thumb: 20, gap: 4 },
  md: { trackWidth: 48, trackHeight: 28, thumb: 18, gap: 4 },
  sm: { trackWidth: 40, trackHeight: 24, thumb: 16, gap: 4 },
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, disabled, size = 'md', className, style, ...props }, ref) => {
    const { trackWidth, trackHeight, thumb, gap } = sizeStyles[size];
    const thumbOffset = checked ? trackWidth - thumb - gap : gap;

    const handleClick = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-start rounded-full transition-colors',
          'focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        style={{
          width: `${trackWidth}px`,
          height: `${trackHeight}px`,
          backgroundColor: checked ? theme.colors.active : theme.colors.defaultBorder,
          padding: 0,
          border: 'none',
          ...(style as React.CSSProperties),
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute rounded-full transition-transform"
          style={{
            width: `${thumb}px`,
            height: `${thumb}px`,
            left: `${thumbOffset}px`,
            top: `${(trackHeight - thumb) / 2}px`,
            backgroundColor: theme.colors.surface,
            transform: 'translateZ(0)',
          }}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
