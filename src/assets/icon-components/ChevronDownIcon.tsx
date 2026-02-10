import React from 'react';
import { cn } from '@/lib/utils';

export interface ChevronDownIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
}

export const ChevronDownIcon = React.forwardRef<SVGSVGElement, ChevronDownIconProps>(
  ({ size = 20, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M5 7.50004L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeMiterlimit="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

ChevronDownIcon.displayName = 'ChevronDownIcon';
