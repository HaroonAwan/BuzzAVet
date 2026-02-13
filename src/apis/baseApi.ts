'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';
import type { RootState } from '@/lib/store';
import { API_BASE_URL } from '@/constants';

export type ApiTagType = 'Auth' | 'User' | 'AccountValidity';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const tokenFromCookies = getCookie('auth_token') as string | undefined;
    const token = tokenFromCookies || (getState() as RootState).auth?.token;
    const portalType = (getState() as RootState).auth?.portalType;
    console.log('🚀 ~ STORED USER:', (getState() as RootState).auth);
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

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'AccountValidity', 'Profile'],
  endpoints: () => ({}),
});
