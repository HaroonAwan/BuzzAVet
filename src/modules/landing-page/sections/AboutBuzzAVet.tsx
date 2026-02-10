import SectionsWrapper from '@/layouts/SectionsWrapper';
import { theme } from '@/lib/theme';
import Image from 'next/image';
import React from 'react';

const AboutBuzzAVet = () => {
  return (
    <SectionsWrapper>
      <div className="flex gap-10 sm:gap-20 flex-col md:flex-row">
        <div className="flex items-center justify-center h-120 md:w-[47%] shrink-0 rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About BuzzAVet"
            width={620}
            height={480}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold" style={{ color: theme.colors.background.range }}>
                About BuzzAVet
              </h1>
              <h1 className="thirty-six font-semibold leading-tight">
                Your Pet's Health is Our Priority
              </h1>
            </div>
            <p style={{ color: theme.colors.text.secondary }}>
              At BuzzAVet, we're committed to providing comprehensive veterinary care that goes
              beyond the clinic. With our innovative platform, you can access licensed veterinarians
              whenever and wherever you need them.Whether it's a routine checkup, emergency care, or
              telemedicine consultation, our team of experienced veterinary professionals is here to
              ensure your pet receives the best possible care.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] font-bold leading-tight">10k+</h1>
              <p style={{ color: theme.colors.text.secondary }}>Happy Pets Treated</p>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] font-bold leading-tight">500+</h1>
              <p style={{ color: theme.colors.text.secondary }}>Licensed Vets</p>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] font-bold leading-tight">24/7</h1>
              <p style={{ color: theme.colors.text.secondary }}>Available Support</p>
            </div>
          </div>
        </div>
      </div>
    </SectionsWrapper>
  );
};

export default AboutBuzzAVet;
