import {
  FavoritesQuery,
  HospitalDetailsQuery,
  HospitalsNearYouQuery,
} from '@/types/hospitalsTypes';
import { VetsNearYouQuery } from '@/types/vetsTypes';

export const ApiEndpoints = {
  AUTH: {
    REGISTER: '/auth/sign-up',
    LOGIN: '/auth/sign-in',
    VALIDITY_CHECK: (email: string) => `/people/check-account-validity/${email}`,
    RESEND_OTP: '/auth/resend-email',
    VERIFY_OTP: (OTP: string) => `/auth/verify-account/${OTP}`,
    REFRESH_TOKEN: '/auth/regenerate-tokens',
  },
  USER: {
    USER: (withPopulate = false) => `/auth/profile${withPopulate ? '?withPopulate=true' : ''}`,
  },
  ON_BOARDING: {
    PROFILE_INITIATION: '/profiles',
    PROFILE_PATCH: (profileId: string) => `/profiles/${profileId}`,
    PET_ONBOARDING: '/customer/pets',
  },
  FILE_UPLOAD: {
    UPLOAD: '/storage/save',
  },
  HOSPITALS: {
    NEAR_YOU: (QUERY: HospitalsNearYouQuery) => {
      const params = new URLSearchParams();
      if (QUERY) {
        Object.entries(QUERY).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
      }
      const qs = params.toString();
      return `/customer/hospitals/near${qs ? `?${qs}` : ''}`;
    },
    HOSPITAL_DETAILS: (hospitalId: string, QUERY: HospitalDetailsQuery) => {
      const params = new URLSearchParams();
      if (QUERY) {
        Object.entries(QUERY).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
      }
      const qs = params.toString();
      return `/customer/hospital/${hospitalId}${qs ? `?${qs}` : ''}`;
    },
  },
  FAVORITE: {
    TOGGLE: '/customer/favorites/toggle',
    LIST_BY_TYPE: (QUERY: FavoritesQuery) => {
      const params = new URLSearchParams();
      if (QUERY) {
        Object.entries(QUERY).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
      }
      const qs = params.toString();
      return `/customer/favorites?${qs}`;
    },
  },
  VETS: {
    NEAR_YOU: (QUERY: VetsNearYouQuery) => {
      const params = new URLSearchParams();
      if (QUERY) {
        Object.entries(QUERY).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
      }
      const qs = params.toString();
      return `/customer/people/near${qs ? `?${qs}` : ''}`;
    },
    GET_DETAILS: (vetId: string) => {
      return `/customer/people/${vetId}`;
    },
  },
};
