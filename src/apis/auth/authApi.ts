import { baseApi } from '@/apis/baseApi';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  CheckAccountValidityResponse,
  OtpVerificationResponse,
  ResendOtpResponse,
} from '@/types/auth';
import { ApiEndpoints } from '../endpoints';
import { setCredentials } from './authSlice';
import { COOKIE_MAX_AGE } from '@/constants';

const { REGISTER, VALIDITY_CHECK, RESEND_OTP, VERIFY_OTP, LOGIN } = ApiEndpoints.AUTH;
const { USER } = ApiEndpoints.USER;

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCurrentUser: builder.query<User, boolean>({
        query: (withPopulate) => USER(withPopulate),
        providesTags: ['Profile'],
        async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
          try {
            const { data: userData } = await queryFulfilled;
            dispatch(
              setCredentials({
                user: userData,
              })
            );

            if (typeof document !== 'undefined' && userData?.profile) {
              const profileId =
                typeof userData.profile === 'string' ? userData.profile : userData.profile._id;
              document.cookie = `has_profile=${profileId}; path=/; max-age=${
                COOKIE_MAX_AGE
              }; SameSite=Lax`;
              const onboardingStep =
                typeof userData.profile === 'string'
                  ? undefined
                  : userData.profile.onBoarding?.step;

              if (onboardingStep !== undefined) {
                document.cookie = `onboarding_step=${onboardingStep}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
              }
            }
          } catch (error) {
            console.error('Failed to update user data in Redux:', error);
          }
        },
      }),
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials) => ({
          url: LOGIN,
          method: 'POST',
          body: credentials,
        }),
      }),
      register: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (credentials) => ({
          url: REGISTER,
          method: 'POST',
          body: credentials,
        }),
      }),
      checkAccountValidity: builder.query<CheckAccountValidityResponse, string>({
        query: (email) => ({
          url: VALIDITY_CHECK(email),
          method: 'GET',
        }),
        providesTags: ['AccountValidity'],
      }),
      resendOtp: builder.query<ResendOtpResponse, void>({
        query: () => ({
          url: RESEND_OTP,
          method: 'GET',
        }),
      }),
      verifyOtp: builder.mutation<OtpVerificationResponse, string>({
        query: (OTP) => ({
          url: VERIFY_OTP(OTP),
          method: 'GET',
        }),
      }),
    };
  },
});

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useCheckAccountValidityQuery,
  useResendOtpQuery,
  useLazyResendOtpQuery,
  useVerifyOtpMutation,
} = authApi;
