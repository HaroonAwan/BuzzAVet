import React from 'react';
import { cn } from '@/lib/utils';

export interface OthersIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  iconColor?: string;
}

export const OthersIcon = React.forwardRef<SVGSVGElement, OthersIconProps>(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.6826 2.51659C16.0042 2.73443 16.2796 3.01209 16.4943 3.33347C16.9692 3.18058 17.7867 3.00173 19.256 3.01079C19.7058 3.04913 20.1411 3.18846 20.5295 3.4184C20.9179 3.64834 21.2494 3.96295 21.4993 4.33881C21.7492 4.71466 21.9111 5.14207 21.9729 5.58919C22.0347 6.0363 21.9949 6.4916 21.8563 6.92116C21.7177 7.35072 21.4839 7.74347 21.1724 8.07014C20.861 8.39682 20.4798 8.649 20.0573 8.8079L21.8723 11.3949C21.9774 11.6331 22.0187 11.8946 21.9921 12.1537C21.9655 12.4127 21.8719 12.6603 21.7205 12.8722C21.5692 13.0841 21.3653 13.2529 21.1289 13.3621C20.8925 13.4713 20.6318 13.5171 20.3723 13.4949L17.5003 13.0419C17.0666 12.9686 16.6221 12.9915 16.1983 13.109C15.7744 13.2266 15.3816 13.4359 15.0477 13.7221C14.7137 14.0084 14.4468 14.3646 14.2658 14.7654C14.0848 15.1663 13.9942 15.6021 14.0003 16.0419L13.5 18L8.00003 17.9999C6.94176 18 5.92661 17.5806 5.17689 16.8337C4.42718 16.0868 4.004 15.0732 4.00003 14.0149C3.99708 13.0264 4.20354 12.0485 4.60581 11.1455C5.00807 10.2425 5.59703 9.43501 6.3339 8.77608C7.07078 8.11714 7.93886 7.62175 8.881 7.32251C9.82315 7.02327 10.818 6.92697 11.8 7.03995C11.4682 6.68206 11.2288 6.24862 11.1024 5.77724C10.976 5.30586 10.9665 4.81077 11.0748 4.3349C11.1831 3.85903 11.4058 3.41675 11.7236 3.04643C12.0415 2.67611 12.4449 2.38893 12.8989 2.20979C13.3528 2.03065 13.8436 1.96496 14.3287 2.01842C14.8138 2.07189 15.2785 2.24289 15.6826 2.51659Z"
          fill={iconColor}
        />
        <path
          d="M13 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20C2 19.4696 2.21071 18.9609 2.58579 18.5858C2.96086 18.2107 3.46957 18 4 18H16"
          stroke={iconColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.2352 18C13.6193 17.5706 13.8716 17.0398 13.9621 16.4708C14.0525 15.9018 13.9772 15.3189 13.7452 14.7916C13.5132 14.2643 13.1343 13.8149 12.6537 13.4972C12.1731 13.1795 11.6112 13.0069 11.0352 13"
          stroke={iconColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9H16.01"
          stroke={contrastColor}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0011 4.98795C16.9991 4.49993 17.5 3.5 16 2"
          stroke={contrastColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

OthersIcon.displayName = 'OthersIcon';
