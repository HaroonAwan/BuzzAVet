import React from 'react';
import { cn } from '@/lib/utils';

export interface ArrowLeftIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
}

/**
 * Arrow left icon component for navigation.
 */
export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, ArrowLeftIconProps>(
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
          d="M5.80074 0.800049L0.800781 5.80005L5.80078 10.8"
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

ArrowLeftIcon.displayName = 'ArrowLeftIcon';
