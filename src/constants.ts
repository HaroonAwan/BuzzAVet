// API BASE URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const BASE_API_PREFIX = '/customer';

// META TAGS
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'BuzzAVet';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Veterinary management system';

// ENVIRONMENT
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development';

// ENCRYPTION KEY
export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'created_by_Nauman';

// GOOGLE MAPS API KEY
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// COOKIE SETTINGS
export const COOKIE_MAX_AGE = parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE || '604800', 10);
