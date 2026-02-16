import React from 'react';
import BackButton from '@/components/shared/BackButton';
import { SlugProps } from './HospitalService';
import TelemedicinesHeaderSection from './(telemedicines)/TelemedicinesHeaderSection';
import TelemedicineContent from './(telemedicines)/TelemedicineContent';

const TelemedicineService = ({ slug }: SlugProps) => {
  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex flex-col gap-6">
        <TelemedicinesHeaderSection />
        <TelemedicineContent slug={slug} />
      </div>
    </div>
  );
};

export default TelemedicineService;
