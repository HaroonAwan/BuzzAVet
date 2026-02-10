'use client';

import React, { useState } from 'react';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import {
  HospitalOrPetServicesCard,
  HospitalOrPetServicesCardProps,
} from '../layouts/HospitalOrPetServicesCard';
import SectionsWrapper from '../../../layouts/SectionsWrapper';

// DUMMY DATA FOR RECOMMENDED HOSPITALS
const initialPetServices: HospitalOrPetServicesCardProps[] = [
  {
    name: 'Paws & Play Daycare',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: true,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Mobile Service', variant: 'normal' }],
  },
  {
    name: 'VetCare Hospital',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Vaccinations', variant: 'normal' }],
  },
  {
    name: 'Animal Wellness Center',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Grooming', variant: 'normal' }],
  },
  {
    name: 'Pet Emergency Clinic',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: true,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Spa', variant: 'normal' }],
  },
  {
    name: 'Pet Emergency Clinic',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Spa', variant: 'normal' }],
  },
  {
    name: 'Paws & Play Daycare',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Mobile Service', variant: 'normal' }],
  },
  {
    name: 'VetCare Hospital',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Vaccinations', variant: 'normal' }],
  },
  {
    name: 'Animal Wellness Center',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Grooming', variant: 'normal' }],
  },
  {
    name: 'Pet Emergency Clinic',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Spa', variant: 'normal' }],
  },
  {
    name: 'Pet Emergency Clinic',
    rating: 4.9,
    type: 'Daycare',
    servesInArea: 'SoMa, Toronto',
    hasSessionBooking: true,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [{ label: 'Spa', variant: 'normal' }],
  },
];

const GuestFavouritePetServices: React.FC = () => {
  const [petServices, setPetServices] =
    useState<HospitalOrPetServicesCardProps[]>(initialPetServices);

  const handleFavoriteToggle = (index: number, favorite: boolean) => {
    setPetServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], favorite };
      return updated;
    });
  };

  return (
    <SectionsWrapper>
      <ScrollableSection title="Guest Favourite Pet Services">
        {petServices.map((petService, index) => (
          <HospitalOrPetServicesCard
            key={`${petService.name}-${index}`}
            {...petService}
            slug="pet"
            onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
          />
        ))}
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default GuestFavouritePetServices;
