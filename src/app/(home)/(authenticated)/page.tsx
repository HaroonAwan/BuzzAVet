import HomePage from '@/modules/home';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.homePageMetadata,
};

export default HomePage;
