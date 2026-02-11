import SectionsWrapper from '@/layouts/SectionsWrapper';
import { theme } from '@/lib/theme';
import Image from 'next/image';
import VetImage from '@/assets/images/landing-page/vet.png';
import TickIcon from '@/assets/images/landing-page/tick.svg';
import { Button } from '@/components/shared/Button';

const LetsGetStarted = () => {
  return (
    <SectionsWrapper>
      <div className="flex flex-col gap-10 sm:gap-20 md:flex-row">
        <div className="flex flex-col justify-between py-7">
          <div className="flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-3">
              <h1 className="thirty-six leading-tight font-semibold">
                Ready to Give Your Pet the Best Care?
              </h1>
            </div>
            <p style={{ color: theme.colors.text.secondary }}>
              Join thousands of pet owners who trust BuzzaVet for comprehensive veterinary care.
              Sign up today and get your first consultation free!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-(--range)!">Let’s Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
          <div className="flex gap-6 text-sm" style={{ color: theme.colors.text.secondary }}>
            <div className="flex gap-1.5">
              <Image src={TickIcon} alt="Tick Icon" />
              <p>Free first consultation</p>
            </div>
            <div className="flex gap-1.5">
              <Image src={TickIcon} alt="Tick Icon" />
              <p>Licensed Vets</p>
            </div>
            <div className="flex gap-1.5">
              <Image src={TickIcon} alt="Tick Icon" />
              <p>Available Support</p>
            </div>
          </div>
        </div>
        <div className="flex h-100 shrink-0 items-center justify-center overflow-hidden rounded-3xl md:w-[47%]">
          <Image
            src={VetImage}
            alt="About BuzzAVet"
            width={630}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </SectionsWrapper>
  );
};

export default LetsGetStarted;
