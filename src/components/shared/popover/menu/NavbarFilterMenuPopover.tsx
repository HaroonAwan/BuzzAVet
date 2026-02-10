'use client';

import * as React from 'react';
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

export interface FilterState {
  consultationFee: { min: number; max: number };
  minimumRating: string | null;
  distance: number;
  emergencyServices: boolean;
  medicalServices: string[];
  facilities: string[];
  accreditations: string[];
  insuranceAccepted: string[];
}

export interface NavbarFilterMenuPopoverProps {
  trigger: React.ReactNode;
  resultCount?: number;
  onClose?: () => void;
  onClearAll?: () => void;
  onApply?: (filters: FilterState) => void;
  className?: string;
}

/**
 * Complete filter menu popover component for Navbar matching Figma design.
 * Includes Popover wrapper, trigger binding, and all UI.
 */
export function NavbarFilterMenuPopover({
  trigger,
  resultCount = 0,
  onClose,
  onClearAll,
  onApply,
  className,
}: NavbarFilterMenuPopoverProps) {
  const form = useForm<FilterState>({
    defaultValues: {
      consultationFee: { min: 24, max: 500 },
      minimumRating: '4.5',
      distance: 50,
      emergencyServices: false,
      medicalServices: ['ultrasound'],
      facilities: [],
      accreditations: [],
      insuranceAccepted: [],
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = form;
  const filters = watch();

  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(['medical-services'])
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleClearAll = () => {
    reset({
      consultationFee: { min: 24, max: 500 },
      minimumRating: null,
      distance: 50,
      emergencyServices: false,
      medicalServices: [],
      facilities: [],
      accreditations: [],
      insuranceAccepted: [],
    });
    onClearAll?.();
  };

  const onSubmit = (data: FilterState) => {
    // Ensure all numeric values are integers
    const roundedData: FilterState = {
      ...data,
      consultationFee: {
        min: Math.round(data.consultationFee.min),
        max: Math.round(data.consultationFee.max),
      },
      distance: Math.round(data.distance),
    };
    onApply?.(roundedData);
  };

  const toggleService = (
    serviceId: string,
    category: 'medicalServices' | 'facilities' | 'accreditations' | 'insuranceAccepted'
  ) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(serviceId)
      ? currentValues.filter((id) => id !== serviceId)
      : [...currentValues, serviceId];
    setValue(category, newValues);
  };

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
          className="w-full flex items-center justify-between py-3"
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

  const medicalServicesOptions = [
    'Ultrasound',
    'Surgery',
    'Dental',
    'Emergency',
    'In-house Lab',
    'Pharmacy',
    'X-Ray',
    'ICU',
    'Boarding',
    'Microchipping',
    'Vaccinations',
    'Wellness Exams',
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverLayout align="end" side="bottom">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cn('w-127.5 max-h-[80vh] overflow-y-auto', className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b sticky top-0 bg-white z-10">
              <Button variant="underline" className="px-0" onClick={handleClearAll}>
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
                onClick={onClose}
                aria-label="Close"
                icon={<CrossIcon size={24} fill={theme.colors.text.default} />}
                iconPlacement="center"
              />
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-8">
              {/* Consultation Fee */}
              <div>
                <h4 className="text-lg font-semibold">Consultation Fee</h4>
                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  Includes exam and basic fees
                </p>
                {/* Histogram and Slider Container */}
                <div className="relative">
                  {/* Histogram */}
                  <div className="flex items-end gap-1 h-16.5">
                    {[
                      10, 20, 15, 30, 40, 50, 65, 50, 40, 25, 10, 5, 10, 40, 45, 50, 65, 34, 25, 15,
                    ].map((height, index, array) => {
                      const min = 0;
                      const max = 500;
                      const valueAtPos = min + (index / (array.length - 1)) * (max - min);
                      const isInRange =
                        valueAtPos >= filters.consultationFee.min &&
                        valueAtPos <= filters.consultationFee.max;
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
                          className="absolute rounded-full w-full"
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
                            left: `${((field.value.min - 0) / (500 - 0)) * 100}%`,
                            width: `${((field.value.max - field.value.min) / (500 - 0)) * 100}%`,
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
                          value={field.value.min}
                          onChange={(e) => {
                            const newMin = Math.min(
                              parseInt(e.target.value, 10),
                              field.value.max - 1
                            );
                            field.onChange({ ...field.value, min: newMin });
                          }}
                          className="absolute w-full h-2 cursor-pointer slider-input"
                          style={{ zIndex: 10 }}
                        />
                        {/* Max Slider - Higher z-index when on right side of range */}
                        <input
                          type="range"
                          min={0}
                          max={500}
                          value={field.value.max}
                          onChange={(e) => {
                            const newMax = Math.max(
                              parseInt(e.target.value, 10),
                              field.value.min + 1
                            );
                            field.onChange({ ...field.value, max: newMax });
                          }}
                          className="absolute w-full h-2 cursor-pointer slider-input"
                          style={{ zIndex: 10 }}
                        />
                      </div>
                    )}
                  />
                </div>
                {/* Min/Max Inputs */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex-1">
                    <label
                      className="text-xs mb-1.5 block text-center"
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
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                          />
                          <Input
                            type="number"
                            value={field.value.min}
                            onChange={(e) => {
                              const numValue = parseInt(e.target.value, 10);
                              if (!isNaN(numValue)) {
                                const newMin = Math.max(0, Math.min(numValue, field.value.max - 1));
                                field.onChange({ ...field.value, min: newMin });
                              }
                            }}
                            min={0}
                            max={field.value.max - 1}
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
                      className="text-xs mb-1.5 block text-center"
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
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                          />
                          <Input
                            type="number"
                            value={field.value.max}
                            onChange={(e) => {
                              const numValue = parseInt(e.target.value, 10);
                              if (!isNaN(numValue)) {
                                const newMax = Math.min(
                                  500,
                                  Math.max(numValue, field.value.min + 1)
                                );
                                field.onChange({ ...field.value, max: newMax });
                              }
                            }}
                            min={field.value.min + 1}
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
                <h4 className="text-lg font-semibold mb-4">Minimum Rating</h4>
                <Controller
                  control={control}
                  name="minimumRating"
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
              <div>
                <h4 className="text-lg font-semibold mb-4">Distance</h4>
                <div className="flex items-center gap-3">
                  <Controller
                    control={control}
                    name="distance"
                    render={({ field }) => (
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                        className="flex-1 h-2 rounded-full appearance-none cursor-pointer range-slider"
                        style={{
                          background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${((field.value - 0) / (100 - 0)) * 100}%, ${theme.colors.background.tertiary} ${((field.value - 0) / (100 - 0)) * 100}%, ${theme.colors.background.tertiary} 100%)`,
                        }}
                      />
                    )}
                  />
                  <span className="text-sm min-w-15" style={{ color: theme.colors.text.secondary }}>
                    {filters.distance} miles
                  </span>
                </div>
              </div>

              {/* Emergency Services */}
              <div className="flex items-center justify-between">
                <div>
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: theme.colors.text.default }}
                  >
                    Emergency Services
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: theme.colors.text.secondary }}>
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

              {/* Medical Services */}
              <CollapsibleSection id="medical-services" title="Medical Services">
                <div className="flex flex-wrap gap-2">
                  {medicalServicesOptions.map((service) => {
                    const serviceId = service.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <CheckTag
                        key={serviceId}
                        active={filters.medicalServices?.includes(serviceId) || false}
                        onClick={() => toggleService(serviceId, 'medicalServices')}
                      >
                        {service}
                      </CheckTag>
                    );
                  })}
                </div>
              </CollapsibleSection>

              {/* Facilities */}
              <CollapsibleSection id="facilities" title="Facilities">
                <div className="flex flex-wrap gap-2">
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
                </div>
              </CollapsibleSection>

              {/* Accreditations */}
              <CollapsibleSection id="accreditations" title="Accreditations">
                <div className="flex flex-wrap gap-2">
                  <CheckTag
                    active={filters.accreditations?.includes('aaha') || false}
                    onClick={() => toggleService('aaha', 'accreditations')}
                  >
                    AAHA
                  </CheckTag>
                </div>
              </CollapsibleSection>

              {/* Insurance Accepted */}
              <CollapsibleSection id="insurance-accepted" title="Insurance Accepted">
                <div className="flex flex-wrap gap-2">
                  <CheckTag
                    active={filters.insuranceAccepted?.includes('pet-insurance') || false}
                    onClick={() => toggleService('pet-insurance', 'insuranceAccepted')}
                  >
                    Pet Insurance
                  </CheckTag>
                </div>
              </CollapsibleSection>
            </div>

            {/* Footer */}
            <div
              className="px-4 py-3 border-t sticky bottom-0 bg-white"
              style={{ borderColor: theme.colors.border.default }}
            >
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm font-semibold rounded-xl transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: theme.colors.active,
                  color: 'white',
                }}
              >
                Show {resultCount} Hospitals
              </button>
            </div>
          </div>
        </form>
      </PopoverLayout>
    </Popover>
  );
}
