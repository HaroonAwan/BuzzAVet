import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { logout } from '@/apis/auth/authSlice';
import { PET_TYPE_TYPES, PET_GENDER_TYPES, SOURCES_TYPES } from '@/lib/enums';

interface Step1Data {
  termsAccepted: boolean;
  medicalDataConsent: boolean;
}

interface Step2Data {
  selectedService: SOURCES_TYPES[];
}

interface Step3Data {
  petName: string;
  petType: PET_TYPE_TYPES | null;
  breed: string;
  gender: PET_GENDER_TYPES | null;
  age: number | null;
  weight: number | null;
  photo?: string | null;
  photoData?: {
    id: string;
    path: string;
    fileName: string;
    fileSize: number;
  };
}

interface Step4Data {
  enableMedicalHistory: boolean;
  allergies: string[];
  chronicConditions: string[];
  previousDiagnosis: string[];
  documents: string[];
}

interface OnBoardingState {
  profileId: string | null;
  step1Completed: boolean;
  step2Completed: boolean;
  step3Completed: boolean;
  step4Completed: boolean;
  currentStep: number;
  step1Data: Step1Data | null;
  step2Data: Step2Data | null;
  step3Data: Step3Data | null;
  step4Data: Step4Data | null;
  step3IsUploading: boolean;
  step4IsUploading: boolean;
}

const initialState: OnBoardingState = {
  profileId: null,
  step1Completed: false,
  step2Completed: false,
  step3Completed: false,
  step4Completed: false,
  currentStep: 1,
  step1Data: null,
  step2Data: null,
  step3Data: null,
  step4Data: null,
  step3IsUploading: false,
  step4IsUploading: false,
};

export const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState,
  reducers: {
    setProfileId: (state, action: PayloadAction<string>) => {
      state.profileId = action.payload;
    },
    setStep1Completed: (state, action: PayloadAction<boolean>) => {
      state.step1Completed = action.payload;
    },
    setStep2Completed: (state, action: PayloadAction<boolean>) => {
      state.step2Completed = action.payload;
    },
    setStep3Completed: (state, action: PayloadAction<boolean>) => {
      state.step3Completed = action.payload;
    },
    setStep4Completed: (state, action: PayloadAction<boolean>) => {
      state.step4Completed = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStep1Data: (state, action: PayloadAction<Step1Data>) => {
      state.step1Data = action.payload;
    },
    setStep2Data: (state, action: PayloadAction<Step2Data>) => {
      state.step2Data = action.payload;
    },
    setStep3Data: (state, action: PayloadAction<Step3Data>) => {
      state.step3Data = action.payload;
    },
    setStep4Data: (state, action: PayloadAction<Step4Data>) => {
      state.step4Data = action.payload;
    },
    setStep3IsUploading: (state, action: PayloadAction<boolean>) => {
      state.step3IsUploading = action.payload;
    },
    setStep4IsUploading: (state, action: PayloadAction<boolean>) => {
      state.step4IsUploading = action.payload;
    },
    resetOnboarding: (state) => {
      state.profileId = null;
      state.step1Completed = false;
      state.step2Completed = false;
      state.step3Completed = false;
      state.step4Completed = false;
      state.currentStep = 1;
      state.step1Data = null;
      state.step2Data = null;
      state.step3Data = null;
      state.step4Data = null;
      state.step3IsUploading = false;
      state.step4IsUploading = false;
    },
  },
  extraReducers: (builder) => {
    // Reset onboarding state on logout
    builder.addCase(logout, (state) => {
      state.profileId = null;
      state.step1Completed = false;
      state.step2Completed = false;
      state.step3Completed = false;
      state.step4Completed = false;
      state.currentStep = 1;
      state.step1Data = null;
      state.step2Data = null;
      state.step3Data = null;
      state.step4Data = null;
      state.step3IsUploading = false;
      state.step4IsUploading = false;
    });
  },
});

export const {
  setProfileId,
  setStep1Completed,
  setStep2Completed,
  setStep3Completed,
  setStep4Completed,
  setCurrentStep,
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setStep4Data,
  setStep3IsUploading,
  setStep4IsUploading,
  resetOnboarding,
} = onBoardingSlice.actions;

export const selectOnBoarding = (state: RootState) => state.onBoarding;
export const selectProfileId = (state: RootState) => state.onBoarding.profileId;
export const selectStep1Data = (state: RootState) => state.onBoarding.step1Data;
export const selectStep2Data = (state: RootState) => state.onBoarding.step2Data;
export const selectStep3Data = (state: RootState) => state.onBoarding.step3Data;
export const selectStep4Data = (state: RootState) => state.onBoarding.step4Data;
export const selectStep3IsUploading = (state: RootState) => state.onBoarding.step3IsUploading;
export const selectStep4IsUploading = (state: RootState) => state.onBoarding.step4IsUploading;

export default onBoardingSlice.reducer;
