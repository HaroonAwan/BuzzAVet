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
        'bg-white rounded-[16px] p-5 flex justify-between gap-6 w-[540px] shrink-0',
        'border',
        className
      )}
    >
      <div className="flex flex-col gap-2 max-w-[355px]">
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
              <span className="font-semibold text-sm pr-4 border-r">{petName}</span>
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.text.tertiary }}
              >
                Vet:
                <span
                  className="font-semibold text-sm h-6 w-6 flex items-center justify-center rounded-[6px]"
                  style={{
                    backgroundColor: theme.colors.background.lime,
                    color: theme.colors.text.default,
                  }}
                >
                  {vetRank}
                </span>
              </span>
              <Link href={`/telemedicine/${vetName}`}>
                <span className="font-semibold text-sm">{vetName}</span>
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
