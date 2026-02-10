export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

/**
 * Get the current device location using the Geolocation API
 * @returns Promise that resolves with coordinates or rejects with error
 */
export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation is not supported by this browser.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject({
          code: error.code,
          message: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Watch the device location for changes
 * @param callback Function to call when location changes
 * @returns watchId that can be used to clear the watch
 */
export const watchLocation = (
  callback: (coords: Coordinates) => void,
  onError?: (error: GeolocationError) => void
): number => {
  if (!navigator.geolocation) {
    if (onError) {
      onError({
        code: 0,
        message: 'Geolocation is not supported by this browser.',
      });
    }
    return -1;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      if (onError) {
        onError({
          code: error.code,
          message: error.message,
        });
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

/**
 * Clear a location watch
 * @param watchId The watch ID returned from watchLocation
 */
export const clearLocationWatch = (watchId: number): void => {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};
