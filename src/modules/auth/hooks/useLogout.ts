'use client';

import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/apis/auth/authSlice';

/**
 * Custom hook for logout functionality.
 * Clears Redux store, cookies, and localStorage, then redirects to login page.
 */
export function useLogout() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Dispatch logout action (clears cookies, storage, and resets state)
    dispatch(logout());

    if (typeof window !== 'undefined') {
      window.location.href = '/landing';
    }
  };

  return handleLogout;
}
