import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface EyeIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  show?: boolean;
  active?: boolean;
  disabled?: boolean;
  activeColor?: string;
  disabledColor?: string;
  defaultColor?: string;
}

/**
 * Eye icon component that displays either eye-on or eye-off based on the `show` prop.
 * Used for password visibility toggles.
 */
export const EyeIcon = React.forwardRef<SVGSVGElement, EyeIconProps>(
  (
    {
      size = 20,
      className,
      show = false,
      active = false,
      disabled = false,
      activeColor,
      disabledColor,
      defaultColor,
      ...props
    },
    ref
  ) => {
    // Determine stroke color based on priority: color props > theme colors based on state
    const getStrokeColor = (): string => {
      if (disabled) {
        return disabledColor || theme.icons.disabled;
      }
      if (active) {
        return activeColor || theme.icons.active;
      }
      return defaultColor || theme.icons.default;
    };

    const strokeColor = getStrokeColor();

    // Eye Off (hidden password) - shows eye with slash
    if (!show) {
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 640 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}
          aria-hidden="true"
          focusable="false"
          {...props}
        >
          <path
            d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM208.9 175.1C241 156.2 278.1 144 320 144C385.2 144 438.8 173.6 479.9 211.7C518.4 247.4 545 290 558.5 320C544.9 350 518.3 392.5 479.9 428.3C476.8 431.1 473.7 433.9 470.5 436.7L425.8 392C439.8 371.5 448 346.7 448 320C448 249.3 390.7 192 320 192C293.3 192 268.5 200.2 248 214.2L208.9 175.1zM390.9 357.1L282.9 249.1C294 243.3 306.6 240 320 240C364.2 240 400 275.8 400 320C400 333.4 396.7 346 390.9 357.1zM135.4 237.2L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L384.2 486C364.2 492.4 342.8 496 320 496C254.8 496 201.2 466.4 160.1 428.3C121.6 392.6 95 350 81.5 320C91.9 296.9 110.1 266.4 135.5 237.2z"
            fill={strokeColor}
          />
        </svg>
      );
    }

    // Eye On (visible password) - shows open eye
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
          d="M17.9527 9.20413C18.206 9.55938 18.3327 9.73704 18.3327 9.99996C18.3327 10.2629 18.206 10.4405 17.9527 10.7958C16.8143 12.3921 13.907 15.8333 9.99935 15.8333C6.09167 15.8333 3.18443 12.3921 2.04605 10.7958C1.79269 10.4405 1.66602 10.2629 1.66602 9.99996C1.66602 9.73704 1.79269 9.55938 2.04605 9.20413C3.18443 7.60783 6.09167 4.16663 9.99935 4.16663C13.907 4.16663 16.8143 7.60783 17.9527 9.20413Z"
          stroke={strokeColor}
          strokeWidth="1.67"
        />
        <path
          d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
          stroke={strokeColor}
          strokeWidth="1.67"
        />
      </svg>
    );
  }
);

EyeIcon.displayName = 'EyeIcon';
