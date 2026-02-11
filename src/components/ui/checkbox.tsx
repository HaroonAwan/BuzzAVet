'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export type CheckboxSize = 'lg' | 'md' | 'sm';

export interface CheckboxProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  hasError?: boolean;
}

const sizeStyles: Record<CheckboxSize, number> = {
  lg: 24,
  md: 20,
  sm: 16,
};

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { checked, onCheckedChange, size = 'md', disabled, hasError, className, style, ...props },
    ref
  ) => {
    const boxSize = sizeStyles[size];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      onCheckedChange?.(!checked);
    };

    const getBorderColor = () => {
      if (hasError) return theme.colors.error;
      if (checked) return theme.colors.active;
      return theme.colors.defaultBorder;
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-center rounded-md',
          'transition-colors focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          backgroundColor: checked ? theme.colors.active : theme.colors.surface,
          border: `1.5px solid ${getBorderColor()}`,
          padding: 0,
          ...(style as React.CSSProperties),
        }}
        {...props}
      >
        {checked && (
          <svg
            aria-hidden="true"
            focusable="false"
            width={boxSize - 6}
            height={boxSize - 6}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4.5 10.5L7.5 13.5L15 6"
              stroke={theme.colors.surface}
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    );
  }
);

Checkbox.displayName = 'Checkbox';
