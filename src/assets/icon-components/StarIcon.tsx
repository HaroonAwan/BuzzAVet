import * as React from 'react';
import { theme } from '@/lib/theme';

export interface StarIconProps {
  size?: number;
  fill?: string;
  className?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({
  size = 18,
  fill = theme.colors.special.verifiedBadge,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.231 0.795331C7.77675 -0.26511 9.30658 -0.26511 9.85233 0.795331L11.6911 4.36861C11.7216 4.4279 11.7789 4.46916 11.8452 4.47963L15.8422 5.11004C17.0277 5.29702 17.5001 6.73566 16.6523 7.5775L13.791 10.4187C13.7436 10.4658 13.7217 10.5324 13.7322 10.5981L14.3629 14.5635C14.5498 15.7387 13.3124 16.6282 12.2421 16.0882L8.63708 14.2695C8.57717 14.2392 8.50617 14.2392 8.44625 14.2695L4.84127 16.0882C3.77087 16.6282 2.53353 15.7387 2.72044 14.5635L3.35112 10.5981C3.36156 10.5324 3.33972 10.4658 3.29232 10.4187L0.430982 7.5775C-0.416726 6.73566 0.0556737 5.29702 1.24117 5.11004L5.23806 4.47963C5.30442 4.46916 5.36172 4.4279 5.39224 4.36861L7.231 0.795331Z"
        fill={fill}
      />
    </svg>
  );
};
