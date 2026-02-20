/**
 * Centralized reducer exports
 * Import and export all slice reducers here
 */

import authReducer from '@apis/auth/authSlice';
import onBoardingReducer from '@apis/onBoarding/onBoardingSlice';
import fileUploadReducer from '@apis/fileUpload/fileUploadSlice';
import hospitalsReducer from '@apis/hospitals/hospitalsSlice';
import favoriteReducer from '@apis/favorite/favoriteSlice';
import vetsReducer from '@apis/vets/vetsSlice';
import dropdownOptionsReducer from '@apis/dropdownOptions/dropdownOptionsSlice';

export const reducers = {
  auth: authReducer,
  onBoarding: onBoardingReducer,
  fileUpload: fileUploadReducer,
  hospitals: hospitalsReducer,
  favorite: favoriteReducer,
  vets: vetsReducer,
  dropdownOptions: dropdownOptionsReducer,
};
