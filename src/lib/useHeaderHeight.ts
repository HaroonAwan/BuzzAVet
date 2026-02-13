'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to get the current header height from session storage
 * @returns The current header height in pixels, or null if not yet measured
 */
export function useHeaderHeight(): number | null {
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  useEffect(() => {
    // Get initial value
    const storedHeight = sessionStorage.getItem('headerHeight');
    if (storedHeight) {
      setHeaderHeight(parseInt(storedHeight, 10));
    }

    // Listen for storage changes (in case it updates)
    const handleStorageChange = () => {
      const newHeight = sessionStorage.getItem('headerHeight');
      if (newHeight) {
        setHeaderHeight(parseInt(newHeight, 10));
      }
    };

    // Check periodically for updates (since sessionStorage doesn't fire events for same-tab changes)
    const interval = setInterval(() => {
      const currentHeight = sessionStorage.getItem('headerHeight');
      if (currentHeight) {
        const parsedHeight = parseInt(currentHeight, 10);
        setHeaderHeight((prev) => (prev !== parsedHeight ? parsedHeight : prev));
      }
    }, 100);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return headerHeight;
}

/**
 * Get the header height synchronously from session storage
 * @returns The current header height in pixels, or null if not yet measured
 */
export function getHeaderHeight(): number | null {
  if (typeof window === 'undefined') return null;
  const height = sessionStorage.getItem('headerHeight');
  return height ? parseInt(height, 10) : null;
}
