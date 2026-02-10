import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { Button } from '../Button';
import { CrossIcon } from '@/assets/icon-components';
import LocationIcon from '@/assets/images/home/location.svg';
import NearbyIcon from '@/assets/images/home/nearby.svg';
import ClockIcon from '@/assets/images/home/clock.svg';
import HospitalImage from '@/assets/images/auth/hospital.png';
import { RecentSearch } from './types';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onClick: () => void;
  onSelect: (location: string) => void;
  onClear: () => void;
  onNearbyClick: () => void;
  showDropdown: boolean;
  recentSearches: RecentSearch[];
  onClearRecentSearches: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  isExpanded?: boolean;
  isRightActive?: boolean;
}

export function LocationInput({
  value,
  onChange,
  onFocus,
  onClick,
  onSelect,
  onClear,
  onNearbyClick,
  showDropdown,
  recentSearches,
  onClearRecentSearches,
  inputRef,
  dropdownRef,
  isExpanded = false,
  isRightActive = false,
}: LocationInputProps) {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showDropdown && isExpanded && containerRef.current) {
      const updatePosition = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setDropdownPosition({
            top: rect.bottom + 8,
            left: rect.left,
            width: rect.width,
          });
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [showDropdown, isExpanded]);

  const dropdownContent = showDropdown && isExpanded && (
    <div
      ref={dropdownRef}
      className="fixed p-2 bg-white rounded-[12px] SHADOW z-100 overflow-hidden"
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
      }}
    >
      <div
        onClick={onNearbyClick}
        className="w-full flex items-center gap-4 p-3 text-left"
        style={{
          color: theme.colors.text.default,
        }}
      >
        <div
          className="rounded-[10px] w-10 h-10 flex items-center justify-center"
          aria-hidden="true"
          style={{
            backgroundColor: theme.colors.chip.normal.background,
          }}
        >
          <Image
            src={NearbyIcon}
            alt="Nearby Icon"
            width={15}
            height={15}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-center font-medium text-sm">
          <span>Nearby</span>
          <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
            Find what's around you
          </span>
        </div>
      </div>

      {recentSearches.length > 0 && (
        <div style={{ borderColor: theme.colors.border.default }}>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-xs uppercase" style={{ color: theme.colors.text.dark }}>
              Recent Searches
            </span>
            <Button variant="underline" onClick={onClearRecentSearches}>
              Clear
            </Button>
          </div>
          {recentSearches.map((search) => (
            <Button
              variant="ghost"
              key={search.id}
              onClick={() => onSelect(search.location)}
              className="w-full justify-start hover:opacity-80 transition-opacity"
              icon={
                <Image
                  src={ClockIcon}
                  alt="Clock Icon"
                  width={16}
                  height={16}
                  className="object-contain"
                  aria-hidden="true"
                />
              }
              iconPlacement="start"
            >
              {search.location}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'relative flex-1 border-r transition-all duration-300',
          !isExpanded && 'shrink-0 max-w-60 w-full'
        )}
        style={{
          borderRightColor:
            showDropdown || isRightActive ? theme.colors.border.dark : theme.colors.border.default,
        }}
      >
        <div
          className={cn(
            'flex items-center gap-3 cursor-text',
            isExpanded ? 'px-4 py-3' : 'px-6 py-3'
          )}
          onClick={onClick}
        >
          <div className="shrink-0">
            <Image
              src={isExpanded ? LocationIcon : HospitalImage}
              alt="Location Icon"
              width={isExpanded ? 20 : 40}
              height={isExpanded ? 20 : 40}
              className="object-contain"
            />
          </div>
          {isExpanded ? (
            <>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                placeholder="Enter location"
                className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-sm"
                style={{
                  color: theme.colors.text.default,
                }}
              />
              {value && (
                <Button
                  variant="ghost"
                  iconPlacement="center"
                  icon={<CrossIcon size={16} fill={theme.colors.text.default} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="p-1 hover:opacity-70 transition-opacity"
                  aria-label="Clear location"
                />
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center" ref={inputRef}>
              <span
                className="text-xs leading-tight"
                style={{ color: theme.colors.text.secondary }}
              >
                Hospitals In
              </span>
              <span className="text-sm font-semibold leading-tight">{value}</span>
            </div>
          )}
        </div>
      </div>
      {typeof window !== 'undefined' && showDropdown && isExpanded
        ? createPortal(dropdownContent, document.body)
        : null}
    </>
  );
}
