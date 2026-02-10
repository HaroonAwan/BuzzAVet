import React from 'react';
import { cn } from '@/lib/utils';

export interface ArrowRightIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
}

/**
 * Arrow right icon component for navigation.
 */
export const ArrowRightIcon = React.forwardRef<SVGSVGElement, ArrowRightIconProps>(
  ({ size, className, ...props }, ref) => {
    const width = size ?? 7;
    const height = size ? (size * 12) / 7 : 12;
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M1.19922 0.800049L6.19922 5.80005L1.19922 10.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeMiterlimit="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

ArrowRightIcon.displayName = 'ArrowRightIcon';
