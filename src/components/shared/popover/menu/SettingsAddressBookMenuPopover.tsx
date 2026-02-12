'use client';

import * as React from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverLayout } from '../PopoverLayout';
import { cn } from '@/lib/utils';
import { Button } from '../../Button';
import Image from 'next/image';
import { StarIcon } from '@/assets/icon-components';
import EditIcon from '@/assets/images/settings/edit.svg';
import TrashIcon from '@/assets/images/settings/trash.svg';

export interface SettingsAddressBookMenuPopoverProps {
  trigger: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEdit?: () => void;
  onSetAsDefault?: () => void;
  onDelete?: () => void;
}

/**
 * Complete notifications menu popover component for Settings Address Book.
 * Includes Popover wrapper, trigger binding, and all UI.
 *
 * Usage:
 * ```tsx
 * <SettingsAddressBookMenuPopover
 *   trigger={<Button>Bell</Button>}
 *   onEdit={() => console.log('edit')}
 *   onSetAsDefault={() => console.log('set as default')}
 *   onDelete={() => console.log('delete')}
 * />
 * ```
 */
export function SettingsAddressBookMenuPopover({
  trigger,
  isOpen,
  onOpenChange,
  onEdit,
  onSetAsDefault,
  onDelete,
}: SettingsAddressBookMenuPopoverProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverLayout align="end" side="bottom" className="min-w-46">
        <div className={cn('p-2 text-center')}>
          <Button
            variant="ghost"
            className="flex w-full justify-start px-3 py-1.5 text-sm"
            icon={<Image src={EditIcon} alt="Edit" width={16} height={16} />}
            iconPlacement="start"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="flex w-full justify-start px-3 py-1.5 text-sm"
            icon={<StarIcon size={15} fill="#020409" />}
            iconPlacement="start"
            onClick={onSetAsDefault}
          >
            Set as default
          </Button>
          <Button
            variant="ghost"
            className="flex w-full justify-start px-3 py-1.5 text-sm text-(--theme-error)"
            icon={<Image src={TrashIcon} alt="Delete" width={16} height={16} />}
            iconPlacement="start"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </PopoverLayout>
    </Popover>
  );
}
