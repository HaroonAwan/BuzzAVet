/**
 * Centralized reducer exports
 * Import and export all slice reducers here
 */

import authReducer from '@apis/auth/authSlice';
import onBoardingReducer from '@apis/onBoarding/onBoardingSlice';
import fileUploadReducer from '@apis/fileUpload/fileUploadSlice';
import hospitalsReducer from '@apis/hospitals/hospitalsSlice';

export const reducers = {
  auth: authReducer,
  onBoarding: onBoardingReducer,
  fileUpload: fileUploadReducer,
  hospitals: hospitalsReducer,
};
