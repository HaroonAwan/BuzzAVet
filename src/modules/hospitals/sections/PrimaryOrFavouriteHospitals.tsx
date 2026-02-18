import { selectIsAuthenticated } from '@/apis/auth/authSlice';
import { useGetFavoritesByTypeQuery, useToggleFavoriteMutation } from '@/apis/favorite/favoriteApi';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import ApiResponseWrapper from '@/components/shared/states/ApiResponseWrapper';
import SectionsWrapper from '@/layouts/SectionsWrapper';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';
import { useAppSelector } from '@/lib/hooks';
import {
  HospitalOrPetServicesCard,
  HospitalOrPetServicesCardProps,
} from '@/modules/home/layouts/HospitalOrPetServicesCard';
import { extractApiError } from '@/types/api';

import { useState, useMemo } from 'react';

const PrimaryOrFavouriteHospitals = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const { data, isLoading, isError, refetch } = useGetFavoritesByTypeQuery(
    {
      itemType: FAVORITE_ITEM_TYPE.HOSPITAL,
    },
    {
      skip: !isAuthenticated,
    }
  );

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toggleFavorite] = useToggleFavoriteMutation();

  const hospitals: HospitalOrPetServicesCardProps[] = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((fav) => {
      const hospital = fav.item;
      const id = hospital?._id;
      const name = hospital?.basicInformation?.name || '';
      const chips: HospitalOrPetServicesCardProps['chips'] = [];
      if (Array.isArray(hospital?.preferences?.appointmentConsistOf)) {
        if (hospital.preferences.appointmentConsistOf.includes('emergency')) {
          chips.push({ label: '24/7 Emergency', variant: 'warning' });
        }
        if (hospital.preferences.appointmentConsistOf.includes('openNow')) {
          chips.push({ label: 'Open Now', variant: 'success' });
        }
      }
      const favoriteKey = id || name;
      return {
        _id: id,
        name,
        location:
          hospital?.basicInformation?.address?.address ||
          hospital?.basicInformation?.address?.city ||
          '',
        rating: hospital?.ratings ?? 0,
        price: hospital?.pricing?.basePrice ?? 0,
        favorite: favorites[favoriteKey] ?? true,
        imageSrc: hospital?.documents?.profilePicture?.path || '',
        chips,
      };
    });
  }, [data, favorites]);

  const handleFavoriteToggle = async (index: number, favorite: boolean) => {
    const hospital = hospitals[index];
    const key = hospital._id || hospital.name;
    setFavorites((prev) => ({
      ...prev,
      [key]: favorite,
    }));
    if (!hospital._id) return;
    try {
      await toggleFavorite({
        itemType: FAVORITE_ITEM_TYPE.HOSPITAL,
        item: hospital._id,
      }).unwrap();
      refetch();
    } catch (e) {
      setFavorites((prev) => ({
        ...prev,
        [key]: !favorite,
      }));
    }
  };

  const hospitalsIsLoading = isLoading;
  const hospitalsError = extractApiError(isError);
  if (!hospitalsIsLoading && hospitals.length === 0 && !hospitalsError) return null;
  return (
    <SectionsWrapper className="bg-(--bg-teal)">
      <ScrollableSection title="Primary/ Favorite Hospitals">
        <ApiResponseWrapper
          isLoading={hospitalsIsLoading}
          hasError={!!hospitalsError}
          hasData={hospitals.length > 0}
          loadingSize={{ width: 300, height: 324 }}
          errorSize={{ width: 300, height: 200 }}
        >
          {hospitals.map((hospital, index) => (
            <HospitalOrPetServicesCard
              key={`${hospital._id || hospital.name}-${index}`}
              {...hospital}
              onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
            />
          ))}
        </ApiResponseWrapper>
      </ScrollableSection>
    </SectionsWrapper>
  );
};
export default PrimaryOrFavouriteHospitals;
