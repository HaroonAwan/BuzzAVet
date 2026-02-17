'use client';

import React from 'react';
import GoogleMapReact from 'google-map-react';
import Image from 'next/image';
import LocationIcon from '@/assets/images/home/location.svg';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_ID } from '@/constants';

interface GoogleMapProps {
  lat: number;
  lng: number;
  height?: string;
  title?: string;
  address?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  lat,
  lng,
  height = '300px',
  title = 'Location',
  address,
}) => {
  const [mapError, setMapError] = React.useState<string | null>(null);
  const markerRef = React.useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const infoWindowRef = React.useRef<google.maps.InfoWindow | null>(null);
  const viewOnMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const apiKey = GOOGLE_MAPS_API_KEY || '';
  const mapId = GOOGLE_MAPS_ID;

  const handleApiLoaded = async ({ map, maps }: { map: any; maps: any }) => {
    setMapError(null);

    const position = {
      lat: typeof lat === 'string' ? parseFloat(lat) : lat,
      lng: typeof lng === 'string' ? parseFloat(lng) : lng,
    };

    // Import the marker library
    const { AdvancedMarkerElement, PinElement } = await maps.importLibrary('marker');

    // Create a custom HTML marker with a transparent background
    const markerDiv = document.createElement('div');
    markerDiv.style.background = 'transparent';
    markerDiv.style.display = 'flex';
    markerDiv.style.alignItems = 'center';
    markerDiv.style.justifyContent = 'center';
    markerDiv.style.width = '32px';
    markerDiv.style.height = '32px';
    markerDiv.style.border = 'none';
    markerDiv.style.boxShadow = 'none';
    markerDiv.innerHTML = `<img src="${new URL(LocationIcon.src, window.location.origin).href}" alt="Location" style="width: 24px; height: 24px; background: transparent;" />`;

    // Create advanced marker
    const marker = new AdvancedMarkerElement({
      map,
      position,
      title: title,
      content: markerDiv,
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
        className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border bg-gray-100"
        style={{ height }}
      >
        <div className="p-4 text-center">
          <p className="mb-2 font-semibold text-red-600">Google Maps API Key Missing</p>
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
        className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border bg-yellow-50"
        style={{ height }}
      >
        <div className="p-4 text-center">
          <p className="mb-2 font-semibold text-yellow-800">⚠️ Map Loading Blocked</p>
          <p className="mb-3 text-sm text-gray-700">
            Your browser or an extension (like an ad blocker) is blocking Google Maps.
          </p>
          <div className="rounded border bg-white px-4 py-2 text-left text-xs">
            <p className="mb-1 font-semibold">To fix:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Disable ad blockers (uBlock, AdBlock, etc.)</li>
              <li>Whitelist localhost or this domain</li>
              <li>Try in an incognito window</li>
            </ul>
          </div>
          <a
            href={viewOnMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-blue-600 hover:underline"
          >
            View location on Google Maps instead →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border" style={{ height }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey,
          language: 'en',
          region: 'US',
        }}
        center={{
          lat,
          lng,
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
          mapId: mapId || undefined,
        }}
      />

      {/* View on Google Maps Button */}
      <a
        href={viewOnMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg bg-white px-3 py-2 shadow-md transition-colors hover:bg-gray-50"
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
