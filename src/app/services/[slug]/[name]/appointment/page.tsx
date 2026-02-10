import HospitalBooking from '@/modules/hospital-appointment';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.hospitalsBookingMetadata,
};

export default HospitalBooking;
