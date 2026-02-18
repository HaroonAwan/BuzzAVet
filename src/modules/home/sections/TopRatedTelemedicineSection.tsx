'use client';

import React, { useState, useEffect } from 'react';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import { TelemedicineCard, TelemedicineCardProps } from '../layouts/TelemedicineCard';
import { useToggleFavoriteMutation } from '@/apis/favorite/favoriteApi';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';
import SectionsWrapper from '../../../layouts/SectionsWrapper';
import { useVetsNearYou } from '../hooks/useVetsNearYou';
import ApiResponseWrapper from '@/components/shared/states/ApiResponseWrapper';

const TopRatedTelemedicineSection: React.FC = () => {
  const { NEAR_YOU_VETS } = useVetsNearYou();
  const vets = NEAR_YOU_VETS.VETS || [];
  console.log('🚀 ~ TopRatedTelemedicineSection ~ vets:', vets);

  const [toggleFavorite] = useToggleFavoriteMutation();
  const [telemedicineDoctors, setTelemedicineDoctors] = useState<TelemedicineCardProps[]>([]);

  useEffect(() => {
    if (vets.length > 0) {
      const mapped = vets.map((vet) => ({
        name: `Dr. ${vet.firstName} ${vet.lastName}`,
        specialization:
          vet.profile?.specialties?.certifiedVeterinarySpecialist?.[0] ||
          vet.profile?.areaOfExpertise?.typesOfProcedures?.[0] ||
          'General Practice',
        clinicName: vet.profile?.businessDetails?.name || 'Telemedicine',
        nextAvailable: 'See Profile',
        rating: vet.ratings || 0,
        fee:
          vet.profile?.telemedicine?.pricing?.per30MinPrice ||
          vet.profile?.telemedicine?.pricing?.per10MinPrice ||
          0,
        favorite: vet.isFavorite || false,
        imageSrc: vet.profile?.documents?.profilePhoto?.path || '',
        id: vet._id,
      }));
      setTelemedicineDoctors(mapped);
    }
  }, [vets]);

  const handleFavoriteToggle = async (index: number, favorite: boolean) => {
    setTelemedicineDoctors((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], favorite };
      return updated;
    });
    if (!telemedicineDoctors[index]?.id) return;
    try {
      await toggleFavorite({
        itemType: FAVORITE_ITEM_TYPE.PERSON,
        item: telemedicineDoctors[index].id!,
      }).unwrap();
    } catch (e) {
      setTelemedicineDoctors((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], favorite: !favorite };
        return updated;
      });
    }
  };

  return (
    <SectionsWrapper>
      <ScrollableSection title="Top Rated Telemedicine">
        <ApiResponseWrapper
          isLoading={NEAR_YOU_VETS.IS_VET_LOADING}
          hasError={!!NEAR_YOU_VETS.VETS_HAS_ERRORS}
          hasData={telemedicineDoctors.length > 0}
          loadingSize={{ width: 500, height: 200 }}
          errorSize={{ width: 500, height: 280 }}
          hasDataSize={{ width: 500, height: 320 }}
        >
          {telemedicineDoctors.map((doctor, index) => (
            <TelemedicineCard
              key={`${doctor.name}-${index}`}
              {...doctor}
              onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
            />
          ))}
        </ApiResponseWrapper>
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default TopRatedTelemedicineSection;
