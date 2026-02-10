'use client';

import React from 'react';
import { ScrollableSection } from '@/components/shared/ScrollableSection';
import CategoryCard, { CategoryCardProps } from '../layouts/CategoryCard';
import SectionsWrapper from '../../../layouts/SectionsWrapper';

// DUMMY DATA FOR CATEGORIES
import thermometer from '@/assets/images/home/thermometer.png';
import syringe from '@/assets/images/home/syringe.png';
import scissors from '@/assets/images/home/surgical-scissors.png';
import tooth from '@/assets/images/home/tooth.png';
import grooming from '@/assets/images/home/grooming.png';
import { theme } from '@/lib/theme';

const categories: CategoryCardProps[] = [
  {
    name: 'General',
    imageSrc: thermometer,
    bgColor: theme.colors.chip.normal.background,
  },
  {
    name: 'Vaccination',
    imageSrc: syringe,
    bgColor: theme.colors.chip.pink.background,
  },
  {
    name: 'Surgery',
    imageSrc: scissors,
    bgColor: theme.colors.chip.success.background,
  },
  {
    name: 'Dental',
    imageSrc: tooth,
    bgColor: theme.colors.background.lightPurple,
  },
  {
    name: 'Grooming',
    imageSrc: grooming,
    bgColor: theme.colors.chip.alert.background,
  },
];

const ExploreCategoriesSection: React.FC = () => {
  return (
    <SectionsWrapper>
      <ScrollableSection title="Explore by Category">
        {categories.map((category, index) => (
          <CategoryCard key={`${category.name}-${index}`} {...category} />
        ))}
      </ScrollableSection>
    </SectionsWrapper>
  );
};

export default ExploreCategoriesSection;
