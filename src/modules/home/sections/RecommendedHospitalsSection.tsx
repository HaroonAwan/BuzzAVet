'use client';

import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import {
  HospitalOrPetServicesCard,
  HospitalOrPetServicesCardProps,
} from '../layouts/HospitalOrPetServicesCard';
import SectionsWrapper from '../../../layouts/SectionsWrapper';
import { useGetHospitalsNearYou } from '../hooks/useGetHospitalsNearYour';
import type { HospitalsNearYouQuery, HospitalsNearYouBody, Hospital } from '@/types/hospitalsTypes';

interface RecommendedHospitalsSectionProps {
  query?: HospitalsNearYouQuery;
  body?: HospitalsNearYouBody;
}

const mapHospitalToCard = (hospital: Hospital): HospitalOrPetServicesCardProps => {
  // Extract safe fields for display
  const name = hospital.basicInformation?.name || hospital.name || 'Unknown Hospital';
  const address =
    hospital.basicInformation?.address?.formatted ||
    hospital.basicInformation?.address?.addressLine1 ||
    hospital.basicInformation?.address ||
    hospital.address ||
    '';
  const rating = hospital.ratings || hospital.rating || 0;
  const price = hospital.price || 0;
  const imageSrc = hospital.documents?.profilePicture?.url || hospital.image || hospital.imageSrc;
  // Only pass strings/numbers, never objects
  return {
    name,
    location: typeof address === 'string' ? address : '',
    rating: typeof rating === 'number' ? rating : 0,
    price: typeof price === 'number' ? price : 0,
    favorite: hospital.isFavorite || false,
    imageSrc,
    chips: [],
    id: hospital._id || hospital.id,
  };
};

const RecommendedHospitalsSection: React.FC<RecommendedHospitalsSectionProps> = ({
  query,
  body,
}) => {
  const { nearYouHospitals } = useGetHospitalsNearYou(
    query ? { QUERY: query, BODY: body || {} } : undefined
  );
  const { hospitalsData, hospitalsError, hospitalsIsLoading } = nearYouHospitals;

  const [hospitals, setHospitals] = useState<HospitalOrPetServicesCardProps[]>([]);

  useEffect(() => {
    if (hospitalsData?.data) {
      // eslint-disable-next-line no-console
      console.log('First hospital object:', hospitalsData.data[0]);
      const mappedHospitals = hospitalsData.data.map(mapHospitalToCard);
      setHospitals(mappedHospitals);
    }
  }, [hospitalsData]);

  const handleFavoriteToggle = (index: number, favorite: boolean) => {
    setHospitals((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], favorite };
      return updated;
    });
  };

  return (
    <SectionsWrapper>
      <ScrollableSection title="Recommended Hospitals Near you">
        {hospitalsError ? (
          <p className="text-red-500">Error loading hospitals: {hospitalsError.message}</p>
        ) : hospitalsIsLoading ? (
          <Skeleton className="rounded-xl" style={{ width: '100%', height: 305 }} />
        ) : !hospitalsIsLoading && hospitals.length === 0 ? (
          <p>No hospitals found near you.</p>
        ) : (
          hospitals.map((hospital, index) => (
            <HospitalOrPetServicesCard
              key={`${hospital.name}-${index}`}
              {...hospital}
              onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
            />
          ))
        )}
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default RecommendedHospitalsSection;
