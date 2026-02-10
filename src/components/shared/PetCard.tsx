import React from 'react';
import { Avatar } from './Avatar';
import { theme } from '@/lib/theme';
import { Check } from 'lucide-react';

interface PetCardProps {
  data: {
    id: number;
    name: string;
    breed: string;
    image?: string;
  };
  onSelect: () => void;
  selectedPet: boolean;
}

const PetCard = ({ data, onSelect, selectedPet }: PetCardProps) => {
  return (
    <article
      className="border p-4 flex items-center gap-4 rounded-[14px] cursor-pointer relative"
      onClick={onSelect}
      style={{
        borderColor: selectedPet ? 'var(--color-foreground)' : '',
        backgroundColor: selectedPet ? 'var(--bg-tertiary)' : '',
      }}
    >
      <Avatar url={data.image} name={data.name} />
      <div className="flex flex-col gap-1">
        <h2 className="leading-tight font-semibold">{data.name}</h2>
        <p className="text-xs leading-tight" style={{ color: theme.colors.text.tertiary }}>
          {data.breed}
        </p>
      </div>
      {selectedPet && (
        <Check
          className="absolute top-1/2 -translate-y-1/2 right-4"
          size={16}
          color={'var(--color-foreground)'}
        />
      )}
    </article>
  );
};

export default PetCard;
