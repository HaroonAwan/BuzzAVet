import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';
import { FavoritesQuery } from '@/types/hospitalsTypes';

const { TOGGLE, LIST_BY_TYPE } = ApiEndpoints.FAVORITE;

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation({
      query: (payload: { item: string; itemType: FAVORITE_ITEM_TYPE }) => ({
        url: TOGGLE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Favorite', itemType: arg.itemType }],
    }),
    getFavoritesByType: builder.query({
      query: (itemType: FavoritesQuery) => {
        return {
          url: LIST_BY_TYPE(itemType),
          method: 'GET',
          params: {
            withPopulate: 'true',
          },
        };
      },
      providesTags: (result, error, arg) => [{ type: 'Favorite', itemType: arg.itemType }],
    }),
  }),
});

export const { useToggleFavoriteMutation, useGetFavoritesByTypeQuery } = favoriteApi;
