'use client';

import MainLayout from '@/layouts/MainLayout';
import FavoriteVets from './sections/FavoriteVets';
import NearYouVets from './sections/NearYouVets';
import { selectIsAuthenticated } from '@/apis/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';

export default function Vets() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <MainLayout>
      {isAuthenticated && <FavoriteVets />}
      <NearYouVets />
    </MainLayout>
  );
}
