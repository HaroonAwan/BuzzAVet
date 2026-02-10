import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Explore',
};

interface ExplorePageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  // Unwrap searchParams
  const params = await searchParams;
  const category = params.category;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        {category ? (
          <div>
            <p className="text-lg mb-2">Category: {decodeURIComponent(category)}</p>
            <p className="text-sm text-gray-600">
              This page will display services and providers for the {decodeURIComponent(category)}{' '}
              category.
            </p>
          </div>
        ) : (
          <p className="text-lg">Browse all categories and services</p>
        )}
      </div>
    </MainLayout>
  );
}
