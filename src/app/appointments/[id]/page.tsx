import { Metadata } from 'next';
import { use } from 'react';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Appointment Details',
};

interface AppointmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AppointmentPage({ params }: AppointmentPageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);
  // Decode the ID from URL
  const decodedId = decodeURIComponent(id);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>
        <p className="text-lg">Appointment ID: {decodedId}</p>
        <p className="text-sm text-gray-600 mt-2">
          This page will display detailed information for appointment {decodedId}.
        </p>
      </div>
    </MainLayout>
  );
}
