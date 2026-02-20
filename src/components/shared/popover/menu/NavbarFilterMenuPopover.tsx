'use client';

import * as React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverLayout } from '../PopoverLayout';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { CrossIcon, StarIcon, ChevronDownIcon } from '@/assets/icon-components';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { Button } from '../../Button';
import { CheckTag } from '../../CheckTag';
import DollarIcon from '@/assets/images/home/dollar.svg';
import Image from 'next/image';
import { useNavbar } from '../../navbar/useNavbar';

export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export interface FilterState {
  consultationFee: { minPrice: number; maxPrice: number };
  minRating: string | null;
  maxMiles: number;
  emergencyServices: boolean;
  medicalServices: string[];
  facilities: string[];
  accreditations: { isFearFreeCertified: boolean; isAAHAACertified: boolean };
  insuranceAccepted: string[];
  gender?: Gender[];
  languages?: string[];
}

export interface NavbarFilterMenuPopoverProps {
  trigger: React.ReactNode;
  onClose?: () => void;
  onClearAll?: () => void;
  onApply?: (filters: FilterState) => void;
  className?: string;
  activeSlug?: string;
}

/**
 * Complete filter menu popover component for Navbar matching Figma design.
 * Includes Popover wrapper, trigger binding, and all UI.
 */
export function NavbarFilterMenuPopover({
  trigger,
  onClose,
  onClearAll,
  onApply,
  className,
  activeSlug,
}: NavbarFilterMenuPopoverProps) {
  console.log('🚀 ~ NavbarFilterMenuPopover ~ activeSlug:', activeSlug);
  const [open, setOpen] = React.useState(false);
  const {
    toggleSection,
    onSubmitForm,
    toggleService,
    getAppliedFiltersCount,
    filters,
    handleClearAll,
    expandedSections,
    control,
    medicalServicesOptions,
    facilitiesOptions,
    toggleAccreditation,
  } = useNavbar({ onApply, onClearAll });
  const isMobileOrTele = activeSlug === 'mobile-vets' || activeSlug === 'telemedicine';
  // Collapsible Section
  const CollapsibleSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.has(id);
    return (
      <div>
        <button
          onClick={() => toggleSection(id)}
          className="flex w-full items-center justify-between py-3"
        >
          <h4 className="text-sm font-semibold" style={{ color: theme.colors.text.default }}>
            {title}
          </h4>
          <ChevronDownIcon
            size={20}
            className={cn('transition-transform', isExpanded && 'rotate-180')}
            style={{ color: theme.colors.text.secondary }}
          />
        </button>
        {isExpanded && <div className="pb-3">{children}</div>}
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </PopoverTrigger>
      <PopoverLayout align="end" side="bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitForm();
            setOpen(false);
          }}
        >
          <div className={cn('max-h-[80vh] w-127.5 overflow-y-auto', className)}>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-2">
              <Button variant="underline" className="px-0" type="button" onClick={handleClearAll}>
                Clear all
              </Button>
              <h3
                className="text-[18px] font-semibold"
                style={{ color: theme.colors.text.default }}
              >
                Filters
              </h3>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
                aria-label="Close"
                icon={<CrossIcon size={24} fill={theme.colors.text.default} />}
                iconPlacement="center"
              />
            </div>

            {/* Filter Content */}
            <div className="space-y-8 p-4">
              {/* Consultation Fee */}
              <div>
                <h4 className="text-lg font-semibold">Consultation Fee</h4>
                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  Includes exam and basic fees
                </p>
                {/* Histogram and Slider Container */}
                <div className="relative">
                  {/* Histogram */}
                  <div className="flex h-16.5 items-end gap-1">
                    {[
                      10, 20, 15, 30, 40, 50, 65, 50, 40, 25, 10, 5, 10, 40, 45, 50, 65, 34, 25, 15,
                    ].map((height, index, array) => {
                      const min = 0;
                      const max = 500;
                      const valueAtPos = min + (index / (array.length - 1)) * (max - min);
                      const isInRange =
                        valueAtPos >= filters.consultationFee.minPrice &&
                        valueAtPos <= filters.consultationFee.maxPrice;
                      return (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${height}%`,
                            backgroundColor: isInRange
                              ? theme.colors.background.range
                              : theme.colors.background.muted,
                          }}
                        />
                      );
                    })}
                  </div>
                  {/* Range Sliders - Positioned at base of histogram */}
                  <Controller
                    control={control}
                    name="consultationFee"
                    render={({ field }) => (
                      <div className="relative h-2" style={{ marginTop: '-4px' }}>
                        {/* Background Track - Full width gray track */}
                        <div
                          className="absolute w-full rounded-full"
                          style={{
                            backgroundColor: theme.colors.border.default,
                            height: '2px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 0,
                          }}
                        />
                        {/* Active Range Highlight - Teal segment - Must be below thumbs */}
                        <div
                          className="absolute rounded-full"
                          style={{
                            backgroundColor: theme.colors.background.range,
                            height: '2px',
                            left: `${((field.value.minPrice - 0) / (500 - 0)) * 100}%`,
                            width: `${((field.value.maxPrice - field.value.minPrice) / (500 - 0)) * 100}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                          }}
                        />
                        {/* Min Slider - Higher z-index when on left side of range */}
                        <input
                          type="range"
                          min={0}
                          max={500}
                          value={field.value.minPrice}
                          onChange={(e) => {
                            const newMin = Math.min(
                              parseInt(e.target.value, 10),
                              field.value.maxPrice - 1
                            );
                            field.onChange({ ...field.value, minPrice: newMin });
                          }}
                          className="slider-input absolute h-2 w-full cursor-pointer"
                          style={{ zIndex: 10 }}
                        />
                        {/* Max Slider - Higher z-index when on right side of range */}
                        <input
                          type="range"
                          min={0}
                          max={500}
                          value={field.value.maxPrice}
                          onChange={(e) => {
                            const newMax = Math.max(
                              parseInt(e.target.value, 10),
                              field.value.minPrice + 1
                            );
                            field.onChange({ ...field.value, maxPrice: newMax });
                          }}
                          className="slider-input absolute h-2 w-full cursor-pointer"
                          style={{ zIndex: 10 }}
                        />
                      </div>
                    )}
                  />
                </div>
                {/* Min/Max Inputs */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      className="mb-1.5 block text-center text-xs"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      Minimum
                    </label>
                    <Controller
                      control={control}
                      name="consultationFee"
                      render={({ field }) => (
                        <div className="relative">
                          <Image
                            src={DollarIcon}
                            alt="Dollar Icon"
                            width={20}
                            height={20}
                            className="absolute top-1/2 left-3 -translate-y-1/2"
                          />
                          <Input
                            type="number"
                            value={field.value.minPrice}
                            onChange={(e) => {
                              const numValue = parseInt(e.target.value, 10);
                              if (!isNaN(numValue)) {
                                const newMin = Math.max(
                                  0,
                                  Math.min(numValue, field.value.maxPrice - 1)
                                );
                                field.onChange({ ...field.value, minPrice: newMin });
                              }
                            }}
                            min={0}
                            max={field.value.maxPrice - 1}
                            className="w-full pl-10 font-semibold"
                            style={{ color: theme.colors.text.default }}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <span className="mt-6" style={{ color: theme.colors.text.muted }}>
                    -
                  </span>
                  <div className="flex-1">
                    <label
                      className="mb-1.5 block text-center text-xs"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      Maximum
                    </label>
                    <Controller
                      control={control}
                      name="consultationFee"
                      render={({ field }) => (
                        <div className="relative">
                          <Image
                            src={DollarIcon}
                            alt="Dollar Icon"
                            width={20}
                            height={20}
                            className="absolute top-1/2 left-3 -translate-y-1/2"
                          />
                          <Input
                            type="number"
                            value={field.value.maxPrice}
                            onChange={(e) => {
                              const numValue = parseInt(e.target.value, 10);
                              if (!isNaN(numValue)) {
                                const newMax = Math.min(
                                  500,
                                  Math.max(numValue, field.value.minPrice + 1)
                                );
                                field.onChange({ ...field.value, maxPrice: newMax });
                              }
                            }}
                            min={field.value.minPrice + 1}
                            max={500}
                            className="w-full pl-10 font-semibold"
                            style={{ color: theme.colors.text.default }}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px"
                style={{ borderTop: `1px solid ${theme.colors.border.default}` }}
              />

              {/* Minimum Rating */}
              <div>
                <h4 className="mb-4 text-lg font-semibold">Minimum Rating</h4>
                <Controller
                  control={control}
                  name="minRating"
                  render={({ field }) => {
                    const ratings = ['4.5', '4', '3.5'];
                    return (
                      <div className="flex gap-2">
                        {ratings.map((rating) => (
                          <CheckTag
                            key={rating}
                            active={field.value === rating}
                            onClick={() => field.onChange(field.value === rating ? null : rating)}
                            className="flex items-center gap-2"
                          >
                            <StarIcon size={18} fill={theme.colors.special.verifiedBadge} />
                            <span>{rating}+ Stars</span>
                          </CheckTag>
                        ))}
                      </div>
                    );
                  }}
                />
              </div>

              {/* Distance */}
              {!isMobileOrTele && (
                <div>
                  <h4 className="mb-4 text-lg font-semibold">Distance</h4>
                  <div className="flex items-center gap-3">
                    <Controller
                      control={control}
                      name="maxMiles"
                      render={({ field }) => (
                        <input
                          type="range"
                          min={0}
                          max={10000}
                          value={field.value}
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                          className="range-slider h-2 flex-1 cursor-pointer appearance-none rounded-full"
                          style={{
                            background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${((field.value - 0) / (10000 - 0)) * 100}%, ${theme.colors.background.tertiary} ${((field.value - 0) / (10000 - 0)) * 100}%, ${theme.colors.background.tertiary} 100%)`,
                          }}
                        />
                      )}
                    />
                    <span
                      className="min-w-15 text-sm"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      {filters.maxMiles} miles
                    </span>
                  </div>
                </div>
              )}

              {/* Emergency Services */}
              {/* {!isMobileOrTele && (
                <div className="flex items-center justify-between">
                  <div>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: theme.colors.text.default }}
                    >
                      Emergency Services
                    </h4>
                    <p className="mt-0.5 text-xs" style={{ color: theme.colors.text.secondary }}>
                      Only show 24/7 emergency hospitals
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="emergencyServices"
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} size="md" />
                    )}
                  />
                </div>
              )} */}

              {!isMobileOrTele && (
                <>
                  {/* Medical Services */}
                  <CollapsibleSection id="medical-services" title="Medical Services">
                    <div className="flex flex-wrap gap-2">
                      {medicalServicesOptions.map((service) => (
                        <CheckTag
                          key={service.id}
                          active={filters.medicalServices?.includes(service.id) || false}
                          onClick={() => toggleService(service.id, 'medicalServices')}
                        >
                          {service.title}
                        </CheckTag>
                      ))}
                    </div>
                  </CollapsibleSection>

                  {/* Facilities */}
                  <CollapsibleSection id="facilities" title="Facilities">
                    <div className="flex flex-wrap gap-2">
                      {facilitiesOptions.length > 0 ? (
                        facilitiesOptions.map((f) => (
                          <CheckTag
                            key={f.id}
                            active={filters.facilities?.includes(f.id) || false}
                            onClick={() => toggleService(f.id, 'facilities')}
                          >
                            {f.title}
                          </CheckTag>
                        ))
                      ) : (
                        <>
                          <CheckTag
                            active={filters.facilities?.includes('parking') || false}
                            onClick={() => toggleService('parking', 'facilities')}
                          >
                            Parking
                          </CheckTag>
                          <CheckTag
                            active={filters.facilities?.includes('waiting-room') || false}
                            onClick={() => toggleService('waiting-room', 'facilities')}
                          >
                            Waiting Room
                          </CheckTag>
                        </>
                      )}
                    </div>
                  </CollapsibleSection>
                </>
              )}

              {!isMobileOrTele && (
                <CollapsibleSection id="accreditations" title="Accreditations">
                  <div className="flex flex-wrap gap-2">
                    <CheckTag
                      active={filters.accreditations?.isAAHAACertified || false}
                      onClick={() => toggleAccreditation('isAAHAACertified')}
                    >
                      AAHA
                    </CheckTag>
                    <CheckTag
                      active={filters.accreditations?.isFearFreeCertified || false}
                      onClick={() => toggleAccreditation('isFearFreeCertified')}
                    >
                      Fear Free
                    </CheckTag>
                  </div>
                </CollapsibleSection>
              )}

              {/* Gender (mobile/telemedicine specific) */}
              {isMobileOrTele && (
                <CollapsibleSection id="gender" title="Gender">
                  <div className="flex gap-2">
                    <CheckTag
                      active={filters.gender?.includes('MALE') || false}
                      onClick={() => toggleService('MALE', 'gender')}
                    >
                      Male
                    </CheckTag>
                    <CheckTag
                      active={filters.gender?.includes('FEMALE') || false}
                      onClick={() => toggleService('FEMALE', 'gender')}
                    >
                      Female
                    </CheckTag>
                    <CheckTag
                      active={filters.gender?.includes('UNKNOWN') || false}
                      onClick={() => toggleService('UNKNOWN', 'gender')}
                    >
                      Unknown
                    </CheckTag>
                  </div>
                </CollapsibleSection>
              )}

              {/* Languages (mobile/telemedicine specific) */}
              {isMobileOrTele && (
                <CollapsibleSection id="languages" title="Languages">
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Spanish', 'French', 'Arabic'].map((lang) => (
                      <CheckTag
                        key={lang}
                        active={filters.languages?.includes(lang) || false}
                        onClick={() => toggleService(lang, 'languages')}
                      >
                        {lang}
                      </CheckTag>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {/* Insurance Accepted */}
              {/* <CollapsibleSection id="insurance-accepted" title="Insurance Accepted">
                <div className="flex flex-wrap gap-2">
                  <CheckTag
                    active={filters.insuranceAccepted?.includes('pet-insurance') || false}
                    onClick={() => toggleService('pet-insurance', 'insuranceAccepted')}
                  >
                    Pet Insurance
                  </CheckTag>
                </div>
              </CollapsibleSection> */}
            </div>

            {/* Footer */}
            <div
              className="sticky bottom-0 border-t bg-white px-4 py-3"
              style={{ borderColor: theme.colors.border.default }}
            >
              <Button
                type="submit"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.active,
                  color: 'white',
                }}
                disabled={getAppliedFiltersCount(filters) === 0}
              >
                Apply {getAppliedFiltersCount(filters)} Filter
                {getAppliedFiltersCount(filters) === 1 ? '' : 's'}
              </Button>
            </div>
          </div>
        </form>
      </PopoverLayout>
    </Popover>
  );
}
