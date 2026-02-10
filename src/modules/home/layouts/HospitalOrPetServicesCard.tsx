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
}) => {
  const handleFavoriteClick = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };

  return (
    <Link href={`/services/${slug}/${name}`}>
      <article
        className={cn(
          'bg-transparent rounded-[16px] flex flex-col gap-3',
          isDynamicWidth ? 'min-w-[203px] grow shrink-0' : 'w-[203px]',
          'relative',
          className
        )}
      >
        {/* Favorite button - top right */}
        <Button
          variant="ghost"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 h-8 w-8 z-10 bg-(--bg-glass) overflow-hidden rounded-[8px] p-1.5"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FavoriteIcon favorite={favorite} size={20} />
        </Button>

        {/* Hospital image/logo */}
        {imageSrc && (
          <div className="w-full h-51 rounded-[16px] overflow-hidden relative">
            <Image src={imageSrc} alt={name} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 gap-2 flex flex-wrap p-2">
              {chips.map((chip) => (
                <Chip key={chip.label} variant={chip.variant} size="sm">
                  {chip.label}
                </Chip>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          {/* Hospital name */}
          <h3 className="font-semibold text-sm">{name}</h3>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5">
              <Image src={LocationIcon} alt="Location" width={16} height={16} />
              <span className="text-xs line-clamp-1" style={{ color: theme.colors.text.secondary }}>
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
              <span className="font-semibold text-xs">{rating}</span>
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
