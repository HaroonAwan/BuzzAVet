import Vets from '@/modules/vets';
import { Metadata } from 'next';
import { DEFAULT_METADATA } from '@/seo/metadata';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.mobileVets,
};
export default Vets;
