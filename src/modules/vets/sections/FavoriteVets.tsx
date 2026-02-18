import { selectIsAuthenticated } from '@/apis/auth/authSlice';
import { useGetFavoritesByTypeQuery, useToggleFavoriteMutation } from '@/apis/favorite/favoriteApi';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import ApiResponseWrapper from '@/components/shared/states/ApiResponseWrapper';
import SectionsWrapper from '@/layouts/SectionsWrapper';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';
import { useAppSelector } from '@/lib/hooks';
import { TelemedicineCard, TelemedicineCardProps } from '@/modules/home/layouts/TelemedicineCard';
import { extractApiError } from '@/types/api';
import { useState, useMemo } from 'react';

const FavoriteVets = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const { data, isLoading, isError, refetch } = useGetFavoritesByTypeQuery(
    {
      itemType: FAVORITE_ITEM_TYPE.PERSON,
    },
    {
      skip: !isAuthenticated,
    }
  );

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toggleFavorite] = useToggleFavoriteMutation();
  const allowURLOnly = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const vetPersons: TelemedicineCardProps[] = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((fav: any) => {
      const vet = fav.item;
      const id = vet?._id;
      const name = `Dr. ${vet?.firstName || ''} ${vet?.lastName || ''}`.trim();
      return {
        id,
        name,
        specialization:
          vet?.profile?.specialties?.certifiedVeterinarySpecialist?.[0] ||
          vet?.profile?.areaOfExpertise?.typesOfProcedures?.[0] ||
          'General Practice',
        clinicName: vet?.profile?.businessDetails?.name || 'Telemedicine',
        nextAvailable: 'See Profile',
        rating: vet?.ratings || 0,
        fee:
          vet?.profile?.telemedicine?.pricing?.per30MinPrice ||
          vet?.profile?.telemedicine?.pricing?.per10MinPrice ||
          0,
        favorite: favorites[id] ?? true,
        imageSrc: allowURLOnly(fav?.profile?.documents?.profilePhoto?.path ?? vet.profilePicture)
          ? (fav?.profile?.documents?.profilePhoto?.path ?? vet.profilePicture)
          : '',
      };
    });
  }, [data, favorites]);

  const handleFavoriteToggle = async (index: number, favorite: boolean) => {
    const vet = vetPersons[index];
    const key = vet.id || vet.name;
    setFavorites((prev) => ({
      ...prev,
      [key]: favorite,
    }));
    if (!vet.id) return;
    try {
      await toggleFavorite({
        itemType: FAVORITE_ITEM_TYPE.PERSON,
        item: vet.id,
      }).unwrap();
      refetch();
    } catch (e) {
      setFavorites((prev) => ({
        ...prev,
        [key]: !favorite,
      }));
    }
  };

  const vetsIsLoading = isLoading;
  const vetsError = extractApiError(isError);
  if (!vetsIsLoading && vetPersons.length === 0 && !vetsError) return null;
  return (
    <SectionsWrapper noContainer className="bg-(--bg-teal)">
      <ScrollableSection className="container" title="Recommended By Dr. Alex / Favorites">
        <ApiResponseWrapper
          isLoading={vetsIsLoading}
          hasError={!!vetsError}
          hasData={vetPersons.length > 0}
          loadingSize={{ width: 300, height: 324 }}
          errorSize={{ width: 300, height: 200 }}
        >
          {vetPersons.map((doctor, index) => (
            <TelemedicineCard
              key={`${doctor.id || doctor.name}-${index}`}
              {...doctor}
              onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
            />
          ))}
        </ApiResponseWrapper>
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default FavoriteVets;
