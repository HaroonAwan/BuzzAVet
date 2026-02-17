import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface FavoriteState {
  // Add your state properties here
}

const initialState: FavoriteState = {
  // Initialize your state here
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setSomething: (state, action: PayloadAction<any>) => {
    //   state.something = action.payload;
    // },
  },
});

export const {} = favoriteSlice.actions;

export const selectFavorite = (state: RootState) => state.favorite;

export default favoriteSlice.reducer;
