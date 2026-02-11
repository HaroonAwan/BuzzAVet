import { Metadata } from 'next';
import { use } from 'react';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Pet Details',
};

interface PetPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PetPage({ params }: PetPageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);
  // Decode the ID from URL
  const decodedId = decodeURIComponent(id);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Pet Details</h1>
        <p className="text-lg">Pet ID: {decodedId}</p>
        <p className="mt-2 text-sm text-gray-600">
          This page will display detailed information for pets {decodedId}.
        </p>
      </div>
    </MainLayout>
  );
}
