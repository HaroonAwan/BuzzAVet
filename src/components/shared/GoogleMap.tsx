'use client';

import React from 'react';
import GoogleMapReact from 'google-map-react';
import Image from 'next/image';
import LocationIcon from '@/assets/images/home/location.svg';
import { GOOGLE_MAPS_API_KEY } from '@/constants';

interface GoogleMapProps {
  lat?: number;
  lng?: number;
  height?: string;
  title?: string;
  address?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  lat = 34.0736,
  lng = -118.4004,
  height = '300px',
  title = 'Location',
  address,
}) => {
  const [mapError, setMapError] = React.useState<string | null>(null);
  const markerRef = React.useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const infoWindowRef = React.useRef<google.maps.InfoWindow | null>(null);
  const viewOnMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const apiKey = GOOGLE_MAPS_API_KEY || '';

  // Log for debugging
  React.useEffect(() => {
    console.log('Google Maps API Key:', apiKey ? 'Present' : 'Missing');
    console.log('Map coordinates:', { lat, lng });
  }, [apiKey, lat, lng]);

  const handleApiLoaded = async ({ map, maps }: { map: any; maps: any }) => {
    setMapError(null);

    const position = {
      lat: typeof lat === 'string' ? parseFloat(lat) : lat,
      lng: typeof lng === 'string' ? parseFloat(lng) : lng,
    };

    // Import the marker library
    const { AdvancedMarkerElement, PinElement } = await maps.importLibrary('marker');

    // Create custom pin element with icon
    const pinElement = new PinElement({
      glyph: new URL(LocationIcon.src, window.location.origin).href,
      scale: 1.2,
    });

    // Create advanced marker
    const marker = new AdvancedMarkerElement({
      map,
      position,
      title: title,
      content: pinElement.element,
    });

    const infoWindow = new maps.InfoWindow({
      content: `
        <div style="padding: 12px; max-width: 280px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0; color: #202124; line-height: 1.4;">
            ${title}
          </h3>
          ${
            address
              ? `
            <p style="font-size: 14px; color: #5f6368; margin: 0 0 12px 0; line-height: 1.5;">
              ${address}
            </p>
          `
              : ''
          }
          <a 
            href="${viewOnMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="display: inline-block; color: #1a73e8; text-decoration: none; font-size: 14px; font-weight: 500;"
          >
            View on Google Maps
          </a>
        </div>
      `,
    });

    // Add click listener to marker
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    markerRef.current = marker;
    infoWindowRef.current = infoWindow;
  };

  if (!apiKey) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden border flex items-center justify-center bg-gray-100"
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold mb-2">Google Maps API Key Missing</p>
          <p className="text-sm text-gray-600">
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file
          </p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden border flex items-center justify-center bg-yellow-50"
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-yellow-800 font-semibold mb-2">⚠️ Map Loading Blocked</p>
          <p className="text-sm text-gray-700 mb-3">
            Your browser or an extension (like an ad blocker) is blocking Google Maps.
          </p>
          <div className="text-xs text-left bg-white py-2 px-4 rounded border">
            <p className="font-semibold mb-1">To fix:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Disable ad blockers (uBlock, AdBlock, etc.)</li>
              <li>Whitelist localhost or this domain</li>
              <li>Try in an incognito window</li>
            </ul>
          </div>
          <a
            href={viewOnMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline text-sm"
          >
            View location on Google Maps instead →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border" style={{ height }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey,
          language: 'en',
          region: 'US',
        }}
        center={{
          lat: typeof lat === 'string' ? parseFloat(lat) : lat,
          lng: typeof lng === 'string' ? parseFloat(lng) : lng,
        }}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          gestureHandling: 'greedy',
          styles: [],
        }}
      />

      {/* View on Google Maps Button */}
      <a
        href={viewOnMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 transition-colors rounded-lg px-3 py-2 flex items-center gap-1 shadow-md z-10"
      >
        <Image
          src={LocationIcon}
          alt="Location marker"
          className="black-filter"
          width={18}
          height={18}
        />

        <span className="text-sm font-medium text-gray-700">View on Google Maps</span>
      </a>
    </div>
  );
};

export default GoogleMap;
