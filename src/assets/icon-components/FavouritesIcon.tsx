import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface FavouritesIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
  fill?: string;
}

export const FavouritesIcon = React.forwardRef<SVGSVGElement, FavouritesIconProps>(
  ({ size = 20, className, fill, ...props }, ref) => {
    const fillColor = fill || theme.icons.default;

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
          d="M16.1827 13.0501C17.6586 11.3533 18.9587 9.29413 18.9587 7.24524C18.9586 4.54331 16.9573 2.29163 14.167 2.29163C12.8405 2.29163 11.5555 2.71886 10.0003 4.13733C8.44516 2.71886 7.16019 2.29163 5.83366 2.29163C3.04329 2.29163 1.04203 4.54331 1.04199 7.24524C1.04199 9.29413 2.34208 11.3533 3.81787 13.0501C5.31661 14.7732 7.10791 16.2474 8.30192 17.1403L8.49557 17.2737C9.48466 17.895 10.7491 17.8503 11.6987 17.1403L12.1732 16.779C13.3363 15.875 14.8714 14.5578 16.1827 13.0501Z"
          fill={fillColor}
        />
      </svg>
    );
  }
);

FavouritesIcon.displayName = 'FavouritesIcon';
