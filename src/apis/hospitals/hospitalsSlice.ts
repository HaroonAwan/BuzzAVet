import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface HospitalsState {
  // Add your state properties here
}

const initialState: HospitalsState = {
  // Initialize your state here
};

export const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setSomething: (state, action: PayloadAction<any>) => {
    //   state.something = action.payload;
    // },
  },
});

export const {} = hospitalsSlice.actions;

export const selectHospitals = (state: RootState) => state.hospitals;

export default hospitalsSlice.reducer;
