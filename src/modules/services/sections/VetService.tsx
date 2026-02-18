import React from 'react';
import BackButton from '@/components/shared/BackButton';
import { SlugProps } from './HospitalService';
import VetsHeaderSection from './(vets)/VetsHeaderSection';
import VetsContent from './(vets)/VetsContent';
import { useGetVetDetails } from '../hooks/useGetVetDetails';
import Error from '@/components/shared/states/Error';
import Loading from '@/components/shared/states/Loading';
import NoData from '@/components/shared/states/NoData';

const VetService = ({ slug }: SlugProps) => {
  const { vet, mappedData, isLoading, error } = useGetVetDetails(slug);

  if (isLoading) return <Loading />;
  if (error) return <Error message="Failed to get Vet details" />;
  if (!vet) return <NoData message="No Vet data found" />;

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <div className="flex flex-col gap-6">
        <VetsHeaderSection vet={vet} mappedData={mappedData} />
        <VetsContent slug={slug} vet={vet} mappedData={mappedData} />
      </div>
    </div>
  );
};

export default VetService;
