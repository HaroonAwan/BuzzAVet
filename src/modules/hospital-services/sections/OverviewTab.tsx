'use client';

import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import XRayIcon from '@/assets/images/services/x-ray.svg';
import UltraSoundIcon from '@/assets/images/services/ultraSound.svg';
import SurgerySuiteIcon from '@/assets/images/services/surgerySuite.svg';
import EmergencyIcon from '@/assets/images/services/emergency.svg';
import BoardingIcon from '@/assets/images/services/boarding.svg';
import InHouseLabIcon from '@/assets/images/services/inHouseLab.svg';
import GoogleMap from '@/components/shared/GoogleMap';
import { useState, useEffect } from 'react';
import LocationIcon from '@/assets/images/home/location.svg';
import { getCurrentLocation, type Coordinates } from '@/lib/geolocation';

interface HighlightIconsProps {
  icon: string;
  bg?: string;
  title: string;
}

const HighlightsContent = [
  {
    icon: XRayIcon,
    bg: theme.colors.chip.normal.background,
    title: 'Digital X-Ray',
  },
  {
    icon: UltraSoundIcon,
    bg: theme.colors.background.lightGreen,
    title: 'Ultrasound',
  },
  {
    icon: SurgerySuiteIcon,
    bg: theme.colors.chip.warning.background,
    title: 'Surgery Suite',
  },
  {
    icon: EmergencyIcon,
    bg: theme.colors.chip.alert.background,
    title: 'Emergency Care',
  },
  {
    icon: BoardingIcon,
    bg: theme.colors.background.lightPurple,
    title: 'Boarding',
  },
  {
    icon: InHouseLabIcon,
    bg: theme.colors.background.lightBlue,
    title: 'In-House Lab',
  },
];

const HighlightIcons = ({ icon, bg, title }: HighlightIconsProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={cn('flex justify-center items-center', 'w-11 h-11 rounded-xl')}
        style={{ backgroundColor: bg ?? theme.colors.chip.normal.background }}
      >
        <Image src={icon as string} alt={title} width={24} height={24} />
      </div>
      <h2 className="font-semibold">{title}</h2>
    </div>
  );
};

const OverviewTab = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then((coords) => {
        setCurrentLocation(coords);
        setLocationError(null);
      })
      .catch((error) => {
        setLocationError(error.message);
        console.error('Error getting location:', error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* INTRO SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">About the Hospital</h1>
        <p className="text-sm text-justify" style={{ color: theme.colors.text.secondary }}>
          City Paws Medical Center is a state-of-the-art veterinary facility dedicated to providing
          comprehensive and compassionate care for your pets. Our team of board-certified
          specialists and experienced veterinarians utilize the latest technology to ensure the best
          possible outcomes.
        </p>
      </div>
      {/* HIGHLIGHTS SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Facility Highlights</h1>
        <div className="grid grid-cols-3 gap-6">
          {HighlightsContent.map((item, index) => (
            <HighlightIcons
              key={index}
              icon={item.icon as string}
              bg={item.bg}
              title={item.title}
            />
          ))}
        </div>
      </div>
      {/* MAP SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Hospital Address</h1>
        {currentLocation && (
          <GoogleMap
            lat={currentLocation.latitude.toFixed(6) as unknown as number}
            lng={currentLocation.longitude.toFixed(6) as unknown as number}
            height="211px"
          />
        )}

        <div className="flex gap-3">
          <Image
            src={LocationIcon}
            alt="Location Icon"
            className="black-filter"
            width={20}
            height={2}
          />
          <div className="flex flex-col">
            <h2 className="text-sm" style={{ color: theme.colors.text.secondary }}>
              Hospital Address
            </h2>
            <p className="font-medium">123 Veterinary Way, San Francisco, CA 94110</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
