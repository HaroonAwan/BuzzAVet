import { usePathname, useRouter } from 'next/navigation';
import { useGetVetDetailsQuery } from '@/apis/vets/vetsApi';
import { VetApiResponse } from '@/types/vetsTypes';

export const useGetVetDetails = (slug: { slug: string; name: string }) => {
  const path = usePathname();
  const vetId = slug.name;
  const { data, isLoading, error } = useGetVetDetailsQuery(vetId, { skip: !vetId });

  // Determine which object to map based on pathname
  let mappedData: Partial<VetApiResponse> | undefined = undefined;
  if (data) {
    const pathname = path || '';
    if (pathname.includes('telemedicine')) {
      mappedData = data.profile?.telemedicine;
    } else if (pathname.includes('mobile-vets') || pathname.includes('mobile-vet')) {
      mappedData = data.profile?.mobileVet;
    } else {
      mappedData = data;
    }
  }

  return {
    vet: data,
    mappedData,
    isLoading,
    error,
  };
};
