'use client';

import React from 'react';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import { AppointmentCard, AppointmentCardProps } from '../layouts/AppointmentCard';
import TelemedicineIcon from '@/assets/images/home/telemedicine.svg';
import HospitalVisitIcon from '@/assets/images/home/hospitalVisit.svg';
import MobileVetIcon from '@/assets/images/home/mobileVet.svg';
import SectionsWrapper from '../../../layouts/SectionsWrapper';

// DUMMY DATA FOR UPCOMING APPOINTMENTS
const upcomingAppointments: AppointmentCardProps[] = [
  {
    appointmentId: '1',
    chips: [
      { label: 'Telemedicine', variant: 'alert', icon: TelemedicineIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: 'Today, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
  },
  {
    appointmentId: '2',
    chips: [
      { label: 'In-hospital Visit', variant: 'normal', icon: HospitalVisitIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '26 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
  },
  {
    appointmentId: '3',
    chips: [
      { label: 'Mobile Vet Visit', variant: 'pink', icon: MobileVetIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '27 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
  },
  {
    appointmentId: '4',
    chips: [
      { label: 'Telemedicine', variant: 'alert', icon: TelemedicineIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: 'Today, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
  },
  {
    appointmentId: '5',
    chips: [
      { label: 'In-hospital Visit', variant: 'normal', icon: HospitalVisitIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '26 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
  },
  {
    appointmentId: '6',
    chips: [
      { label: 'Mobile Vet Visit', variant: 'pink', icon: MobileVetIcon },
      { label: 'Confirmed', variant: 'success' },
    ],
    dateTimeLabel: '27 Dec, 2:30 PM',
    petName: 'Bella',
    vetName: 'Dr. Sarah Wilson',
    vetRank: 'S',
  },
];

const UpcomingAppointmentsSection: React.FC = () => {
  return (
    <SectionsWrapper>
      <ScrollableSection title="Upcoming Appointments">
        {upcomingAppointments.map((appointment, index) => (
          <AppointmentCard key={`${appointment.dateTimeLabel}-${index}`} {...appointment} />
        ))}
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default UpcomingAppointmentsSection;
