import { Metadata } from 'next';
import { use } from 'react';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Telemedicine',
};

interface TelemedicinePageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function TelemedicinePage({ params }: TelemedicinePageProps) {
  // Unwrap params using React.use()
  const { name } = use(params);
  // Decode the name from URL
  const decodedName = decodeURIComponent(name);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">{decodedName}</h1>
        <p className="text-lg">Telemedicine doctor profile page</p>
      </div>
    </MainLayout>
  );
}
