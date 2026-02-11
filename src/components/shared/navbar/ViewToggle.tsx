import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { ListViewIcon, MapViewIcon } from '@/assets/icon-components';
import { ViewType } from './types';

interface ViewToggleProps {
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewToggle({ viewType, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-[12px] p-1"
      style={{ backgroundColor: theme.colors.background.tertiary }}
    >
      <button
        className={cn(
          'cursor-pointer rounded-[8px] p-2 transition-opacity hover:opacity-70',
          viewType === 'list' && 'bg-white opacity-100',
          viewType === 'map' && 'bg-transparent opacity-50'
        )}
        onClick={() => onViewChange('list')}
        aria-label="List view"
      >
        <ListViewIcon
          size={20}
          fill={viewType === 'list' ? theme.icons.default : theme.icons.disabled}
        />
      </button>
      <button
        className={cn(
          'cursor-pointer rounded-[8px] p-2 transition-opacity hover:opacity-70',
          viewType === 'map' && 'bg-white opacity-100',
          viewType === 'list' && 'bg-transparent opacity-50'
        )}
        onClick={() => onViewChange('map')}
        aria-label="Map view"
      >
        <MapViewIcon
          size={20}
          fill={viewType === 'map' ? theme.icons.default : theme.icons.disabled}
        />
      </button>
    </div>
  );
}
