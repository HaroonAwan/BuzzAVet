import { useGetHospitalDetailsQuery } from '@/apis/hospitals/hospitalsApi';
import { SlugProps } from '../sections/HospitalService';
import toast from 'react-hot-toast';
import { useToggleFavoriteMutation } from '@/apis/favorite/favoriteApi';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';
import { useCallback, useEffect, useState } from 'react';

export const useGetHospitalDetails = ({ slug }: SlugProps) => {
  const hospitalId = slug.name;
  const [toggleFavorite, { isLoading: isTogglingFavorite }] = useToggleFavoriteMutation();

  const { data, error, isLoading } = useGetHospitalDetailsQuery(
    {
      hospitalId,
      QUERY: {
        withVets: false,
        withVetProfiles: false,
        withReviews: true,
        withReviewers: true,
      },
    },
    { skip: !hospitalId }
  );

  // Local favorite state for optimistic UI
  const [favorite, setFavorite] = useState<boolean | undefined>(data?.isFavorite);
  useEffect(() => {
    setFavorite(data?.isFavorite);
  }, [data?.isFavorite]);

  const handleFavoriteToggle = useCallback(async () => {
    if (!data?._id) return;
    const optimistic = !(favorite ?? data.isFavorite);
    setFavorite(optimistic);
    try {
      await toggleFavorite({
        itemType: FAVORITE_ITEM_TYPE.HOSPITAL,
        item: data._id,
      }).unwrap();
    } catch (e) {
      toast.error('Failed to update favorite. Please try again.');
      setFavorite(!optimistic);
    }
  }, [data, favorite, toggleFavorite]);

  return {
    hospital: data,
    isLoading,
    error,
    isTogglingFavorite,
    favorite: favorite ?? data?.isFavorite,
    handleFavoriteToggle,
  };
};
