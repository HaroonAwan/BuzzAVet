'use client';

import React, { useState } from 'react';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import {
  HospitalOrPetServicesCard,
  HospitalOrPetServicesCardProps,
} from '../layouts/HospitalOrPetServicesCard';
import SectionsWrapper from '../../../layouts/SectionsWrapper';

// DUMMY DATA FOR RECOMMENDED HOSPITALS
const initialHospitals: HospitalOrPetServicesCardProps[] = [
  {
    name: 'VetCare Hospital',
    location: '123 Main Street, Downtown',
    rating: 4.9,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [
      { label: 'Open Now', variant: 'success' },
      { label: '24/7 Emergency', variant: 'warning' },
    ],
  },
  {
    name: 'Animal Wellness Center',
    location: '456 Oak Avenue, Midtown',
    rating: 4.7,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1626749187789-262a4ff6ca13?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Pet Emergency Clinic',
    location: '789 Elm Street, Uptown',
    rating: 4.8,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1688479766741-38e5ee0a6671?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Comprehensive Vet Care',
    location: '321 Pine Road, Westside',
    rating: 4.6,
    price: 100,
    favorite: false,
    chips: [
      { label: 'Open Now', variant: 'success' },
      { label: '24/7 Emergency', variant: 'warning' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'City Veterinary Hospital',
    location: '654 Maple Drive, Eastside',
    rating: 4.9,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1626749187789-262a4ff6ca13?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Advanced Animal Care',
    location: '987 Cedar Lane, Northside',
    rating: 4.8,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1688479766741-38e5ee0a6671?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'VetCare Hospital',
    location: '123 Main Street, Downtown',
    rating: 4.9,
    price: 100,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chips: [
      { label: 'Open Now', variant: 'success' },
      { label: '24/7 Emergency', variant: 'warning' },
    ],
  },
  {
    name: 'Animal Wellness Center',
    location: '456 Oak Avenue, Midtown',
    rating: 4.7,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1626749187789-262a4ff6ca13?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Pet Emergency Clinic',
    location: '789 Elm Street, Uptown',
    rating: 4.8,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1688479766741-38e5ee0a6671?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Comprehensive Vet Care',
    location: '321 Pine Road, Westside',
    rating: 4.6,
    price: 100,
    favorite: false,
    chips: [
      { label: 'Open Now', variant: 'success' },
      { label: '24/7 Emergency', variant: 'warning' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'City Veterinary Hospital',
    location: '654 Maple Drive, Eastside',
    rating: 4.9,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1626749187789-262a4ff6ca13?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Advanced Animal Care',
    location: '987 Cedar Lane, Northside',
    rating: 4.8,
    price: 100,
    favorite: false,
    chips: [{ label: 'Open Now', variant: 'success' }],
    imageSrc:
      'https://images.unsplash.com/photo-1688479766741-38e5ee0a6671?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const RecommendedHospitalsSection: React.FC = () => {
  const [hospitals, setHospitals] = useState<HospitalOrPetServicesCardProps[]>(initialHospitals);

  const handleFavoriteToggle = (index: number, favorite: boolean) => {
    setHospitals((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], favorite };
      return updated;
    });
  };

  return (
    <SectionsWrapper>
      <ScrollableSection title="Recommended Hospitals Near you">
        {hospitals.map((hospital, index) => (
          <HospitalOrPetServicesCard
            key={`${hospital.name}-${index}`}
            {...hospital}
            onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
          />
        ))}
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default RecommendedHospitalsSection;
