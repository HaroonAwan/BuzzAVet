import { useGetHospitalsNearYouQuery } from '@/apis/hospitals/hospitalsApi';

export const useGetHospitalsNearYou = (query?: { QUERY: any; BODY: any }) => {
  const { data, error, isLoading } = useGetHospitalsNearYouQuery(
    query || { QUERY: { page: 1, perPage: 10 }, BODY: {} }
  );

  return {
    nearYouHospitals: {
      hospitalsData: data,
      hospitalsError: error,
      hospitalsIsLoading: isLoading,
    },
  };
};
