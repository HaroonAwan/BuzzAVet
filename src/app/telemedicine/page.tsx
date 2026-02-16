import Telemedicine from '@/modules/telemedicine';
import { Metadata } from 'next';
import { DEFAULT_METADATA } from '@/seo/metadata';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.telemedicineMetadata,
};
export default Telemedicine;
