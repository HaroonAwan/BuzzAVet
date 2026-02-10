import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import {
  PROFILE_INITIATION_PAYLOAD,
  PROFILE_INITIATION_RESPONSE,
  PetOnboardingPayload,
  PetOnboardingResponse,
} from '@/types/onboarding';
import type { User } from '@/types/auth';

const { PROFILE_INITIATION, PROFILE_PATCH, PET_ONBOARDING } = ApiEndpoints.ON_BOARDING;
const { USER } = ApiEndpoints.USER;

export const onBoardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateProfile: builder.mutation<PROFILE_INITIATION_RESPONSE, PROFILE_INITIATION_PAYLOAD>({
      query: (profileData) => ({
        url: PROFILE_INITIATION,
        method: 'POST',
        body: profileData,
      }),
    }),
    updateProfile: builder.mutation<
      PROFILE_INITIATION_RESPONSE,
      { profileId: string; profileData: Partial<PROFILE_INITIATION_PAYLOAD> }
    >({
      query: ({ profileId, profileData }) => ({
        url: PROFILE_PATCH(profileId),
        method: 'PATCH',
        body: profileData,
      }),
    }),
    createPet: builder.mutation<PetOnboardingResponse, PetOnboardingPayload>({
      query: (petData) => ({
        url: PET_ONBOARDING,
        method: 'POST',
        body: petData,
      }),
    }),
  }),
});

export const { useInitiateProfileMutation, useUpdateProfileMutation, useCreatePetMutation } =
  onBoardingApi;
