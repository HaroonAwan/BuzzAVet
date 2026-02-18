import { FavoriteIcon, StarIcon } from '@/assets/icon-components';
import { SharedIcon } from '@/assets/icon-components/SharedIcon';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import SchoolIcon from '@assets/images/services/school.svg';
import GraduationIcon from '@assets/images/services/graduation.svg';
import PracticeIcon from '@assets/images/services/practice.svg';
import Image from 'next/image';

interface VetsHeaderSectionProps {
  vet: any;
  mappedData: any;
}

const VetsHeaderSection = ({ vet, mappedData }: VetsHeaderSectionProps) => {
  const profile = vet?.profile || {};
  const education = profile.education || [];
  const yearsOfPractice = profile.experience?.yearOfPractice;
  const schoolName = education[0]?.school || '';
  const graduationYear = education[0]?.graduationYear || '';
  const specialties = profile.areaOfExpertise?.typesOfAnimals?.join(', ') || '';
  const rating = vet?.ratings || '-';
  const reviews = vet?.noOfTotalReviews || 0;
  const vetName = `${vet?.firstName || ''} ${vet?.lastName || ''}`.trim();
  const avatarUrl = profile?.documents?.profilePhoto?.path || '';
  const businessDetails = vet?.profile?.businessDetails || {};
  console.log('🚀 ~ VetsHeaderSection ~ businessDetails:', businessDetails);

  const VET_EDUCATION = [
    {
      icon: SchoolIcon,
      title: "Vet's School Name",
      description: schoolName,
    },
    { icon: GraduationIcon, title: 'Graduation year', description: graduationYear },
    {
      icon: PracticeIcon,
      title: 'Years of practice',
      description: yearsOfPractice ?? 'Fresh Graduate',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <div className="flex gap-6">
          <Avatar size="max" url={avatarUrl} name={vetName || 'Vets Logo'} />
          {/* content portion */}
          <div className="flex flex-col justify-between">
            <h1 className="thirty-six leading-none font-semibold">
              {vetName || 'Vets Title Placeholder'}
            </h1>
            <p>{specialties}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <StarIcon />
                <p className="text-sm font-bold">
                  {rating}{' '}
                  <span className="font-normal" style={{ color: theme.colors.text.tertiary }}>
                    ({reviews} reviews)
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
        {businessDetails && (
          <div className="flex items-center gap-4">
            <Avatar
              size="lg"
              url={businessDetails?.profilePhoto?.path || ''}
              name={businessDetails?.name || 'Clinic Logo'}
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                Affiliated Hospital
              </p>
              <p className="font-semibold">{businessDetails?.name || 'No Hospital Name'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VetsHeaderSection;
