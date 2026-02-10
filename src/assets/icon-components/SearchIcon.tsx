import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface SearchIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  fill?: string;
}

export const SearchIcon = React.forwardRef<SVGSVGElement, SearchIconProps>(
  ({ size = 24, className, fill, ...props }, ref) => {
    const strokeColor = fill || theme.colors.text.secondary;

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
          d="M17 17L21 21"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

SearchIcon.displayName = 'SearchIcon';
