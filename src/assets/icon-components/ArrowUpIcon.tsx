import React from 'react';
import { cn } from '@/lib/utils';

export interface ArrowUpIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
}

export const ArrowUpIcon = React.forwardRef<SVGSVGElement, ArrowUpIconProps>(
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
          d="M4 10L8.00002 6L12 10"
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

ArrowUpIcon.displayName = 'ArrowUpIcon';
