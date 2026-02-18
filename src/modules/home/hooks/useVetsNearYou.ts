import { useGetVetsNearYouQuery } from '@/apis/vets/vetsApi';
import { SERVICE_TYPE } from '@/lib/enums';
import { extractApiError } from '@/types/api';
import { VetsNearYouBody, VetsNearYouQuery } from '@/types/vetsTypes';

const MILES = 500000000;
export const useVetsNearYou = (query?: { QUERY: VetsNearYouQuery; BODY: VetsNearYouBody }) => {
  const { data, isLoading, error } = useGetVetsNearYouQuery(
    query || {
      QUERY: {
        page: 1,
        perPage: 10,
        fetchTopRated: true,
        serviceType: SERVICE_TYPE.TELEMEDICINE,
        miles: MILES,
      },
      BODY: {},
    }
  );
  return {
    NEAR_YOU_VETS: {
      VETS: data?.data || [],
      IS_VET_LOADING: isLoading,
      VETS_HAS_ERRORS: extractApiError(error),
    },
  };
};
