'use client';

import MainLayout from '@/layouts/MainLayout';
import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import HospitalService from './sections/HospitalService';
import TelemedicineService from './sections/TelemedicineService';

interface ViewDetailedServicesProps {
  slug: { slug: string; name: string };
}

export default function Services({ slug }: ViewDetailedServicesProps) {
  console.log('🚀 ~ Services ~ slug:', slug);
  return (
    <MainLayout>
      <ContentBodyWrapper>
        {slug.slug === 'hospitals' && <HospitalService slug={slug} />}
        {slug.slug === 'telemedicine' && <TelemedicineService slug={slug} />}
      </ContentBodyWrapper>
    </MainLayout>
  );
}
