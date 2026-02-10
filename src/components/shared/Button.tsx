'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Reusable button component with size, variant, and icon configuration.
 *
 * Usage:
 * ```tsx
 * <Button size="md" variant="pill">
 *   Primary action
 * </Button>
 *
 * <Button
 *   size="sm"
 *   variant="outline"
 *   icon={<Icon />}
 *   iconPlacement="end"
 * >
 *   With icon
 * </Button>
 * ```
 *
 * Props:
 * - `size`: visual size of the button (`"lg" | "md" | "sm"`).
 * - `variant`: visual style (`"pill" | "outline" | "underline"`).
 * - `icon`: optional icon to render inside the button.
 * - `iconPlacement`: position of the icon (`"start" | "end" | "center"`).
 * - `iconVisibility`: visibility of the icon (`"always" | "hover"`).
 * - `className`: additional CSS classes to apply to the button.
 * - `disabled`: disable the button.
 * - `children`: content to render inside the button.
 * - Inherits all native `button` attributes for accessibility and behavior.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'md' | 'sm' | 'icon';
  variant?: 'pill' | 'outline' | 'underline' | 'ghost' | 'submit';
  icon?: React.ReactNode;
  iconPlacement?: 'start' | 'end' | 'center';
  iconVisibility?: 'always' | 'hover';
}

// *NOTES: Check Example Usage Below

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'pill',
      icon,
      iconPlacement,
      iconVisibility = 'always',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Validate icon props
    if (icon && !iconPlacement) {
      console.warn('Button: iconPlacement is required when icon prop is provided');
    }

    // Size configurations
    const sizeConfig = {
      lg: {
        padding: 'px-6 py-3.5',
        text: 'text-base',
        iconSize: 'h-5 w-5',
      },
      md: {
        padding: 'px-4 py-3',
        text: 'text-sm',
        iconSize: 'h-4 w-4',
      },
      sm: {
        padding: 'px-3 py-1.5',
        text: 'text-sm',
        iconSize: 'h-4 w-4',
      },
      icon: {
        padding: 'p-1',
        text: 'text-base',
        iconSize: 'h-6 w-6',
      },
    };

    // Variant base classes (without colors - colors applied via inline styles)
    const variantClasses = {
      pill: 'rounded-[12px] transition-colors',
      outline: 'rounded-[12px] transition-colors border',
      underline: 'transition-colors underline underline-offset-4',
      ghost: 'transition-colors',
      submit: 'rounded-[12px] transition-colors',
    };

    const currentSize = sizeConfig[size];
    const currentVariantClass = variantClasses[variant];

    // Icon visibility classes
    const iconVisibilityClass =
      iconVisibility === 'hover'
        ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        : 'opacity-100';

    const isCenterIcon = iconPlacement === 'center';

    // Icon spacing (not applied for center placement)
    const iconSpacing = iconPlacement === 'start' ? 'mr-2' : iconPlacement === 'end' ? 'ml-2' : '';

    // Render icon with proper styling
    const renderIcon = () => {
      if (!icon) return null;

      return (
        <span
          className={cn(
            'inline-flex items-center justify-center shrink-0',
            currentSize.iconSize,
            iconVisibilityClass,
            iconSpacing
          )}
        >
          {icon}
        </span>
      );
    };

    // Get variant-specific styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'pill':
          return {
            backgroundColor: theme.colors.active,
            color: 'white',
          };
        case 'outline':
          return {
            backgroundColor: 'white',
            borderColor: theme.colors.defaultBorder,
            color: theme.colors.text.default,
          };
        case 'underline':
          return {
            backgroundColor: 'transparent',
            color: theme.colors.text.default,
          };
        case 'submit':
          return {
            backgroundColor: theme.colors.background.range,
            color: 'white',
          };
        default:
          return {};
      }
    };

    const Comp = 'button';

    const baseStyles = getVariantStyles();

    return (
      <Comp
        ref={ref}
        className={cn(
          'group inline-flex items-center justify-center whitespace-nowrap',
          'focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          'cursor-pointer',
          'font-semibold',
          currentSize.padding,
          currentSize.text,
          currentVariantClass,
          variant === 'pill' && 'hover:opacity-90',
          variant === 'underline' && 'hover:opacity-80',
          className
        )}
        style={{
          ...baseStyles,
          ...(props.style as React.CSSProperties),
        }}
        onMouseEnter={(e) => {
          if (variant === 'outline' && !disabled) {
            e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'outline' && !disabled) {
            e.currentTarget.style.backgroundColor = baseStyles.backgroundColor as string;
          }
        }}
        disabled={disabled}
        {...props}
      >
        {/* Center-only icon (no text, no side margins) */}
        {isCenterIcon && icon && (
          <span
            className={cn(
              'inline-flex items-center justify-center shrink-0',
              currentSize.iconSize,
              iconVisibilityClass
            )}
          >
            {icon}
          </span>
        )}

        {/* Icon + text layouts */}
        {!isCenterIcon && iconPlacement === 'start' && renderIcon()}
        {!isCenterIcon && children && <span>{children}</span>}
        {!isCenterIcon && iconPlacement === 'end' && renderIcon()}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
