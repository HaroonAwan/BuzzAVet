'use client';

import MainLayout from '@/layouts/MainLayout';
import RecommendedTeleMedicines from './sections/RecommendedTeleMedicines';
import NearYouTeleMedicines from './sections/NearYouTeleMedicines';

export default function Telemedicine() {
  return (
    <MainLayout>
      <RecommendedTeleMedicines />
      <NearYouTeleMedicines />
    </MainLayout>
  );
}
