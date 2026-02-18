import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import { VetApiResponse, VetsNearYouBody, VetsNearYouQuery, VetsResponse } from '@/types/vetsTypes';

const { NEAR_YOU, GET_DETAILS } = ApiEndpoints.VETS;

export const vetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVetsNearYou: builder.query<VetsResponse, { QUERY: VetsNearYouQuery; BODY: VetsNearYouBody }>(
      {
        query: ({ QUERY, BODY }) => ({
          url: NEAR_YOU(QUERY),
          method: 'POST',
          body: BODY,
        }),
      }
    ),
    getVetDetails: builder.query<VetApiResponse, string>({
      query: (vetId) => ({
        url: GET_DETAILS(vetId),
        method: 'GET',
        params: {
          withPopulate: 'true',
          withReviewers: 'true',
          withReviews: 'true',
        },
      }),
    }),
  }),
});

export const { useGetVetsNearYouQuery, useGetVetDetailsQuery } = vetsApi;
