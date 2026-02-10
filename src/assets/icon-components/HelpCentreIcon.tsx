import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface HelpCentreIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number;
  fill?: string;
}

export const HelpCentreIcon = React.forwardRef<SVGSVGElement, HelpCentreIconProps>(
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
          d="M10.0003 1.04163C14.9479 1.04163 18.9587 5.05241 18.9587 9.99996C18.9587 14.9475 14.9479 18.9583 10.0003 18.9583C5.05278 18.9583 1.04199 14.9475 1.04199 9.99996C1.04199 5.05241 5.05278 1.04163 10.0003 1.04163ZM10.0003 13.3333C9.54008 13.3333 9.16699 13.7064 9.16699 14.1666C9.16699 14.6269 9.54008 15 10.0003 15H10.0077L10.0931 14.9959C10.5132 14.9532 10.841 14.598 10.841 14.1666C10.841 13.7352 10.5132 13.38 10.0931 13.3374L10.0077 13.3333H10.0003ZM10.0003 4.99996C8.38949 4.99996 7.08366 6.30579 7.08366 7.91663C7.08366 8.37688 7.45676 8.74996 7.91699 8.74996C8.37724 8.74996 8.75033 8.37688 8.75033 7.91663C8.75033 7.22628 9.30999 6.66663 10.0003 6.66663C10.6907 6.66663 11.2503 7.22628 11.2503 7.91663C11.2503 8.29096 11.0865 8.62738 10.8239 8.85738L10.7059 8.94854C10.3977 9.15971 10.0299 9.44229 9.73424 9.79813C9.43533 10.158 9.16699 10.6461 9.16699 11.25C9.16699 11.7102 9.54008 12.0833 10.0003 12.0833C10.4606 12.0833 10.8337 11.7102 10.8337 11.25C10.8337 11.1635 10.8692 11.0402 11.016 10.8634C11.1661 10.6827 11.3863 10.5029 11.6475 10.3239L11.7882 10.2213C12.4737 9.68888 12.917 8.85454 12.917 7.91663C12.917 6.30579 11.6112 4.99996 10.0003 4.99996Z"
          fill={fillColor}
        />
      </svg>
    );
  }
);

HelpCentreIcon.displayName = 'HelpCentreIcon';
