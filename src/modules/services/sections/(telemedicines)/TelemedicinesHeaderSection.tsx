import { FavoriteIcon, StarIcon } from '@/assets/icon-components';
import { SharedIcon } from '@/assets/icon-components/SharedIcon';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import SchoolIcon from '@assets/images/services/school.svg';
import GraduationIcon from '@assets/images/services/graduation.svg';
import PracticeIcon from '@assets/images/services/practice.svg';
import Image from 'next/image';

const VET_EDUCATION = [
  {
    icon: SchoolIcon,
    title: "Vet's School Name",
    description: 'Cornell University',
  },
  { icon: GraduationIcon, title: 'Graduation year', description: '2015' },
  {
    icon: PracticeIcon,
    title: 'Years of practice',
    description: '21 Years',
  },
];

const TelemedicinesHeaderSection = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <div className="flex gap-6">
          <Avatar size="max" url="" name="Telemedicines Logo" />
          {/* content portion */}
          <div className="flex flex-col justify-between">
            <h1 className="thirty-six leading-none font-semibold">
              Telemedicines Title Placeholder
            </h1>
            <p>Dermatology</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <StarIcon />
                <p className="text-sm font-bold">
                  4.5{' '}
                  <span className="font-normal" style={{ color: theme.colors.text.tertiary }}>
                    (200+ reviews)
                  </span>
                </p>
              </div>
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
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {VET_EDUCATION.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center gap-4">
                <Image src={item.icon} alt={item.title} width={24} height={24} />
                <div className="flex flex-col gap-1">
                  <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                    {item.title}
                  </p>
                  <p className="font-semibold">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Avatar size="lg" url="" name="Clinic Logo" />
          <div className="flex flex-col gap-1">
            <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
              Affiliated Hospital
            </p>
            <p className="font-semibold">City Paws Medical Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicinesHeaderSection;
