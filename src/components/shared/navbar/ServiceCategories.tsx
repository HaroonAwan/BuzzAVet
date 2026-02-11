import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { ServiceCategory, ServiceCategoryConfig } from './types';
import { serviceCategories } from './constants';

interface ServiceCategoriesProps {
  selectedCategory: ServiceCategory;
  onCategorySelect: (category: ServiceCategory, route: string) => void;
}

export function ServiceCategories({ selectedCategory, onCategorySelect }: ServiceCategoriesProps) {
  return (
    <div className="flex items-center gap-8">
      {serviceCategories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id, category.route)}
            className={cn(
              'flex cursor-pointer items-center gap-2 px-3 py-2 transition-all',
              'hover:opacity-80',
              isActive && 'border-b-2'
            )}
            style={{
              borderBottomColor: isActive ? theme.colors.active : 'transparent',
              borderBottomWidth: '3px',
              color: theme.colors.text.default,
            }}
          >
            <Image
              src={category.image}
              alt={category.label}
              width={40}
              height={40}
              className="shrink-0"
            />
            <span
              className={cn('text-sm font-semibold whitespace-nowrap', !isActive && 'opacity-60')}
            >
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
