'use client';

import React from 'react';
import Image from 'next/image';
import { Chip } from '@/components/shared/Chip';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

export type AppointmentChipVariant = 'warning' | 'alert' | 'normal' | 'success' | 'pink';

export interface AppointmentChip {
  icon?: string;
  label: string;
  variant: AppointmentChipVariant;
}

export interface AppointmentCardProps {
  /** Top chips row, e.g. visit type and status */
  chips: AppointmentChip[];
  /** Display date label, e.g. "Today, 2:30 PM" or "26 Dec, 2:30 PM" */
  dateTimeLabel: string;
  /** Pet name, e.g. "Bella" */
  petName: string;
  /** Vet rank, e.g. "S" */
  vetRank: string;
  /** Vet name, e.g. "Dr. Sarah Wilson" */
  vetName: string;
  /** Optional avatar image src for pet */
  avatarSrc?: string;
  /** Optional appointment ID for navigation */
  appointmentId?: string;
  /** Optional click handler for "View Details" */
  onViewDetails?: () => void;
  className?: string;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  chips,
  dateTimeLabel,
  petName,
  vetName,
  avatarSrc,
  onViewDetails,
  className,
  vetRank,
  appointmentId,
}) => {
  return (
    <article
      className={cn(
        'flex w-135 shrink-0 justify-between gap-6 rounded-2xl bg-white p-5',
        'border',
        className
      )}
    >
      <div className="flex max-w-88.75 flex-col gap-2">
        {/* Top chips row */}
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <Chip key={chip.label} variant={chip.variant} size="sm">
              {chip.icon && (
                <Image src={chip.icon} alt={chip.label} width={16} height={16} className="mr-2" />
              )}
              {chip.label}
            </Chip>
          ))}
        </div>

        {/* Main info row */}
        <div className="flex gap-4">
          <Avatar name={petName} url={avatarSrc} size="xl" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{dateTimeLabel}</p>
            <div className="flex items-center gap-4">
              <span className="border-r pr-4 text-sm font-semibold">{petName}</span>
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.text.tertiary }}
              >
                Vet:
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-md text-sm font-semibold"
                  style={{
                    backgroundColor: theme.colors.background.lime,
                    color: theme.colors.text.default,
                  }}
                >
                  {vetRank}
                </span>
              </span>
              <Link href={`/telemedicine/${vetName}`}>
                <span className="text-sm font-semibold">{vetName}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: avatar + pet / vet */}
      </div>
      {appointmentId ? (
        <Link href={`/appointments/${appointmentId}`}>
          <Button variant="underline">View Details</Button>
        </Link>
      ) : (
        <Button variant="underline" onClick={onViewDetails}>
          View Details
        </Button>
      )}
    </article>
  );
};
