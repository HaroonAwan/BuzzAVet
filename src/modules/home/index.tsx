'use client';

import MainLayout from '@/layouts/MainLayout';
import Hero from './sections/Hero';
import UpcomingAppointmentsSection from './sections/UpcomingAppointmentsSection';
import ExploreCategoriesSection from './sections/ExploreCategoriesSection';
import GuestFavouritePetServices from './sections/GuestFavouritePetServices';
import RecommendedHospitalsSection from './sections/RecommendedHospitalsSection';
import TopRatedTelemedicineSection from './sections/TopRatedTelemedicineSection';
import AdvertisementSection from './sections/AdvertisementSection';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <UpcomingAppointmentsSection />
      <RecommendedHospitalsSection />
      <ExploreCategoriesSection />
      <TopRatedTelemedicineSection />
      <AdvertisementSection />
      <GuestFavouritePetServices />
    </MainLayout>
  );
}
