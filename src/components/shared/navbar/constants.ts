import HospitalImage from '@/assets/images/auth/hospital.png';
import TelemedicineImage from '@/assets/images/auth/telemed.png';
import HomeVisitImage from '@/assets/images/auth/home.png';
import PetServicesImage from '@/assets/images/auth/pet.png';
import { ServiceCategoryConfig } from './types';

export const serviceCategories: ServiceCategoryConfig[] = [
  {
    id: 'hospital',
    label: 'Hospital Appointment',
    image: HospitalImage,
    route: '/hospitals',
  },
  {
    id: 'telemedicine',
    label: 'Telemedicine',
    image: TelemedicineImage,
    route: '/telemedicine',
  },
  {
    id: 'mobile',
    label: 'Mobile Vet',
    image: HomeVisitImage,
    route: '/mobile-vet',
  },
  {
    id: 'services',
    label: 'Pet Services',
    image: PetServicesImage,
    route: '/services/pet/all',
  },
];
