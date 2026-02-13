import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import type {
  HospitalsNearYouQuery,
  HospitalsNearYouBody,
  HospitalsNearYouResponse,
} from '@/types/hospitalsTypes';

const { NEAR_YOU } = ApiEndpoints.HOSPITALS;

export const hospitalsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitalsNearYou: builder.mutation<
      HospitalsNearYouResponse,
      { QUERY: HospitalsNearYouQuery; BODY: HospitalsNearYouBody }
    >({
      query: ({ QUERY, BODY }) => ({
        url: NEAR_YOU(QUERY),
        method: 'POST',
        body: BODY,
      }),
    }),
  }),
});

export const { useGetHospitalsNearYouMutation } = hospitalsApi;
