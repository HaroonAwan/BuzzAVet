'use client';

import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { SlugProps } from '../services/sections/HospitalService';
import HospitalAppointmentSection from './sections/HospitalAppointmentSection';
import TelemedicineAppointmentSection from './sections/TelemedicineAppointmentSection';

export default function Appointment({ slug }: SlugProps) {
  console.log('🚀 ~ Appointment ~ slug:', slug);

  return (
    <MainLayout>
      <ContentBodyWrapper>
        {slug.slug === 'hospitals' && <HospitalAppointmentSection slug={slug} />}
        {slug.slug === 'telemedicine' && <TelemedicineAppointmentSection slug={slug} />}
      </ContentBodyWrapper>
    </MainLayout>
  );
}
