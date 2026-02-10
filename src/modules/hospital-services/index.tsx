'use client';

import MainLayout from '@/layouts/MainLayout';
import BackButton from '@/components/shared/BackButton';
import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import React from 'react';
import HospitalHeaderSection from './sections/HospitalHeaderSection';
import HospitalContent from './sections/HospitalContent';

interface ViewDetailedHospitalProps {
  slug: { slug: string; name: string };
}

export default function HospitalServices({ slug }: ViewDetailedHospitalProps) {
  console.log('🚀 ~ HospitalServices ~ slug:', slug);
  return (
    <MainLayout>
      <ContentBodyWrapper>
        <div className="flex flex-col gap-6">
          <BackButton />
          <div className="flex flex-col gap-6">
            <HospitalHeaderSection />
            <HospitalContent slug={slug} />
          </div>
        </div>
      </ContentBodyWrapper>
    </MainLayout>
  );
}
