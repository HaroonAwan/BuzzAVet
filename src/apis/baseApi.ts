'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoints } from '@/apis/endpoints';
import { setCredentials, logout } from '@/apis/auth/authSlice';
// Do not import store at the top level to avoid circular dependency
import { getCookie, setCookie } from 'cookies-next';
import type { RootState } from '@/lib/store';
import { API_BASE_URL } from '@/constants';
import type { BaseQueryFn, BaseQueryResult, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import toast from 'react-hot-toast';

function performLogout() {
  const from = getCurrentPathWithQuery();
  toast.error('Session expired. Please log in again.');
  // Lazy import store to avoid circular dependency
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('@/lib/store');
  store.dispatch(logout());
  window.location.href = `/auth/login?from=${encodeURIComponent(from)}`;
}

export type ApiTagType = 'Auth' | 'User' | 'AccountValidity' | 'Favorite';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const tokenFromCookies = getCookie('auth_token') as string | undefined;
    const token = tokenFromCookies || (getState() as RootState).auth?.token;
    const portalType = (getState() as RootState).auth?.portalType;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (portalType) {
      headers.set('x-portal-type', portalType || 'CUSTOMER');
    }
    if (typeof window !== 'undefined') {
      const latitude = sessionStorage.getItem('x-latitude');
      const longitude = sessionStorage.getItem('x-longitude');
      if (latitude) {
        headers.set('x-latitude', latitude);
      }
      if (longitude) {
        headers.set('x-longitude', longitude);
      }
    }
    return headers;
  },
});

const refreshTokenAndRetry: BaseQueryFn<any, unknown, FetchBaseQueryError, unknown> = async (
  originalArgs: any,
  api: any,
  extraOptions: any
) => {
  const refreshToken = getCookie('refresh_token');
  if (!refreshToken) {
    performLogout();
    return { error: { status: 406, data: 'No refresh token' } };
  }
  try {
    const refreshBaseQuery = fetchBaseQuery({
      baseUrl: API_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const tokenFromCookies = getCookie('refresh_token') as string | undefined;
        const token = tokenFromCookies || (getState() as RootState)?.auth?.token;
        const portalType = (getState() as RootState)?.auth?.portalType;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        if (portalType) {
          headers.set('x-portal-type', portalType || 'CUSTOMER');
        }
        return headers;
      },
    });
    const refreshPayload = {
      url: ApiEndpoints.AUTH.REFRESH_TOKEN,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const refreshResult = await refreshBaseQuery(refreshPayload, api, extraOptions);
    if (refreshResult.data && (refreshResult as any).meta?.response?.status === 200) {
      const data = refreshResult.data as { accessToken: string; refreshToken: string };
      setCookie('auth_token', data.accessToken);
      setCookie('refresh_token', data.refreshToken);
      // Lazy import store to avoid circular dependency
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { store } = require('@/lib/store');
      store.dispatch(setCredentials({ token: data.accessToken, refreshToken: data.refreshToken }));
      let retriedArgs = {
        ...(typeof originalArgs === 'string' ? { url: originalArgs } : originalArgs),
      };
      retriedArgs.headers = {
        ...(retriedArgs.headers || {}),
        authorization: `Bearer ${data.accessToken}`,
      };
      const portalType = getCookie('portal_type') || 'CUSTOMER';
      retriedArgs.headers['x-portal-type'] = portalType;

      const retryResult = await rawBaseQuery(retriedArgs, api, extraOptions);

      return retryResult;
    } else if (
      (refreshResult as any).meta?.response?.status === 406 ||
      (refreshResult as any).meta?.response?.status === 401
    ) {
      performLogout();
      return {
        error: {
          status: (refreshResult as any).meta?.response?.status,
          data:
            (refreshResult as any).meta?.response?.status === 401
              ? 'Unauthorized refresh token'
              : 'Invalid or expired refresh token',
        },
      };
    }

    return {
      error: { status: (refreshResult as any).meta?.response?.status, data: refreshResult.error },
    };
  } catch (e) {
    console.error('[refreshTokenAndRetry] Exception during refresh:', e);
    performLogout();
    return { error: { status: 406, data: 'Refresh token failed' } };
  }
};

const baseQuery: BaseQueryFn<any, unknown, FetchBaseQueryError, unknown> = async (
  args: any,
  api: any,
  extraOptions: any
): Promise<BaseQueryResult<any>> => {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    result = (await refreshTokenAndRetry(args, api, extraOptions)) as typeof result;
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'AccountValidity', 'Profile', 'Favorite'] as ApiTagType[],
  endpoints: () => ({}),
});

// Helper to get current path for 'from' param
export function getCurrentPathWithQuery() {
  if (typeof window !== 'undefined') {
    return window.location.pathname + window.location.search;
  }
  return '/';
}

// Refactored logout navigation to include 'from' param
export function navigateToLoginWithFrom(from?: string) {
  const fromParam = from || getCurrentPathWithQuery();
  window.location.href = `/auth/login?from=${encodeURIComponent(fromParam)}`;
}

export function redirectToFromOrDefault(searchParams: URLSearchParams, defaultPath = '/') {
  const from = searchParams.get('from');
  window.location.href = from || defaultPath;
}
