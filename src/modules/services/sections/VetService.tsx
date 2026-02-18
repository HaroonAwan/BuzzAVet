import React from 'react';
import BackButton from '@/components/shared/BackButton';
import { SlugProps } from './HospitalService';
import VetsHeaderSection from './(vets)/VetsHeaderSection';
import VetsContent from './(vets)/VetsContent';

const VetService = ({ slug }: SlugProps) => {
  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex flex-col gap-6">
        <VetsHeaderSection />
        <VetsContent slug={slug} />
      </div>
    </div>
  );
};

export default VetService;
