import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface FileUploadState {
  // Add your state properties here
}

const initialState: FileUploadState = {
  // Initialize your state here
};

export const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setSomething: (state, action: PayloadAction<any>) => {
    //   state.something = action.payload;
    // },
  },
});

export const {} = fileUploadSlice.actions;

export const selectFileUpload = (state: RootState) => state.fileUpload;

export default fileUploadSlice.reducer;
