import Appointment from '@/modules/appointments';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';
import { use } from 'react';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.hospitalsBookingMetadata,
};
interface ServicePageProps {
  params: Promise<{
    slug: string;
    name: string;
  }>;
}

export default function AppointmentPage({ params }: ServicePageProps) {
  const { slug, name } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const decodedName = decodeURIComponent(name);
  const sluggedObject = { slug: decodedSlug, name: decodedName };
  return <Appointment slug={sluggedObject} />;
}
