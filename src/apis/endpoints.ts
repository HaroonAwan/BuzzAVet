export const ApiEndpoints = {
  AUTH: {
    REGISTER: '/auth/sign-up',
    LOGIN: '/auth/sign-in',
    VALIDITY_CHECK: (email: string) => `/people/check-account-validity/${email}`,
    RESEND_OTP: '/auth/resend-email',
    VERIFY_OTP: (OTP: string) => `/auth/verify-account/${OTP}`,
  },
  USER: {
    USER: (withPopulate = false) => `/auth/profile${withPopulate ? '?withPopulate=true' : ''}`,
  },
  ON_BOARDING: {
    PROFILE_INITIATION: '/profiles',
    PROFILE_PATCH: (profileId: string) => `/profiles/${profileId}`,
    PET_ONBOARDING: '/customer/pets',
  },
  FILE: {
    UPLOAD: '/storage/save',
  },
  FILE_UPLOAD: {},
};
