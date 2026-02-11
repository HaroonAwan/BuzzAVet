'use client';

import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@/assets/icon-components';
import { theme } from '@/lib/theme';
import Link from 'next/link';

export interface CategoryCardProps {
  name: string;
  imageSrc: string | StaticImageData;
  bgColor: string; // Background color (pastel colors from Figma)
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageSrc, bgColor, className }) => {
  return (
    <Link href={`/explore?category=${name}`}>
      <article
        className={cn(
          'category-card-group group flex h-20 w-[248px] shrink-0 items-center justify-between rounded-[16px] p-4',
          'cursor-pointer transition-all duration-500',
          className
        )}
        style={{
          backgroundColor: bgColor,
        }}
      >
        {/* Left side: Category name + GO text + Arrow */}
        <div className="flex min-w-0 flex-1 items-center gap-0.5">
          {/* Category name */}
          <span
            className="category-name-text shrink-0 text-left text-lg font-semibold whitespace-nowrap transition-colors duration-500"
            style={{
              color: theme.colors.text.dark,
            }}
          >
            {name}
          </span>
          {/* GO text - appears on hover between name and arrow */}
          <span
            className={cn(
              'w-0 overflow-hidden font-semibold whitespace-nowrap opacity-0 transition-all duration-500',
              'group-hover:ml-1 group-hover:w-auto group-hover:opacity-100',
              'category-explore-text'
            )}
          >
            EXPLORE
          </span>
          {/* Arrow - moves right on hover */}
          <div
            className={cn('shrink-0 transition-transform duration-500', 'group-hover:opacity-0')}
          >
            <ChevronDownIcon size={24} className="shrink-0 -rotate-90" />
          </div>
        </div>

        {/* Right side: Large illustrative icon */}
        <div
          className={cn(
            'relative h-16 w-16 shrink-0 overflow-hidden',
            'opacity-100 transition-all duration-500',
            'group-hover:pointer-events-none group-hover:h-0 group-hover:w-0 group-hover:opacity-0'
          )}
        >
          <Image src={imageSrc} alt={name} fill className="object-contain" />
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
