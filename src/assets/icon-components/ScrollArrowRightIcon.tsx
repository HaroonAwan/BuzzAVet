import React from 'react';
import { cn } from '@/lib/utils';

export interface ScrollArrowRightIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
}

/**
 * Dedicated right arrow icon for scroll/carousel navigation.
 * Matches the provided 24x24 SVG and uses currentColor for stroke.
 */
export const ScrollArrowRightIcon = React.forwardRef<SVGSVGElement, ScrollArrowRightIconProps>(
  ({ size, className, ...props }, ref) => {
    const dimension = size ?? 24;
    return (
      <svg
        ref={ref}
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M15.0001 17L20 12L15 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

ScrollArrowRightIcon.displayName = 'ScrollArrowRightIcon';
