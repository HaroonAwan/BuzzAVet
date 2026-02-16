import { Metadata } from 'next';
import { use } from 'react';
import Services from '@/modules/services';

export const metadata: Metadata = {
  title: 'Service',
};

interface ServicePageProps {
  params: Promise<{
    slug: string;
    name: string;
  }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug, name } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const decodedName = decodeURIComponent(name);
  const sluggedObject = { slug: decodedSlug, name: decodedName };

  return <Services slug={sluggedObject} />;
}
