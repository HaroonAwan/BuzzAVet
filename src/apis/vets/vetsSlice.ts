import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface VetsState {
  // Add your state properties here
}

const initialState: VetsState = {
  // Initialize your state here
};

export const vetsSlice = createSlice({
  name: 'vets',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setSomething: (state, action: PayloadAction<any>) => {
    //   state.something = action.payload;
    // },
  },
});

export const {} = vetsSlice.actions;

export const selectVets = (state: RootState) => state.vets;

export default vetsSlice.reducer;
