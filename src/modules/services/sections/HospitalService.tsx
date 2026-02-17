import BackButton from '@/components/shared/BackButton';
import React from 'react';
import HospitalContent from './(hospital)/HospitalContent';
import HospitalHeaderSection from './(hospital)/HospitalHeaderSection';
import { useGetHospitalDetails } from '../hooks/useGetHospitalDetails';
import Error from '@/components/shared/states/Error';
import Loading from '@/components/shared/states/Loading';
import NoData from '@/components/shared/states/NoData';

export interface SlugProps {
  slug: { slug: string; name: string };
}

const HospitalService = ({ slug }: SlugProps) => {
  const { hospital, isLoading, error, handleFavoriteToggle, favorite } = useGetHospitalDetails({
    slug,
  });

  return error ? (
    <Error message="Failed to get Hospital details" />
  ) : isLoading ? (
    <Loading height={300} width={600} />
  ) : !hospital ? (
    <NoData message="Hospital details not available" />
  ) : (
    <div className="flex flex-col gap-6">
      <BackButton url="/hospitals" />
      <div className="flex flex-col gap-6">
        <HospitalHeaderSection
          hospital={hospital}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={favorite}
        />
        <HospitalContent slug={slug} hospital={hospital} />
      </div>
    </div>
  );
};

export default HospitalService;
