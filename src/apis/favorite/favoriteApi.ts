import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';

const { TOGGLE } = ApiEndpoints.FAVORITE;

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation({
      query: (payload: { item: string; itemType: FAVORITE_ITEM_TYPE }) => ({
        url: TOGGLE,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useToggleFavoriteMutation } = favoriteApi;
