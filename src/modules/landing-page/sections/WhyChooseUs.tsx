import SectionsWrapper from '@/layouts/SectionsWrapper';
import InfoWrapper from '../layouts/InfoWrapper';
import { theme } from '@/lib/theme';
import Image from 'next/image';
import UserIcon from '@/assets/images/landing-page/user.svg';
import ClockIcon from '@/assets/images/landing-page/clock.svg';
import StarIcon from '@/assets/images/landing-page/star.svg';

const features = [
  {
    icon: UserIcon,
    title: 'Licensed Professionals',
    description:
      'All our veterinarians are licensed, experienced, and passionate about animal care.',
  },
  {
    icon: ClockIcon,
    title: '24/7 Availability',
    description: 'Round-the-clock access to veterinary care whenever your pet needs it most.',
  },
  {
    icon: StarIcon,
    title: 'Highly Rated',
    description: 'Trusted by thousands of pet owners with a 4.9-star rating across all platforms.',
  },
  {
    icon: UserIcon,
    title: 'Affordable Care',
    description: 'Quality veterinary services at competitive prices with flexible payment options.',
  },
  {
    icon: ClockIcon,
    title: 'Advanced Technology',
    description: 'State-of-the-art equipment and telemedicine capabilities for modern pet care.',
  },
  {
    icon: StarIcon,
    title: 'Compassionate Team',
    description: 'We treat every pet like family with personalized, empathetic care.',
  },
];

const WhyChooseUs = () => {
  return (
    <SectionsWrapper>
      <InfoWrapper
        sectionTitle="Why Choose Us"
        title="The Best Care for Your Furry Friends"
        subTitle="We combine expertise, technology, and compassion to deliver exceptional veterinary care that you and your pets deserve."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-left p-8 bg-white rounded-2xl"
            >
              <div className="mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.background.range }}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: theme.colors.text.default }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.colors.text.tertiary }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </InfoWrapper>
    </SectionsWrapper>
  );
};

export default WhyChooseUs;
