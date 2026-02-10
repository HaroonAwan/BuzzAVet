import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import { NotFound } from '@/components/shared/NotFound';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
};

export default function NotFoundPage() {
  return (
    <MainLayout>
      <NotFound />
    </MainLayout>
  );
}
