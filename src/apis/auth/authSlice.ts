import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types/auth';
import { RootState } from '@/lib/store';
import { resetOnboarding } from '@/apis/onBoarding/onBoardingSlice';

interface UserActions {
  user?: User | null;
  token?: string | null;
  accessToken?: string | null;
  portalType?: 'CUSTOMER';
  email?: string | null;
  isVerified?: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  portalType: 'CUSTOMER',
  email: null,
  isVerified: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserActions>) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.token || action.payload.accessToken) {
        state.token = action.payload.token || action.payload.accessToken || null;
      }
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      if (action.payload.isVerified !== undefined) {
        state.isVerified = action.payload.isVerified;
      }
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // Clear all auth-related cookies
      if (typeof document !== 'undefined') {
        document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Lax';
        document.cookie = 'is_verified=; path=/; max-age=0; SameSite=Lax';
        document.cookie = 'has_profile=; path=/; max-age=0; SameSite=Lax';
      }

      // Clear localStorage and sessionStorage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }

      // Reset state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.portalType = 'CUSTOMER';
      state.email = null;
      state.isVerified = false;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectPortalType = (state: RootState) => state.auth.portalType;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectIsVerified = (state: RootState) => state.auth.isVerified;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
