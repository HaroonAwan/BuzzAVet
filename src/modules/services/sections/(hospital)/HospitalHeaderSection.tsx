import { FavoriteIcon, StarIcon } from '@/assets/icon-components';
// ...existing code...
import { utcTimeToLocal } from '@/lib/utcTimeToLocal';
import { SharedIcon } from '@/assets/icon-components/SharedIcon';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import LocationIcon from '@/assets/images/home/location.svg';
import ClockIcon from '@/assets/images/services/clock.svg';
import FearFreeCertifiedIcon from '@/assets/images/services/fearFreeCertified.png';
import Image from 'next/image';
import { Chip } from '@/components/shared/Chip';
import { HospitalDetailsResponse } from '@/types/hospitalsTypes';

interface HospitalHeaderSectionProps {
  hospital: HospitalDetailsResponse;
  onFavoriteToggle?: (favorite: boolean) => void;
  isFavorite?: boolean;
}

const HospitalHeaderSection = ({
  hospital,
  onFavoriteToggle,
  isFavorite,
}: HospitalHeaderSectionProps) => {
  console.log('🚀 ~ HospitalHeaderSection ~ hospital:', hospital);
  // Map data from hospital as per types
  const name = hospital.basicInformation?.name ?? 'Hospital';
  const address = hospital.basicInformation?.address?.address ?? '';
  const city = hospital.basicInformation?.address?.city ?? '';
  const state = hospital.basicInformation?.address?.state ?? '';
  const zip = hospital.basicInformation?.address?.zip ?? '';
  const fullAddress = [address, city, state, zip].filter(Boolean).join(', ');
  const rating = typeof hospital.ratings === 'number' ? hospital.ratings : 0;
  const reviewsCount =
    typeof hospital.noOfTotalReviews === 'number' ? hospital.noOfTotalReviews : 0;
  const isFearFreeCertified = hospital.details?.isFearFreeCertified;
  const isAAHAACertified = hospital.details?.isAAHAACertified;
  const hasEmergency =
    Array.isArray(hospital.preferences?.appointmentConsistOf) &&
    hospital.preferences.appointmentConsistOf.includes('emergency');
  const profilePicture = hospital.documents?.profilePicture?.path ?? '';
  const favorite = isFavorite ?? false;
  const openingHours = hospital.today;
  let openTodayText = 'Info not disclosed.';
  if (openingHours) {
    // Use hospital owner's timezone for local time conversion
    const hospitalTz = hospital.owner?.timeZone;
    if (openingHours.isOpen && openingHours.openTime && openingHours.closeTime) {
      const openLocal = utcTimeToLocal(openingHours.openTime);
      const closeLocal = utcTimeToLocal(openingHours.closeTime);
      openTodayText = `Open today • ${openLocal} - ${closeLocal}`;
    } else if (openingHours.isOpen === false && openingHours.day) {
      openTodayText = `Closed on ${openingHours.day.charAt(0) + openingHours.day.slice(1).toLowerCase()}`;
    }
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-6">
        <Avatar size="max" url={profilePicture} name="Hospital Logo" />
        {/* content portion */}
        <div className="flex flex-col justify-between">
          <h1 className="thirty-six leading-none font-semibold">{name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border-r pr-4">
              <StarIcon />
              <p className="text-sm font-bold">
                {rating}{' '}
                <span className="font-normal" style={{ color: theme.colors.text.tertiary }}>
                  ({reviewsCount} reviews)
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1 border-r pr-4">
              <Image
                src={LocationIcon}
                alt="Location Icon"
                width={18}
                height={18}
                className="black-filter object-contain"
              />
              <p className="text-sm">{fullAddress}</p>
            </div>
            <div className="flex items-center gap-1 pr-4">
              <Image
                src={ClockIcon}
                alt="Clock Icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <div>
                <p className="text-sm" style={{ color: theme.colors.text.success }}>
                  {openTodayText}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isFearFreeCertified && (
              <Chip variant="success">
                <div className="flex items-center gap-1">
                  <Image
                    src={FearFreeCertifiedIcon}
                    alt="Fear Free Certified Icon"
                    width={16}
                    height={10}
                    className="object-cover"
                  />
                  <span>Fear Free Certified</span>
                </div>
              </Chip>
            )}
            {isAAHAACertified && (
              <Chip variant="normal">
                <div className="flex items-center gap-1">
                  <Image
                    src={FearFreeCertifiedIcon}
                    alt="AAHA Accredited Icon"
                    width={16}
                    height={10}
                    className="object-cover"
                  />
                  <span>AAHA Accredited</span>
                </div>
              </Chip>
            )}
            {hasEmergency && <Chip variant="warning">Emergency Services</Chip>}
          </div>
        </div>
      </div>
      {/* share portion */}
      <div className="flex gap-2">
        <Button
          size="sm"
          className="h-fit text-[14px] font-medium"
          variant="outline"
          icon={<SharedIcon />}
          iconPlacement="start"
        >
          Share
        </Button>
        <Button
          size="icon"
          className="h-fit"
          variant="outline"
          icon={<FavoriteIcon favorite={favorite} size={18} />}
          iconPlacement="center"
          onClick={handleFavoriteClick}
        />
      </div>
    </div>
  );
};

export default HospitalHeaderSection;
