'use client';

import MainLayout from '@/layouts/MainLayout';
import PrimaryOrFavouriteHospitals from './sections/PrimaryOrFavouriteHospitals';
import SearchedOrDefaultHospitalsNearYou from './sections/SearchedOrDefaultHospitalsNearYou';

export default function Hospitals() {
  return (
    <MainLayout>
      <PrimaryOrFavouriteHospitals />
      <SearchedOrDefaultHospitalsNearYou />
    </MainLayout>
  );
}
