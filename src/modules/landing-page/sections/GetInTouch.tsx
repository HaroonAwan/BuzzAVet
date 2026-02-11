import SectionsWrapper from '@/layouts/SectionsWrapper';
import { theme } from '@/lib/theme';
import Image from 'next/image';
import EmailIcon from '@/assets/images/landing-page/email.svg';
import PhoneIcon from '@/assets/images/landing-page/call.svg';
import LocationIcon from '@/assets/images/landing-page/visit.svg';
import { FormInput } from '@/components/form-inputs/Input';
import { useGetInTouch } from '../hooks/useGetInTouch';
import { PhoneNumberInput } from '@/components/form-inputs/PhoneNumberInput';
import { Button } from '@/components/shared/Button';

const GetInTouch = () => {
  const { control, handleSubmit, errors } = useGetInTouch();
  return (
    <SectionsWrapper noContainer className="bg-[#F9FAFB]">
      <div className="flex flex-col gap-10 sm:gap-20 md:flex-row">
        <div className="flex flex-col justify-start">
          <div className="mb-8 flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold" style={{ color: theme.colors.background.range }}>
                Get in Touch
              </h1>
              <h1 className="thirty-six leading-tight font-semibold">We'd Love to Hear From You</h1>
            </div>
            <p style={{ color: theme.colors.text.secondary }}>
              Have questions or need assistance? Our friendly team is here to help. Reach out to us
              through any of the channels below.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--range)">
                <Image src={EmailIcon} alt="icon" width={24} height={24} />
              </div>
              <p className="flex flex-col font-semibold">
                Email Us
                <span className="text-sm font-normal" style={{ color: theme.colors.text.tertiary }}>
                  support@buzzavet.com
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--range)">
                <Image src={PhoneIcon} alt="icon" width={24} height={24} />
              </div>
              <p className="flex flex-col font-semibold">
                Call Us
                <span className="text-sm font-normal" style={{ color: theme.colors.text.tertiary }}>
                  1-800-BUZZ-VET (24/7)
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--range)">
                <Image src={LocationIcon} alt="icon" width={24} height={24} />
              </div>
              <p className="flex flex-col font-semibold">
                Visit Us
                <span className="text-sm font-normal" style={{ color: theme.colors.text.tertiary }}>
                  123 Pet Care Avenue
                </span>
                <span className="text-sm font-normal" style={{ color: theme.colors.text.tertiary }}>
                  Toronto, ON M5V 3A8, Canada
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="SHADOW flex shrink-0 items-start justify-start overflow-hidden rounded-3xl bg-white md:w-[47%]">
          <form className="flex flex-col gap-5 p-8" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <FormInput
                control={control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
              />
              <FormInput
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
            </div>
            <FormInput
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <PhoneNumberInput
              control={control}
              name="phoneNumber"
              label="Phone Number"
              defaultCountry="PK"
            />
            <FormInput
              control={control}
              name="message"
              label="Message"
              type="textarea"
              placeholder="How can we help you?"
            />
            <Button type="submit" variant="submit" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </SectionsWrapper>
  );
};

export default GetInTouch;
