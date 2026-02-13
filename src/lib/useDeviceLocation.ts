'use client';

import { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/lib/geolocation';

interface DeviceLocationState {
  lat: number | null;
  long: number | null;
  hasPermission: boolean;
}

const LAT_KEY = 'x-latitude';
const LONG_KEY = 'x-longitude';

export function useDeviceLocation(): DeviceLocationState {
  const [state, setState] = useState<DeviceLocationState>({
    lat: null,
    long: null,
    hasPermission: false,
  });
  console.log('🚀 ~ useDeviceLocation ~ state:', state);

  useEffect(() => {
    let isMounted = true;

    const storeAndSet = (lat: number, long: number) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(LAT_KEY, lat.toString());
        sessionStorage.setItem(LONG_KEY, long.toString());
      }

      if (isMounted) {
        setState({ lat, long, hasPermission: true });
      }
    };

    const requestLocation = async () => {
      try {
        const coords = await getCurrentLocation();
        storeAndSet(coords.latitude, coords.longitude);
      } catch (error) {
        if (isMounted) {
          setState((prev) => ({ ...prev, hasPermission: false }));
        }
      }
    };

    const readStored = () => {
      if (typeof window === 'undefined') return;
      const storedLat = sessionStorage.getItem(LAT_KEY);
      const storedLong = sessionStorage.getItem(LONG_KEY);
      if (storedLat && storedLong) {
        const lat = Number(storedLat);
        const long = Number(storedLong);
        if (!Number.isNaN(lat) && !Number.isNaN(long)) {
          setState({ lat, long, hasPermission: true });
        }
      }
    };

    readStored();

    if (typeof navigator !== 'undefined' && 'permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            requestLocation();
          } else if (permissionStatus.state === 'prompt') {
            requestLocation();
          } else {
            if (isMounted) {
              setState((prev) => ({ ...prev, hasPermission: false }));
            }
          }
        })
        .catch(() => {
          requestLocation();
        });
    } else {
      requestLocation();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
