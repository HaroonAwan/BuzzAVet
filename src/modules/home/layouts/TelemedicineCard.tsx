'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { StarIcon, FavoriteIcon } from '@/assets/icon-components';
import { Button } from '@/components/shared/Button';

export interface TelemedicineCardProps {
  name: string;
  specialization: string;
  clinicName: string;
  nextAvailable: string;
  rating: number;
  fee: number;
  imageSrc: string;
  favorite?: boolean;
  onFavoriteToggle?: (favorite: boolean) => void;
  className?: string;
}

export const TelemedicineCard: React.FC<TelemedicineCardProps> = ({
  name,
  specialization,
  clinicName,
  nextAvailable,
  rating,
  fee,
  imageSrc,
  favorite = false,
  onFavoriteToggle,
  className,
}) => {
  const router = useRouter();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };

  const handleCardClick = () => {
    router.push(`/telemedicine/${name}`);
  };

  return (
    <article
      className={cn(
        'bg-white min-w-45 rounded-2xl flex flex-col gap-3',
        'relative cursor-pointer',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Favorite button - top right */}
      {onFavoriteToggle && (
        <Button
          variant="ghost"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 h-8 w-8 z-10 bg-(--bg-glass) overflow-hidden rounded-lg p-1.5"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FavoriteIcon favorite={favorite} size={20} />
        </Button>
      )}

      {/* Doctor profile picture */}
      {imageSrc && (
        <div className="w-full h-51 rounded-2xl overflow-hidden relative">
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        </div>
      )}

      <div className="flex flex-col gap-1">
        {/* Doctor name */}
        <h3 className="font-semibold text-sm">{name}</h3>

        {/* Specialization */}
        <p className="text-xs font-medium">{specialization}</p>

        {/* Clinic name */}
        <p className="text-xs" style={{ color: theme.colors.text.tertiary }}>
          {clinicName}
        </p>

        {/* Next available appointment and rating */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs" style={{ color: theme.colors.text.success }}>
            Next: {nextAvailable}
          </p>
          <div className="flex items-center gap-1.5">
            <StarIcon size={16} fill={theme.colors.special.verifiedBadge} />
            <span className="font-semibold text-xs">{rating}</span>
          </div>
        </div>

        {/* Consultation fee */}
        <p className="font-semibold text-sm">${fee}</p>
      </div>
    </article>
  );
};
