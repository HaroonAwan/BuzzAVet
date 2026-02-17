import { PROFILE_INITIATION_PAYLOAD } from './onboarding';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  fcmTokens: string[];
  portalType: string;
  role: string;
  savedShifts: any[];
  timeZone: string;
  stripeCusId?: string;
  status: string;
  stConnectAccountComplete: boolean;
  isVerified: boolean;
  ratings: number;
  noOfTotalReviews: number;
  fromGoogle: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  verificationEmailSentAt: string | null;
  profile?: PROFILE_INITIATION_PAYLOAD;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  portalType: string;
  email: string | null;
  isVerified: boolean;
  refreshToken: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
  portalType: string;
  timeZone: string;
}

export interface LoginResponse {
  portalType: string;
  accessToken: string;
  isVerified: boolean;
  profile: User | null;
  email: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  portalType: string;
  role: string;
  timeZone: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  portalType: string;
  accessToken: string;
  isVerified: boolean;
  email: string;
}

export interface CheckAccountValidityResponse {
  isVerified: boolean;
}

export interface OtpVerificationResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export interface ResendOtpResponse {
  statusCode: number;
  message: string;
  error?: string;
}
