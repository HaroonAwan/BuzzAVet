import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface ListViewIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  fill?: string;
}

export const ListViewIcon = React.forwardRef<SVGSVGElement, ListViewIconProps>(
  ({ size = 20, className, fill, ...props }, ref) => {
    const strokeColor = fill || theme.icons.default;

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
        <path d="M7.5 4.16663H17.5" stroke={strokeColor} strokeWidth="1.67" strokeLinecap="round" />
        <path
          d="M2.5 4.16663H4.16667"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
        />
        <path d="M7.5 10H17.5" stroke={strokeColor} strokeWidth="1.67" strokeLinecap="round" />
        <path d="M2.5 10H4.16667" stroke={strokeColor} strokeWidth="1.67" strokeLinecap="round" />
        <path d="M7.5 15.8334H17.5" stroke={strokeColor} strokeWidth="1.67" strokeLinecap="round" />
        <path
          d="M2.5 15.8334H4.16667"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

ListViewIcon.displayName = 'ListViewIcon';
