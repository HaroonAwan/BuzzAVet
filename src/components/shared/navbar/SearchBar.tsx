import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { SearchIcon } from '@/assets/icon-components';
import { Button } from '../Button';
import { Filter } from '../Filter';
import { NavbarFilterMenuPopover } from '../popover';
import { LocationInput } from './LocationInput';
import { ServiceTypeInput } from './ServiceTypeInput';
import { ViewToggle } from './ViewToggle';
import { ViewType, RecentSearch, RecentServiceSearch } from './types';

interface SearchBarProps {
  isExpanded: boolean;
  locationValue: string;
  serviceTypeValue: string;
  showLocationDropdown: boolean;
  showServiceTypeDropdown: boolean;
  isServiceTypeFocused: boolean;
  viewType: ViewType;
  recentSearches: RecentSearch[];
  recentServiceSearches: RecentServiceSearch[];
  onLocationChange: (value: string) => void;
  onLocationFocus: () => void;
  onLocationClick: () => void;
  onLocationSelect: (location: string) => void;
  onLocationClear: () => void;
  onNearbyClick: () => void;
  onClearRecentSearches: () => void;
  onServiceTypeChange: (value: string) => void;
  onServiceTypeFocus: () => void;
  onServiceTypeClick: () => void;
  onServiceTypeSelect: (service: string) => void;
  onClearRecentServiceSearches: () => void;
  onViewChange: (view: ViewType) => void;
  locationInputRef: React.RefObject<HTMLInputElement | null>;
  locationDropdownRef: React.RefObject<HTMLDivElement | null>;
  serviceTypeInputRef: React.RefObject<HTMLInputElement | null>;
  serviceTypeDropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function SearchBar({
  isExpanded,
  locationValue,
  serviceTypeValue,
  showLocationDropdown,
  showServiceTypeDropdown,
  isServiceTypeFocused,
  viewType,
  recentSearches,
  recentServiceSearches,
  onLocationChange,
  onLocationFocus,
  onLocationClick,
  onLocationSelect,
  onLocationClear,
  onNearbyClick,
  onClearRecentSearches,
  onServiceTypeChange,
  onServiceTypeFocus,
  onServiceTypeClick,
  onServiceTypeSelect,
  onClearRecentServiceSearches,
  onViewChange,
  locationInputRef,
  locationDropdownRef,
  serviceTypeInputRef,
  serviceTypeDropdownRef,
}: SearchBarProps) {
  if (isExpanded) {
    return (
      <div className="flex items-center pb-4 justify-between">
        <span />
        <div className="flex items-center gap-3">
          <div className="relative" style={{ width: '815px' }}>
            <div
              className={cn(
                'flex items-center gap-0 rounded-xl border bg-white',
                'transition-all duration-300 h-12'
              )}
              style={{
                borderColor:
                  showLocationDropdown || showServiceTypeDropdown
                    ? theme.colors.active
                    : theme.colors.border.default,
              }}
            >
              <LocationInput
                value={locationValue}
                onChange={onLocationChange}
                onFocus={onLocationFocus}
                onClick={onLocationClick}
                onSelect={onLocationSelect}
                onClear={onLocationClear}
                onNearbyClick={onNearbyClick}
                showDropdown={showLocationDropdown}
                recentSearches={recentSearches}
                onClearRecentSearches={onClearRecentSearches}
                inputRef={locationInputRef}
                dropdownRef={locationDropdownRef}
                isExpanded={true}
                isRightActive={showServiceTypeDropdown}
              />

              <ServiceTypeInput
                value={serviceTypeValue}
                onChange={onServiceTypeChange}
                onFocus={onServiceTypeFocus}
                onClick={onServiceTypeClick}
                onSelect={onServiceTypeSelect}
                showDropdown={showServiceTypeDropdown}
                recentServiceSearches={recentServiceSearches}
                onClearRecentServiceSearches={onClearRecentServiceSearches}
                inputRef={serviceTypeInputRef}
                dropdownRef={serviceTypeDropdownRef}
                isServiceTypeFocused={isServiceTypeFocused}
                isSearchExpanded={true}
                isExpanded={true}
              />

              <button
                className="flex cursor-pointer h-full items-center justify-center transition-opacity hover:opacity-90 shrink-0 w-12 rounded-xl"
                style={{ backgroundColor: theme.colors.special.verifiedBadge }}
                aria-label="Search"
              >
                <SearchIcon size={20} fill={theme.colors.text.default} />
              </button>
            </div>
          </div>

          <NavbarFilterMenuPopover
            trigger={<Filter onClick={() => {}} />}
            resultCount={3}
            onClose={() => console.log('Close')}
            onClearAll={() => console.log('Clear all')}
            onApply={(filters) => console.log('Apply filters', filters)}
          />
        </div>

        <ViewToggle viewType={viewType} onViewChange={onViewChange} />
      </div>
    );
  }

  return (
    <div className="flex-1 mx-6 flex items-center justify-center gap-6">
      <div className="w-141.75">
        <div
          className={cn(
            'flex items-center rounded-xl border bg-white w-full',
            'transition-all duration-300 h-16'
          )}
          style={{
            borderColor:
              showLocationDropdown || showServiceTypeDropdown
                ? theme.colors.active
                : theme.colors.border.default,
          }}
        >
          <LocationInput
            value={locationValue}
            onChange={onLocationChange}
            onFocus={onLocationFocus}
            onClick={onLocationClick}
            onSelect={onLocationSelect}
            onClear={onLocationClear}
            onNearbyClick={onNearbyClick}
            showDropdown={showLocationDropdown}
            recentSearches={recentSearches}
            onClearRecentSearches={onClearRecentSearches}
            inputRef={locationInputRef}
            dropdownRef={locationDropdownRef}
            isExpanded={false}
            isRightActive={showServiceTypeDropdown}
          />

          <ServiceTypeInput
            value={serviceTypeValue}
            onChange={onServiceTypeChange}
            onFocus={onServiceTypeFocus}
            onClick={onServiceTypeClick}
            onSelect={onServiceTypeSelect}
            showDropdown={showServiceTypeDropdown}
            recentServiceSearches={recentServiceSearches}
            onClearRecentServiceSearches={onClearRecentServiceSearches}
            inputRef={serviceTypeInputRef}
            dropdownRef={serviceTypeDropdownRef}
            isServiceTypeFocused={isServiceTypeFocused}
            isSearchExpanded={false}
            isExpanded={false}
          />

          <Button
            size="lg"
            variant="ghost"
            iconPlacement="center"
            icon={<SearchIcon fill={theme.colors.text.default} />}
            aria-label="Search"
            className="rounded-xl w-15.5 h-15.5"
            style={{
              backgroundColor: theme.colors.special.verifiedBadge,
            }}
          />
        </div>
      </div>

      <NavbarFilterMenuPopover
        trigger={<Filter onClick={() => {}} />}
        resultCount={3}
        onClose={() => console.log('Close')}
        onClearAll={() => console.log('Clear all')}
        onApply={(filters) => console.log('Apply filters', filters)}
      />
    </div>
  );
}
