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
  heading: string;
  activeSlug: string;
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
  heading,
  activeSlug,
}: SearchBarProps) {
  if (isExpanded) {
    return (
      <div className="flex items-center justify-between pb-4">
        <span />
        <div className="flex items-center gap-3">
          <div className="relative" style={{ width: '815px' }}>
            <div
              className={cn(
                'flex items-center gap-0 rounded-xl border bg-white',
                'h-12 transition-all duration-300'
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
                heading={heading}
                activeSlug={activeSlug}
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
                activeSlug={activeSlug}
              />

              <button
                className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-opacity hover:opacity-90"
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
    <div className="mx-6 hidden flex-1 items-center justify-center gap-6 md:flex">
      <div className="w-141.75">
        <div
          className={cn(
            'flex w-full items-center rounded-xl border bg-white',
            'h-16 transition-all duration-300'
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
            heading={heading}
            activeSlug={activeSlug}
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
            activeSlug={activeSlug}
          />

          <Button
            size="lg"
            variant="ghost"
            iconPlacement="center"
            icon={<SearchIcon fill={theme.colors.text.default} />}
            aria-label="Search"
            className="h-15.5 w-15.5 rounded-xl"
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
