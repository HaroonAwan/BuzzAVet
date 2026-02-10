import React from 'react';
import { cn } from '@/lib/utils';

export interface ArrowDownIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
}

export const ArrowDownIcon = React.forwardRef<SVGSVGElement, ArrowDownIconProps>(
  ({ size = 16, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M4 6.00003L8.00002 10L12 6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

ArrowDownIcon.displayName = 'ArrowDownIcon';
