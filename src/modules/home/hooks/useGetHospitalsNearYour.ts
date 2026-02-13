import { useEffect } from 'react';
import { useGetHospitalsNearYouMutation } from '@/apis/hospitals/hospitalsApi';

export const useGetHospitalsNearYou = () => {
  const [getHospitalsNearYou, { data, error, isLoading }] = useGetHospitalsNearYouMutation();

  useEffect(() => {
    getHospitalsNearYou({ QUERY: { page: 1, perPage: 10 }, BODY: {} });
  }, [getHospitalsNearYou]);

  return {
    nearYouHospitals: {
      getHospitalsNearYou,
      hospitalsData: data,
      hospitalsError: error,
      hospitalsIsLoading: isLoading,
    },
  };
};
