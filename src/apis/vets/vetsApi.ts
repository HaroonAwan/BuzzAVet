import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import { VetsNearYouBody, VetsNearYouQuery, VetsResponse } from '@/types/vetsTypes';

const { NEAR_YOU } = ApiEndpoints.VETS;

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
  }),
});

export const { useGetVetsNearYouQuery } = vetsApi;
