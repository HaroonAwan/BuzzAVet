import React from 'react';
import { cn } from '@/lib/utils';

export interface ArrowIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  rotate?: 0 | 90 | 180 | 270; // Rotation in degrees: 0 = right, 180 = left, 90 = down, 270 = up
}

/**
 * Arrow icon component with rotation support.
 * Default direction is right (0 degrees).
 * Use rotate={180} for left arrow.
 */
export const ArrowIcon = React.forwardRef<SVGSVGElement, ArrowIconProps>(
  ({ size = 20, rotate = 0, className, style, ...props }, ref) => {
    const rotation = rotate;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        style={{
          transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
          transformOrigin: 'center',
          transition: 'transform 0.2s',
          ...style,
        }}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M7.50004 5L12.5 10L7.5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

ArrowIcon.displayName = 'ArrowIcon';
