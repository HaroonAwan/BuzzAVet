import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface MapViewIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  fill?: string;
}

export const MapViewIcon = React.forwardRef<SVGSVGElement, MapViewIconProps>(
  ({ size = 20, className, fill, ...props }, ref) => {
    const strokeColor = fill || theme.colors.text.tertiary;

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
          d="M4.3782 3.49653L3.35498 4.09011C2.53148 4.56781 2.11973 4.80667 1.89336 5.20403C1.66699 5.60138 1.66699 6.08528 1.66699 7.05307V13.8569C1.66699 15.1285 1.66699 15.7643 1.95221 16.1182C2.142 16.3537 2.40796 16.5119 2.70199 16.5644C3.14388 16.6433 3.68489 16.3294 4.76688 15.7018C5.50163 15.2755 6.20875 14.8328 7.08772 14.9529C7.48754 15.0075 7.86892 15.1972 8.63166 15.5764L11.8099 17.1567C12.4973 17.4985 12.5037 17.5 13.2682 17.5H15.0003C16.5717 17.5 17.3573 17.5 17.8455 17.0011C18.3337 16.5022 18.3337 15.6991 18.3337 14.0931V8.47625C18.3337 6.87019 18.3337 6.06717 17.8455 5.56823C17.3573 5.0693 16.5717 5.0693 15.0003 5.0693H13.2682C12.5037 5.0693 12.4973 5.06783 11.8099 4.726L9.03358 3.34553C7.87436 2.76914 7.29476 2.48095 6.67731 2.50098C6.05985 2.52101 5.4993 2.84618 4.3782 3.49653Z"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 2.5V14.5833"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 5.41663V17.0833"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

MapViewIcon.displayName = 'MapViewIcon';
