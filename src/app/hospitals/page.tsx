import Hospitals from '@/modules/hospitals';
import { Metadata } from 'next';
import { DEFAULT_METADATA } from '@/seo/metadata';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.hospitalsMetadata,
};

export default Hospitals;
