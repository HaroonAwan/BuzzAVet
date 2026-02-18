'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { StarIcon, FavoriteIcon } from '@/assets/icon-components';
import { Button } from '@/components/shared/Button';
import { selectIsAuthenticated } from '@/apis/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

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
  slug?: string;
  id?: string;
  pathname?: string;
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
  slug: baseSlug = 'telemedicine',
  className,
  id,
  pathname,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };

  const slug = pathname?.includes('/mobile-vets') ? 'mobile-vets' : baseSlug;

  return (
    <Link href={`services/${slug}/${id ?? name}`}>
      <article
        className={cn(
          'flex min-w-45 flex-col gap-3 rounded-2xl',
          'relative cursor-pointer',
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
          >
            <FavoriteIcon favorite={favorite} size={20} />
          </Button>
        )}

        {/* Doctor profile picture */}

        {imageSrc ? (
          <div className="relative h-51 w-full overflow-hidden rounded-2xl">
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative h-51 w-full overflow-hidden rounded-2xl bg-gray-200">
            <p className="absolute inset-0 flex items-center justify-center text-gray-500">
              No Image Available
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          {/* Doctor name */}
          <h3 className="text-sm font-semibold">{name}</h3>

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
              <span className="text-xs font-semibold">{rating}</span>
            </div>
          </div>

          {/* Consultation fee */}
          <p className="text-sm font-semibold">${fee}</p>
        </div>
      </article>
    </Link>
  );
};
