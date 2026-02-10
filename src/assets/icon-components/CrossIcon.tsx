import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface CrossIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  fill?: string;
}

export const CrossIcon = React.forwardRef<SVGSVGElement, CrossIconProps>(
  ({ size = 16, className, fill, ...props }, ref) => {
    const strokeColor = fill || theme.colors.text.tertiary;

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
          d="M12 4L4.00054 11.9995M11.9995 12L4 4.00057"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

CrossIcon.displayName = 'CrossIcon';
