'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Chip } from '@/components/shared/Chip';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import MobileVetIcon from '@assets/images/home/vetMobile.svg';
import VideoVetIcon from '@assets/images/home/videoVetIcon.svg';
import HospitalVetIcon from '@assets/images/home/hospital.svg';
import ArrowRightIcon from '@assets/images/home/right.svg';
import NotesIcon from '@assets/images/home/notes.svg';
import GalleryIcon from '@assets/images/home/gallery.svg';
import VideoIcon from '@assets/images/home/video.svg';
import AddNotes from '@/components/shared/dialogs/home/AddNotes';
export type AppointmentChipVariant = 'warning' | 'alert' | 'normal' | 'success' | 'pink';

export interface AppointmentChip {
  icon?: string;
  label: string;
  variant: AppointmentChipVariant;
}

export interface PetCardProps {
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
  petId?: string;
  /** Optional click handler for "View Details" */
  onViewDetails?: () => void;
  className?: string;
  type?: 'tele' | 'hospital' | 'video';
}

export const PetCard: React.FC<PetCardProps> = ({
  chips,
  dateTimeLabel,
  petName,
  vetName,
  avatarSrc,
  className,
  vetRank,
  petId,
  type,
}) => {
  const [openViewNotes, setOpenViewNotes] = useState(false);
  const [openViewGallery, setOpenViewGallery] = useState(false);
  const [openViewVideo, setOpenViewVideo] = useState(false);

  const handleToggleViewDialogs = (dialogType: 'notes' | 'gallery' | 'video') => {
    if (dialogType === 'notes') {
      setOpenViewNotes((prev) => !prev);
    } else if (dialogType === 'gallery') {
      setOpenViewGallery((prev) => !prev);
    } else if (dialogType === 'video') {
      setOpenViewVideo((prev) => !prev);
    }
  };
  return (
    <>
      {' '}
      <article
        className={cn('flex shrink-0 justify-between gap-6 rounded-2xl bg-white p-4', className)}
      >
        <div className="flex w-full gap-4">
          {/* Pet Details col */}
          <div className="flex flex-col gap-2">
            <Avatar name={petName} url={avatarSrc} className="h-20.5 w-20.5" />
            <Link
              href={`/pets/${petId}`}
              className="line-clamp-2 max-w-20.5 text-center text-sm leading-none font-semibold text-ellipsis"
            >
              {petName}
            </Link>
          </div>
          <div className="flex w-full flex-col gap-2">
            {/* pet upcoming events */}
            <div
              className="flex flex-col gap-2 rounded-lg p-3"
              style={{ backgroundColor: theme.colors.background.secondary }}
            >
              {/* APPOINTMENT */}
              <div className="flex min-w-82.5 items-center justify-between gap-2">
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Appointment:
                </span>
                <Link
                  href={`/appointments/${petId}`}
                  className="[&>div]:transition-transform [&>div]:duration-300 [&>div]:ease-in-out hover:[&>div]:translate-x-1"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {dateTimeLabel}
                    {type && (
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{
                          backgroundColor:
                            type === 'tele'
                              ? theme.colors.chip.pink.background
                              : type === 'hospital'
                                ? theme.colors.chip.normal.background
                                : type === 'video'
                                  ? theme.colors.chip.alert.background
                                  : 'transparent',
                        }}
                      >
                        <Image
                          src={
                            type === 'tele'
                              ? MobileVetIcon
                              : type === 'hospital'
                                ? HospitalVetIcon
                                : type === 'video'
                                  ? VideoVetIcon
                                  : null
                          }
                          alt="Visit Type Icon"
                          className="h-4 w-4"
                        />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-0"
                      icon={<Image src={ArrowRightIcon} alt="View Details" />}
                      iconPlacement="center"
                    />
                  </div>
                </Link>
              </div>
              {/* VACCINATION */}
              <div className="flex min-w-82.5 items-center justify-between gap-2">
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Vaccine:
                </span>
                <Link
                  href={`/appointments/${petId}`}
                  className="[&>div]:transition-transform [&>div]:duration-300 [&>div]:ease-in-out hover:[&>div]:translate-x-1"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span style={{ color: 'var(--theme-error' }}>{dateTimeLabel}</span>
                    <Chip variant="warning">Due Soon</Chip>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-0"
                      icon={<Image src={ArrowRightIcon} alt="View Details" />}
                      iconPlacement="center"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="self-end px-3 py-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0"
                  icon={<Image src={NotesIcon} alt="Add/view notes" />}
                  iconPlacement="center"
                  onClick={() => handleToggleViewDialogs('notes')}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0"
                  icon={<Image src={GalleryIcon} alt="View/add images" />}
                  iconPlacement="center"
                  onClick={() => handleToggleViewDialogs('gallery')}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0"
                  icon={<Image src={VideoIcon} alt="View/add videos" />}
                  iconPlacement="center"
                  onClick={() => handleToggleViewDialogs('video')}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
      {openViewNotes && (
        <AddNotes isOpen={openViewNotes} onOpenChange={setOpenViewNotes} id={petId} />
      )}
    </>
  );
};
