'use client';

import * as React from 'react';
import { FilterIcon } from '@/assets/icon-components';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Filter trigger button with icon and optional active count badge.
 *
 * Usage:
 * ```tsx
 * <Filter onClick={openFilterDrawer} count={3} active>
 *   Filters
 * </Filter>
 * ```
 *
 * Props:
 * - `onClick`: handler to open filter UI (drawer, modal, etc.).
 * - `count`: optional number of active filters (shows badge when `active`).
 * - `active`: highlights the button and badge when filters are applied.
 * - `disabled`: disables interaction and dims visual styles.
 */
export interface FilterProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
> {
  onClick?: () => void;
  count?: number;
  active?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

// *NOTES: Check Example Usage Below

const Filter = React.forwardRef<HTMLButtonElement, FilterProps>(
  (
    {
      onClick,
      count = 0,
      active = false,
      disabled = false,
      children = 'Filters',
      className,
      ...props
    },
    ref
  ) => {
    const hasCount = count > 0;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center gap-2',
          'rounded-[12px] font-medium transition-colors',
          'focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          'px-4 py-2 text-sm',
          className
        )}
        style={{
          backgroundColor: disabled ? theme.colors.disabledBackground : 'white',
          border: `${active ? '2px' : '1px'} solid ${
            active ? theme.colors.active : theme.colors.defaultBorder
          }`,
          color: disabled ? theme.colors.placeholder : theme.colors.text.default,
        }}
        aria-pressed={active}
        aria-disabled={disabled}
        {...props}
      >
        <FilterIcon size={16} active={active} disabled={disabled} className="shrink-0" />
        <span>{children}</span>
        {hasCount && active && (
          <Badge
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.active,
              color: 'white',
            }}
          >
            {count}
          </Badge>
        )}
      </button>
    );
  }
);

Filter.displayName = 'Filter';

export { Filter };

// ================================ EXAMPLE USAGE ================================

// //////////////////////////////////////////////////////////////
// Basic usage
// <Filter onClick={handleFilter} count={2} active={true}>
//   Filters
// </Filter>;
// //////////////////////////////////////////////////////////////
