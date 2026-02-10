import React from 'react';
import { cn } from '@/lib/utils';

export interface BirdIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  iconColor?: string;
}

export const BirdIcon = React.forwardRef<SVGSVGElement, BirdIconProps>(
  ({ size = 24, className, iconColor = '#020409', ...props }, ref) => {
    // iconColor should be white when selected, black when unselected
    const contrastColor = iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF';

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
          d="M10 18V21"
          stroke={iconColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 17.75V21"
          stroke={iconColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 18C9.23312 18 10.4363 17.62 11.4457 16.9117C12.4552 16.2035 13.2219 15.2014 13.6416 14.0419C14.0612 12.8824 14.1134 11.6218 13.7911 10.4315C13.4687 9.24128 12.7874 8.17927 11.84 7.39001"
          fill={iconColor}
        />
        <path
          d="M8 18C9.23312 18 10.4363 17.62 11.4457 16.9117C12.4552 16.2035 13.2219 15.2014 13.6416 14.0419C14.0612 12.8824 14.1134 11.6218 13.7911 10.4315C13.4687 9.24128 12.7874 8.17927 11.84 7.39001L3 19.5L4.5 18L8 18Z"
          stroke={iconColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.4 17.9999H12C14.1217 17.9999 16.1566 17.1571 17.6569 15.6568C19.1571 14.1565 20 12.1217 20 9.99995V6.99995C20.0023 6.14786 19.7323 5.31731 19.2296 4.62934C18.7269 3.94136 18.0175 3.43191 17.205 3.17521C16.3925 2.91851 15.5193 2.92798 14.7125 3.20224C13.9058 3.47651 13.2077 4.00123 12.72 4.69995L2 19.9999"
          fill={iconColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4457 16.9116C10.4363 17.6198 9.23312 17.9998 8 17.9999L4.5 17.9999L3 19.4999L11.84 7.38988C12.7874 8.17913 13.4687 9.24115 13.7911 10.4314C14.1134 11.6216 14.0612 12.8823 13.6416 14.0418C13.2219 15.2013 12.4552 16.2034 11.4457 16.9116Z"
          fill={iconColor}
        />
        <path
          d="M20 7L22 7.5L20 8"
          stroke={iconColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 7H16.01"
          stroke={contrastColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

BirdIcon.displayName = 'BirdIcon';
