import React from 'react';
import { cn } from '@/lib/utils';

export interface CatIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  iconColor?: string;
}

export const CatIcon = React.forwardRef<SVGSVGElement, CatIconProps>(
  ({ size = 24, className, iconColor = '#020409', ...props }, ref) => {
    // iconColor should be white when selected, black when unselected
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M11.9986 5.00002C12.6686 5.00002 13.3486 5.09002 13.9986 5.26002C15.7786 3.26002 19.0286 2.42002 20.4186 3.00002C21.8186 3.58002 19.9986 10 19.9986 10C20.5686 11.07 20.9986 12.24 20.9986 13.44C20.9986 17.9 16.9686 21 11.9986 21C7.02861 21 2.99861 18 2.99861 13.44C2.99861 12.19 3.49861 11.04 3.99861 10C3.99861 10 2.10861 3.58002 3.49861 3.00002C4.88861 2.42002 8.21861 3.23002 9.99861 5.23002C10.6546 5.07913 11.3255 5.00198 11.9986 5.00002Z"
          fill={iconColor}
        />
        <path
          d="M8 12V12.5"
          stroke={iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF'}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12V12.5"
          stroke={iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF'}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.3414 15.3414C10.2154 15.2154 10.3047 15 10.4828 15H13.5172C13.6953 15 13.7846 15.2154 13.6586 15.3414L12.1414 16.8586C12.0633 16.9367 11.9367 16.9367 11.8586 16.8586L10.3414 15.3414Z"
          fill={iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF'}
        />
      </svg>
    );
  }
);

CatIcon.displayName = 'CatIcon';
