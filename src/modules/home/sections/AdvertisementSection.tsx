import SectionsWrapper from '../../../layouts/SectionsWrapper';
import { theme } from '@/lib/theme';
import Image from 'next/image';
import CatImage from '@/assets/images/home/cat-ad.png';
import DogImage from '@/assets/images/home/dog-ad.png';
import { Chip } from '@/components/shared/Chip';
import { Button } from '@/components/shared/Button';
import { ScrollArrowRightIcon } from '@/assets/icon-components';
const AdvertisementSection = () => {
  return (
    <SectionsWrapper>
      <div
        className="relative flex items-center justify-start rounded-[24px] h-[344px]"
        style={{ backgroundColor: theme.colors.special.verifiedBadge }}
      >
        <div className="flex flex-col p-12 items-start justify-start gap-4 max-w-[660px]">
          <Chip variant="info" className="uppercase">
            Wellness Tip
          </Chip>
          <h1 className="thirty-six font-semibold">Spring Allergy Season is Here!</h1>
          <p style={{ color: theme.colors.text.secondary }}>
            Just like humans, pets suffer from seasonal allergies. Watch out for scratching, chewing
            paws, or ear infections. Book a checkup today to keep them comfortable.
          </p>
          <Button
            variant="pill"
            size="lg"
            icon={<ScrollArrowRightIcon size={20} />}
            iconPlacement="end"
          >
            Find Dermatologists
          </Button>
        </div>
        <Image src={CatImage} alt="Cat" className="absolute top-0 right-0 bottom-0" />
        <Image src={DogImage} alt="Dog" className="absolute bottom-0 right-0" />
      </div>
    </SectionsWrapper>
  );
};

export default AdvertisementSection;
