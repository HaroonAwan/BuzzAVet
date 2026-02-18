'use client';

import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/assets/css/custom.css';
import { ChevronDownIcon, StarIcon } from '@/assets/icon-components';
import { CustomSelect, type SelectOption } from '@/components/ui/select';
import ClockIcon from '@/assets/images/services/clock.svg';
import CalenderIcon from '@/assets/images/services/calendar.svg';
import Image from 'next/image';
import { theme } from '@/lib/theme';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';

type CalendarValue = Date | null | [Date | null, Date | null];

interface Veterinarian {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  nextAvailable: string;
  image: string;
}

interface BookTelemedicineAppointmentProps {
  consultationFee?: number;
  nextAvailable?: {
    date: string;
    time: string;
  };
  onBookAppointment?: (data: { date: string; time: string; veterinarian: string }) => void;
}

const BookTelemedicineAppointment: React.FC<BookTelemedicineAppointmentProps> = ({
  consultationFee = 95,
  nextAvailable = {
    date: 'Today',
    time: '2:30 PM',
  },
  onBookAppointment,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 11, 7));
  const [timeFocused, setTimeFocused] = useState(false);
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<SelectOption>({
    value: '09:00 AM',
    label: '09:00 AM',
  });
  const [selectedVeterinarian, setSelectedVeterinarian] = useState<string>('any-available');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVetDropdown, setShowVetDropdown] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const dateButtonRef = useRef<HTMLDivElement>(null);
  const timeContainerRef = useRef<HTMLDivElement>(null);
  const vetDropdownRef = useRef<HTMLDivElement>(null);
  const vetButtonRef = useRef<HTMLDivElement>(null);

  const availableTimes: SelectOption[] = [
    { value: '09:00 AM', label: '09:00 AM' },
    { value: '10:30 AM', label: '10:30 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '02:00 PM', label: '02:00 PM' },
    { value: '03:30 PM', label: '03:30 PM' },
    { value: '04:15 PM', label: '04:15 PM' },
  ];

  const veterinarians: Veterinarian[] = [
    {
      id: 'vet-1',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: '/placeholder-vet.jpg',
    },
    {
      id: 'vet-2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: '/placeholder-vet.jpg',
    },
    {
      id: 'vet-3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: '/placeholder-vet.jpg',
    },
  ];

  // Handle click outside for calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        dateButtonRef.current &&
        !dateButtonRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Handle click outside for time dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeContainerRef.current && !timeContainerRef.current.contains(event.target as Node)) {
        setTimeMenuOpen(false);
        setTimeFocused(false);
      }
    };

    if (timeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [timeMenuOpen]);

  // Handle click outside for vet dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        vetDropdownRef.current &&
        !vetDropdownRef.current.contains(event.target as Node) &&
        vetButtonRef.current &&
        !vetButtonRef.current.contains(event.target as Node)
      ) {
        setShowVetDropdown(false);
      }
    };

    if (showVetDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVetDropdown]);

  const handleDateChange = (value: CalendarValue) => {
    if (value && !Array.isArray(value) && value instanceof Date) {
      setSelectedDate(value);
      setShowCalendar(false);
    }
  };

  const handleBookNow = () => {
    if (onBookAppointment) {
      const selectedVet =
        selectedVeterinarian === 'any-available'
          ? 'Any Available Vet'
          : veterinarians.find((v) => v.id === selectedVeterinarian)?.name || 'Any Available Vet';
      onBookAppointment({
        date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
        time: selectedTime.value,
        veterinarian: selectedVet,
      });
    }
  };

  const getSelectedVetName = () => {
    if (selectedVeterinarian === 'any-available') {
      return 'Any Available Vet';
    }
    return veterinarians.find((v) => v.id === selectedVeterinarian)?.name || 'Any Available Vet';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="h-fit w-full max-w-100 rounded-[14px] border bg-white">
      {/* Header */}
      <h2 className="border-b p-4 text-xl leading-7 font-semibold">Book Appointment</h2>
      {/* Consultation Fee and Next Available */}
      <div className="flex flex-col bg-(--bg-teal) px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="leading-none font-medium">Consultation Fee</span>
          <span className="twenty-eight leading-8 font-bold">${consultationFee}</span>
        </div>

        <div className="flex items-center gap-2">
          <Image src={ClockIcon} alt="Clock Icon" width={16} height={16} />
          <span className="text-sm">Next Available</span>
          <span className="text-sm font-medium" style={{ color: theme.colors.background.range }}>
            {nextAvailable.date}, {nextAvailable.time}
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="border-b p-4">
        <div className="rounded-xl border">
          {/* Date and Time Row */}
          <div className="flex items-center">
            {/* Select Date */}
            <div
              className={cn(
                'padding-custom relative flex h-19.5 w-1/2 cursor-pointer flex-col gap-2 rounded-xl border'
              )}
              style={{ borderColor: showCalendar ? theme.colors.active : 'transparent' }}
              onClick={(e) => {
                if (calendarRef.current && calendarRef.current.contains(e.target as Node)) {
                  return;
                }
                setShowCalendar(!showCalendar);
              }}
              ref={dateButtonRef}
            >
              <label
                className="block cursor-pointer text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                Select Date
              </label>
              <Button
                variant="ghost"
                iconPlacement="end"
                icon={
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${showCalendar ? 'rotate-180' : ''}`}
                  />
                }
                className="h-fit justify-between p-0"
              >
                <div className="flex items-center gap-2">
                  <Image src={CalenderIcon} alt="Calendar Icon" width={20} height={20} />
                  <span>{formatDate(selectedDate)}</span>
                </div>
              </Button>

              {showCalendar && (
                <div
                  ref={calendarRef}
                  className="SHADOW absolute top-full left-0 z-1000 mt-1 rounded-xl bg-white p-2"
                >
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    className="appointment-calendar"
                  />
                </div>
              )}
            </div>

            {/* Available Time */}
            <div
              ref={timeContainerRef}
              className={cn(
                'padding-custom relative flex h-19.5 w-1/2 cursor-pointer flex-col gap-2 rounded-xl border'
              )}
              style={{ borderColor: timeFocused ? theme.colors.active : 'transparent' }}
              onClick={() => {
                setTimeMenuOpen(!timeMenuOpen);
                setTimeFocused(!timeMenuOpen);
              }}
            >
              <label
                className="block cursor-pointer text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                Available Time
              </label>
              <div
                className="flex h-fit w-full items-center gap-2 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={ClockIcon}
                  alt="Clock Icon"
                  width={16}
                  height={16}
                  onClick={() => {
                    setTimeMenuOpen(!timeMenuOpen);
                    setTimeFocused(!timeMenuOpen);
                  }}
                />
                <CustomSelect
                  value={selectedTime}
                  onChange={(newValue) => {
                    if (newValue) {
                      setSelectedTime(newValue as SelectOption);
                    }
                  }}
                  options={availableTimes}
                  onFocus={() => setTimeFocused(true)}
                  onBlur={() => setTimeFocused(false)}
                  onMenuOpen={() => {
                    setTimeMenuOpen(true);
                    setTimeFocused(true);
                  }}
                  onMenuClose={() => {
                    setTimeMenuOpen(false);
                    setTimeFocused(false);
                  }}
                  menuIsOpen={timeMenuOpen}
                  placeholder="Select time"
                  classNamePrefix={'custom-class-for-time-selector'}
                  className="w-full"
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none',
                      padding: 0,
                      '&:hover': {
                        border: 'none',
                      },
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="p-4">
        <Button
          variant="pill"
          size="lg"
          onClick={handleBookNow}
          className="w-full text-white"
          style={{ backgroundColor: theme.colors.background.range }}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookTelemedicineAppointment;
