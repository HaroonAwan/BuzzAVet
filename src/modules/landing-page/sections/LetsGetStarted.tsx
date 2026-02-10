import SectionsWrapper from '@/layouts/SectionsWrapper';
import { theme } from '@/lib/theme';
import Image from 'next/image';
import VetImage from '@/assets/images/landing-page/vet.png';
import TickIcon from '@/assets/images/landing-page/tick.svg';
import { Button } from '@/components/shared/Button';

const LetsGetStarted = () => {
  return (
    <SectionsWrapper>
      <div className="flex gap-10 sm:gap-20 flex-col md:flex-row">
        <div className="flex flex-col justify-between py-7">
          <div className="flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-3">
              <h1 className="thirty-six font-semibold leading-tight">
                Ready to Give Your Pet the Best Care?
              </h1>
            </div>
            <p style={{ color: theme.colors.text.secondary }}>
              Join thousands of pet owners who trust BuzzaVet for comprehensive veterinary care.
              Sign up today and get your first consultation free!
            </p>
          </div>
          <div className="flex gap-4 items-center">
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
        <div className="flex items-center justify-center h-100 md:w-[47%] shrink-0 rounded-3xl overflow-hidden">
          <Image
            src={VetImage}
            alt="About BuzzAVet"
            width={630}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </SectionsWrapper>
  );
};

export default LetsGetStarted;
