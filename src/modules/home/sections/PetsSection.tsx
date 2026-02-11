'use client';

import React from 'react';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import TelemedicineIcon from '@/assets/images/home/telemedicine.svg';
import HospitalVisitIcon from '@/assets/images/home/hospitalVisit.svg';
import MobileVetIcon from '@/assets/images/home/mobileVet.svg';
import SectionsWrapper from '../../../layouts/SectionsWrapper';
import { PetCard, PetCardProps } from '../layouts/PetCard';

// DUMMY DATA FOR PETS
const pets: PetCardProps[] = [
  {
    petId: '1',
    chips: [
      { label: 'Telemedicine', variant: 'alert', icon: TelemedicineIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: 'Today, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
    type: 'tele',
  },
  {
    petId: '2',
    chips: [
      { label: 'In-hospital Visit', variant: 'normal', icon: HospitalVisitIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '26 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
    type: 'hospital',
  },
  {
    petId: '3',
    chips: [
      { label: 'Mobile Vet Visit', variant: 'pink', icon: MobileVetIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '27 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
    type: 'video',
  },
  {
    petId: '4',
    chips: [
      { label: 'Telemedicine', variant: 'alert', icon: TelemedicineIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: 'Today, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
    type: 'tele',
  },
  {
    petId: '5',
    chips: [
      { label: 'In-hospital Visit', variant: 'normal', icon: HospitalVisitIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '26 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
    type: 'hospital',
  },
  {
    petId: '6',
    chips: [
      { label: 'Mobile Vet Visit', variant: 'pink', icon: MobileVetIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '27 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
    type: 'video',
  },
];

const PetsSection: React.FC = () => {
  return (
    <SectionsWrapper>
      <ScrollableSection title="Pets">
        {pets.map((pet, index) => (
          <PetCard key={`${pet.dateTimeLabel}-${index}`} {...pet} />
        ))}
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default PetsSection;
