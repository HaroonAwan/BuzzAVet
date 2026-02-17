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
import LocationIcon from '@/assets/images/home/location.svg';
import { HospitalDetailsResponse } from '@/types/hospitalsTypes';

interface HighlightIconsProps {
  icon: string;
  bg?: string;
  title: string;
}

interface HospitalContentProps {
  hospital: HospitalDetailsResponse;
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
    <div className="flex items-center gap-4">
      <div
        className={cn('flex items-center justify-center', 'h-11 w-11 rounded-xl')}
        style={{ backgroundColor: bg ?? theme.colors.chip.normal.background }}
      >
        <Image src={icon as string} alt={title} width={24} height={24} />
      </div>
      <h2 className="font-semibold">{title}</h2>
    </div>
  );
};

const OverviewTab = ({ hospital }: HospitalContentProps) => {
  return (
    <div className="flex w-full flex-col gap-10">
      {/* INTRO SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">About the Hospital</h1>
        <p className="text-justify text-sm" style={{ color: theme.colors.text.secondary }}>
          {hospital.contactInfo?.about || 'No description available.'}
        </p>
      </div>
      {/* HIGHLIGHTS SECTION */}
      {/* <div className="flex flex-col gap-4">
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
      </div> */}
      {/* MAP SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Hospital Address</h1>
        {/* Show only the hospital's coordinates on the map, never fallback to current location */}
        {hospital.location?.coordinates && hospital.location.coordinates.length === 2 ? (
          <GoogleMap
            lat={hospital.location.coordinates[1]}
            lng={hospital.location.coordinates[0]}
            height="211px"
            title={hospital.basicInformation?.name || 'Hospital Location'}
            address={hospital.basicInformation?.address?.address || ''}
          />
        ) : null}

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
            <p className="font-medium">
              {[
                hospital.basicInformation?.address?.address,
                hospital.basicInformation?.address?.city,
                hospital.basicInformation?.address?.state,
                hospital.basicInformation?.address?.zip,
              ]
                .filter(Boolean)
                .join(', ') || 'No address available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
