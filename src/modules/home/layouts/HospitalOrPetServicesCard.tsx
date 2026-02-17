'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { StarIcon, FavoriteIcon } from '@/assets/icon-components';
import LocationIcon from '@/assets/images/home/location.svg';
import { Chip } from '@/components/shared/Chip';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/apis/auth/authSlice';

export type HospitalOrPetServicesChipVariant = 'warning' | 'alert' | 'normal' | 'success' | 'pink';

export interface HospitalOrPetServicesChip {
  icon?: string;
  label: string;
  variant: HospitalOrPetServicesChipVariant;
}

export interface HospitalOrPetServicesCardProps {
  name: string;
  location?: string;
  rating: number;
  imageSrc?: string;
  favorite?: boolean;
  onFavoriteToggle?: (favorite: boolean) => void;
  className?: string;
  chips: HospitalOrPetServicesChip[];
  price: number;
  hasSessionBooking?: boolean;
  servesInArea?: string;
  type?: string;
  slug?: string;
  isDynamicWidth?: boolean;
  id?: string;
  _id?: string;
}

export const HospitalOrPetServicesCard: React.FC<HospitalOrPetServicesCardProps> = ({
  name,
  location,
  rating,
  imageSrc,
  favorite = false,
  onFavoriteToggle,
  className,
  chips,
  hasSessionBooking,
  price,
  servesInArea,
  type,
  slug = 'hospitals',
  isDynamicWidth = false,
  id,
  _id,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log('PASSWORD😶😶😶😶😶😶 ~ isAuthenticated:', isAuthenticated);
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };
  return (
    <Link href={`/services/${slug}/${_id ?? id}`}>
      <article
        id={id}
        className={cn(
          'flex flex-col gap-3 rounded-2xl bg-transparent',
          isDynamicWidth ? 'min-w-50.75 shrink-0 grow' : 'w-50.75',
          'relative',
          className
        )}
      >
        {/* Favorite button - top right */}
        {isAuthenticated && (
          <Button
            variant="ghost"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-10 h-8 w-8 overflow-hidden rounded-lg bg-(--bg-glass) p-1.5"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            type="button"
            data-no-progress
          >
            <FavoriteIcon favorite={favorite} size={20} />
          </Button>
        )}

        {/* Hospital image/logo */}
        {imageSrc ? (
          <div className="relative h-51 w-full overflow-hidden rounded-2xl">
            <Image src={imageSrc} alt={name} fill className="object-cover" />
            <div className="absolute right-0 bottom-0 left-0 flex flex-wrap gap-2 p-2">
              {chips.map((chip) => (
                <Chip key={chip.label} variant={chip.variant} size="sm">
                  {chip.label}
                </Chip>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-51 w-full overflow-hidden rounded-2xl bg-gray-200">
            <p className="absolute inset-0 flex items-center justify-center text-gray-500">
              No Image Available
            </p>
          </div>
        )}
        <div className="flex flex-col gap-1">
          {/* Hospital name */}
          <h3 className="text-sm font-semibold">{name}</h3>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5">
              <Image src={LocationIcon} alt="Location" width={16} height={16} />
              <span className="line-clamp-1 text-xs" style={{ color: theme.colors.text.secondary }}>
                {location}
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: theme.colors.text.secondary }}>
              {type ? type : `Starting From`}
            </p>
            <div className="flex items-center gap-1.5">
              <StarIcon size={16} fill={theme.colors.special.verifiedBadge} />
              <span className="text-xs font-semibold">{rating}</span>
            </div>
          </div>
          {servesInArea && (
            <p className="text-xs" style={{ color: theme.colors.text.secondary }}>
              {servesInArea}
            </p>
          )}
          <p className="font-semibold">
            ${price}
            {hasSessionBooking && (
              <span className="text-xs font-normal" style={{ color: theme.colors.text.tertiary }}>
                /session
              </span>
            )}
          </p>
        </div>
      </article>
    </Link>
  );
};
