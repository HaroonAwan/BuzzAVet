'use client';

import * as React from 'react';
import { PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export interface PopoverLayoutProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

/**
 * Custom popover layout component with consistent styling.
 *
 * Usage:
 * ```tsx
 * <PopoverLayout align="end" side="bottom">
 *   <PopoverMenu items={menuItems} />
 * </PopoverLayout>
 * ```
 */
export function PopoverLayout({
  children,
  className,
  align = 'end',
  side = 'bottom',
  sideOffset = 8,
}: PopoverLayoutProps) {
  return (
    <PopoverContent
      align={align}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        'SHADOW w-auto min-w-[280px] rounded-[12px] p-0',
        'overflow-hidden border-none bg-white',
        className
      )}
    >
      {children}
    </PopoverContent>
  );
}
