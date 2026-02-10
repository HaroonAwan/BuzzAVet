'use client';

import { ArrowRightIcon } from '@/assets/icon-components';
import { Button } from '@/components/shared/Button';
import PetCard from '@/components/shared/PetCard';
import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import MainLayout from '@/layouts/MainLayout';
import { theme } from '@/lib/theme';
import { Plus } from 'lucide-react';
import { useState } from 'react';
const petsDummyData = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever', image: '' },
  { id: 2, name: 'Mittens', breed: 'Siamese', image: '' },
  { id: 3, name: 'Charlie', breed: 'Beagle', image: '' },
  { id: 4, name: 'Luna', breed: 'Maine Coon', image: '' },
];

export default function HospitalAppointment() {
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const handleSelectPet = (petId: number) => {
    setSelectedPet(petId);
  };
  return (
    <MainLayout>
      <ContentBodyWrapper>
        <section className="flex flex-col gap-8">
          <h1 className="text-[24px] font-semibold">
            Hello World! This is the hospital-appointment module.
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {petsDummyData.map((pet) => (
              <PetCard
                key={pet.id}
                data={pet}
                onSelect={() => handleSelectPet(pet.id)}
                selectedPet={selectedPet === pet.id}
              />
            ))}
            <article
              className="p-4 flex items-center font-medium text-sm justify-center gap-2 rounded-[14px] cursor-pointer relative"
              style={{
                border: '2px dashed #E5E7EB',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cdefs%3E%3Cpattern id='dashed' x='0' y='0' width='12' height='1' patternUnits='userSpaceOnUse'%3E%3Cline x1='0' y1='1' x2='8' y2='1' stroke='%23E5E7EB' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3C/svg%3E")`,
              }}
              onClick={() => console.count('Article clicked')}
            >
              <Plus size={20} color={theme.colors.text.default} />
              Add a Pet
            </article>
          </div>
          <div className="flex justify-between items-center">
            <Button variant="ghost" style={{ color: theme.colors.error }}>
              Cancel
            </Button>
            <Button iconPlacement="end" icon={<ArrowRightIcon />}>
              Continue
            </Button>
          </div>
        </section>
      </ContentBodyWrapper>
    </MainLayout>
  );
}
