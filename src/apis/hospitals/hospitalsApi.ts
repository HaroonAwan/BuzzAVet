import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import type {
  HospitalsNearYouQuery,
  HospitalsNearYouBody,
  HospitalsNearYouResponse,
  HospitalDetailsResponse,
  HospitalDetailsQuery,
} from '@/types/hospitalsTypes';

const { NEAR_YOU, HOSPITAL_DETAILS } = ApiEndpoints.HOSPITALS;

export const hospitalsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitalsNearYou: builder.query<
      HospitalsNearYouResponse,
      { QUERY: HospitalsNearYouQuery; BODY: HospitalsNearYouBody }
    >({
      query: ({ QUERY, BODY }) => ({
        url: NEAR_YOU(QUERY),
        method: 'POST',
        body: BODY,
      }),
    }),
    getHospitalDetails: builder.query<
      HospitalDetailsResponse,
      { hospitalId: string; QUERY: HospitalDetailsQuery }
    >({
      query: ({ hospitalId, QUERY }) => ({
        url: HOSPITAL_DETAILS(hospitalId, QUERY),
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetHospitalsNearYouQuery, useGetHospitalDetailsQuery } = hospitalsApi;
