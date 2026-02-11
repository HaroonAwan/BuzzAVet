import { FavoriteIcon, StarIcon } from '@/assets/icon-components';
import { SharedIcon } from '@/assets/icon-components/SharedIcon';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import LocationIcon from '@/assets/images/home/location.svg';
import ClockIcon from '@/assets/images/services/clock.svg';
import FearFreeCertifiedIcon from '@/assets/images/services/fearFreeCertified.png';
import Image from 'next/image';
import { Chip } from '@/components/shared/Chip';

const HospitalHeaderSection = () => {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-6">
        <Avatar size="max" url="" name="Hospital Logo" />
        {/* content portion */}
        <div className="flex flex-col justify-between">
          <h1 className="thirty-six leading-none font-semibold">Hospital Title Placeholder</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border-r pr-4">
              <StarIcon />
              <p className="text-sm font-bold">
                4.5{' '}
                <span className="font-normal" style={{ color: theme.colors.text.tertiary }}>
                  (200+ reviews)
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
              <p className="text-sm">123 Veterinary Way, San Francisco, CA 94110</p>
            </div>
            <div className="flex items-center gap-1 border-r pr-4">
              <Image
                src={ClockIcon}
                alt="Clock Icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <div>
                <p className="text-sm" style={{ color: theme.colors.text.success }}>
                  Open today • 8:00 AM - 9:00 PM
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
            <Chip variant="normal">
              <div className="flex items-center gap-1">
                <Image
                  src={FearFreeCertifiedIcon}
                  alt="Fear Free Certified Icon"
                  width={16}
                  height={10}
                  className="object-cover"
                />
                <span>AAHA Accredited</span>
              </div>
            </Chip>
            <Chip variant="warning">Emergency Services</Chip>
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
          icon={<FavoriteIcon color="#020409" size={16} />}
          iconPlacement="center"
        />
      </div>
    </div>
  );
};

export default HospitalHeaderSection;
