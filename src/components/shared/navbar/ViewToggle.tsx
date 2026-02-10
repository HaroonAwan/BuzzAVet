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
      className="flex items-center gap-1 p-1 rounded-[12px]"
      style={{ backgroundColor: theme.colors.background.tertiary }}
    >
      <button
        className={cn(
          'p-2 hover:opacity-70 transition-opacity cursor-pointer rounded-[8px]',
          viewType === 'list' && 'opacity-100 bg-white',
          viewType === 'map' && 'opacity-50 bg-transparent'
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
          'p-2 hover:opacity-70 transition-opacity cursor-pointer rounded-[8px]',
          viewType === 'map' && 'opacity-100 bg-white',
          viewType === 'list' && 'opacity-50 bg-transparent'
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
