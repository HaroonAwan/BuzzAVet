'use client';

import MainLayout from '@/layouts/MainLayout';
import FavoriteVets from './sections/FavoriteVets';
import NearYouVets from './sections/NearYouVets';

export default function Vets() {
  return (
    <MainLayout>
      <FavoriteVets />
      <NearYouVets />
    </MainLayout>
  );
}
