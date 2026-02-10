import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export interface FavoriteIconProps extends React.SVGProps<SVGSVGElement> {
  favorite?: boolean;
  size?: number;
  color?: string;
  onClick?: () => void;
}

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  favorite = false,
  size,
  className,
  color,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  if (favorite) {
    // Filled heart - favorite:true
    const width = size ?? 22;
    const height = size ? (size * 20) / 22 : 20;
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(onClick && 'cursor-pointer', className)}
        onClick={handleClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        {...props}
      >
        <path
          d="M14.7949 1.45703C18.0919 1.45703 20.4215 4.12931 20.4219 7.24512V7.24609C20.4217 9.61585 18.9397 11.8749 17.4404 13.5986C16.0808 15.1618 14.5004 16.516 13.3135 17.4385L13.3066 17.4434L12.833 17.8047L12.8271 17.8096L12.3271 17.1406L12.8262 17.8096C11.5994 18.7265 9.96016 18.7856 8.67969 17.9814L8.66406 17.9717L8.64941 17.9619L8.45605 17.8281L8.44238 17.8193L8.42969 17.8096C7.21115 16.8983 5.36822 15.3839 3.81543 13.5986C2.31624 11.8749 0.835163 9.61582 0.834961 7.24609V7.24512C0.835247 4.12929 3.16487 1.45703 6.46191 1.45703C7.84944 1.4571 9.17015 1.87163 10.6279 3.03906C12.086 1.8713 13.4072 1.45703 14.7949 1.45703Z"
          fill={color ?? theme.colors.error}
          stroke="white"
          strokeWidth="1.67"
        />
      </svg>
    );
  }

  // Unfilled heart - favorite:false
  const width = size ?? 20;
  const height = size ?? 20;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(onClick && 'cursor-pointer', className)}
      onClick={handleClick}
      aria-label="Add to favorites"
      {...props}
    >
      <path
        d="M14.167 3.12671C16.4505 3.12671 18.124 4.95799 18.124 7.24585C18.1238 8.97354 17.0049 10.8331 15.5527 12.5027C14.2921 13.952 12.8055 15.2297 11.667 16.115L11.1992 16.4714C10.5301 16.9717 9.64613 17.0044 8.9502 16.573L8.7959 16.4666C7.62658 15.5916 5.89024 14.1604 4.44824 12.5027C2.9961 10.833 1.87716 8.97355 1.87695 7.24585C1.87699 4.95801 3.55046 3.12671 5.83398 3.12671C6.92302 3.12677 8.01327 3.4556 9.4375 4.75464L10 5.26733L10.5635 4.75464C11.9878 3.45556 13.0779 3.12671 14.167 3.12671Z"
        stroke={color ?? theme.colors.border.default}
        strokeWidth="1.67"
      />
    </svg>
  );
};

FavoriteIcon.displayName = 'FavoriteIcon';
