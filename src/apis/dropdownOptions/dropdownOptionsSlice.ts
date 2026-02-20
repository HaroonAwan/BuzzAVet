import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface DropdownOptionsState {
  // Add your state properties here
}

const initialState: DropdownOptionsState = {
  // Initialize your state here
};

export const dropdownOptionsSlice = createSlice({
  name: 'dropdownOptions',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setSomething: (state, action: PayloadAction<any>) => {
    //   state.something = action.payload;
    // },
  },
});

export const {} = dropdownOptionsSlice.actions;

export const selectDropdownOptions = (state: RootState) => state.dropdownOptions;

export default dropdownOptionsSlice.reducer;
