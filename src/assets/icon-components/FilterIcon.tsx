import React from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface FilterIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  active?: boolean;
  disabled?: boolean;
  activeColor?: string;
  disabledColor?: string;
  defaultColor?: string;
}

export const FilterIcon = React.forwardRef<SVGSVGElement, FilterIconProps>(
  (
    {
      size = 20,
      className,
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
          d="M10.8333 3.33331H2.5"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.16667 15.8333H2.5"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5003 15.833H14.167"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5003 9.58301H9.16699"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.4997 3.33301H15.833"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.16667 9.58331H2.5"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.083 1.66699C12.4713 1.66699 12.6654 1.66699 12.8186 1.73043C13.0228 1.815 13.185 1.97723 13.2696 2.18143C13.333 2.33457 13.333 2.52871 13.333 2.91699V3.75033C13.333 4.13861 13.333 4.33275 13.2696 4.48589C13.185 4.69008 13.0228 4.85232 12.8186 4.93689C12.6654 5.00033 12.4713 5.00033 12.083 5.00033C11.6948 5.00033 11.5006 5.00033 11.3474 4.93689C11.1433 4.85232 10.981 4.69008 10.8964 4.48589C10.833 4.33275 10.833 4.13861 10.833 3.75033V2.91699C10.833 2.52871 10.833 2.33457 10.8964 2.18143C10.981 1.97723 11.1433 1.815 11.3474 1.73043C11.5006 1.66699 11.6948 1.66699 12.083 1.66699Z"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.417 14.167C10.8052 14.167 10.9994 14.167 11.1526 14.2304C11.3567 14.315 11.519 14.4772 11.6036 14.6814C11.667 14.8346 11.667 15.0287 11.667 15.417V16.2503C11.667 16.6386 11.667 16.8327 11.6036 16.9859C11.519 17.1901 11.3567 17.3523 11.1526 17.4369C10.9994 17.5003 10.8052 17.5003 10.417 17.5003C10.0287 17.5003 9.83458 17.5003 9.68141 17.4369C9.47724 17.3523 9.31499 17.1901 9.23041 16.9859C9.16699 16.8327 9.16699 16.6386 9.16699 16.2503V15.417C9.16699 15.0287 9.16699 14.8346 9.23041 14.6814C9.31499 14.4772 9.47724 14.315 9.68141 14.2304C9.83458 14.167 10.0287 14.167 10.417 14.167Z"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.91699 7.91699C8.30528 7.91699 8.49941 7.91699 8.65258 7.98043C8.85674 8.065 9.01899 8.22723 9.10358 8.43141C9.16699 8.58458 9.16699 8.77874 9.16699 9.16699V10.0003C9.16699 10.3886 9.16699 10.5827 9.10358 10.7359C9.01899 10.9401 8.85674 11.1023 8.65258 11.1869C8.49941 11.2503 8.30528 11.2503 7.91699 11.2503C7.52871 11.2503 7.33457 11.2503 7.18143 11.1869C6.97723 11.1023 6.815 10.9401 6.73043 10.7359C6.66699 10.5827 6.66699 10.3886 6.66699 10.0003V9.16699C6.66699 8.77874 6.66699 8.58458 6.73043 8.43141C6.815 8.22723 6.97723 8.065 7.18143 7.98043C7.33457 7.91699 7.52871 7.91699 7.91699 7.91699Z"
          stroke={strokeColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

FilterIcon.displayName = 'FilterIcon';
