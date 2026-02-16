import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { Button } from '../Button';
import { SearchIcon } from '@/assets/icon-components';
import ClockIcon from '@/assets/images/home/clock.svg';
import { RecentServiceSearch } from './types';

interface ServiceTypeInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onClick: () => void;
  onSelect: (service: string) => void;
  showDropdown: boolean;
  recentServiceSearches: RecentServiceSearch[];
  onClearRecentServiceSearches: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  isServiceTypeFocused: boolean;
  isSearchExpanded: boolean;
  isExpanded?: boolean;
  activeSlug: string;
}

export function ServiceTypeInput({
  value,
  onChange,
  onFocus,
  onClick,
  onSelect,
  showDropdown,
  recentServiceSearches,
  onClearRecentServiceSearches,
  inputRef,
  dropdownRef,
  isServiceTypeFocused,
  isSearchExpanded,
  isExpanded = false,
  activeSlug,
}: ServiceTypeInputProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(value);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (!inputValue) return;
    debounceTimeout.current = setTimeout(() => {
      const url = `/${activeSlug}?q=${encodeURIComponent(inputValue)}`;
      router.push(url);
    }, 1000);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, activeSlug]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showDropdown && containerRef.current) {
      const updatePosition = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          // Calculate width: ServiceTypeInput width + right extension
          // When expanded: extends 48px (12 * 4) to the right
          // When not expanded: extends 256px (64 * 4) to the right
          const rightExtension = isExpanded ? 48 : 256;
          const width = rect.width + rightExtension;

          setDropdownPosition({
            top: rect.bottom + 8,
            left: rect.left,
            width: width,
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

  const dropdownContent = showDropdown && (
    <div
      ref={dropdownRef}
      className="SHADOW fixed z-100 overflow-hidden rounded-[12px] bg-white p-2"
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
      }}
    >
      {recentServiceSearches.length > 0 && (
        <div style={{ borderColor: theme.colors.border.default }}>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-xs uppercase" style={{ color: theme.colors.text.dark }}>
              Recent Searches
            </span>
            <Button variant="underline" onClick={onClearRecentServiceSearches}>
              Clear
            </Button>
          </div>
          {recentServiceSearches.map((search) => (
            <Button
              variant="ghost"
              key={search.id}
              onClick={() => onSelect(search.service)}
              className="w-full justify-start transition-opacity hover:opacity-80"
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
              {search.service}
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
          'relative flex flex-1 items-center gap-3 px-4 py-3',
          !isExpanded && 'w-65.75 shrink-0'
        )}
      >
        <div className="shrink-0">
          <SearchIcon size={20} fill={theme.colors.text.tertiary} />
        </div>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
            onFocus={onFocus}
            onClick={onClick}
            className={cn(
              'w-full bg-transparent text-sm outline-none',
              isExpanded && 'font-medium'
            )}
            style={{
              color: theme.colors.text.default,
            }}
            placeholder={isExpanded ? 'What type of care do you need?' : undefined}
          />
          {!value && !isServiceTypeFocused && (!isSearchExpanded || !isExpanded) && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center"
              style={{
                color: theme.colors.placeholder,
              }}
            >
              <span className="text-sm leading-tight">
                {isExpanded ? (
                  <>
                    What type of care
                    <br />
                    do you need?
                  </>
                ) : (
                  <>
                    What type of care do
                    <br />
                    you need?
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
      {typeof window !== 'undefined' && showDropdown
        ? createPortal(dropdownContent, document.body)
        : null}
    </>
  );
}
