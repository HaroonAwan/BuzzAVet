import BackButton from '@/components/shared/BackButton';
import React from 'react';
import HospitalContent from './(hospital)/HospitalContent';
import HospitalHeaderSection from './(hospital)/HospitalHeaderSection';

export interface SlugProps {
  slug: { slug: string; name: string };
}

const HospitalService = ({ slug }: SlugProps) => {
  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex flex-col gap-6">
        <HospitalHeaderSection />
        <HospitalContent slug={slug} />
      </div>
    </div>
  );
};

export default HospitalService;
