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
          'category-card-group group rounded-[16px] p-4 flex items-center justify-between w-[248px] h-20 shrink-0',
          'cursor-pointer transition-all duration-500',
          className
        )}
        style={{
          backgroundColor: bgColor,
        }}
      >
        {/* Left side: Category name + GO text + Arrow */}
        <div className="flex items-center gap-0.5 flex-1 min-w-0">
          {/* Category name */}
          <span
            className="category-name-text font-semibold text-lg whitespace-nowrap shrink-0 text-left transition-colors duration-500"
            style={{
              color: theme.colors.text.dark,
            }}
          >
            {name}
          </span>
          {/* GO text - appears on hover between name and arrow */}
          <span
            className={cn(
              'font-semibold whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-500',
              'group-hover:opacity-100 group-hover:w-auto group-hover:ml-1',
              'category-explore-text'
            )}
          >
            EXPLORE
          </span>
          {/* Arrow - moves right on hover */}
          <div
            className={cn('transition-transform duration-500 shrink-0', 'group-hover:opacity-0')}
          >
            <ChevronDownIcon size={24} className="-rotate-90 shrink-0" />
          </div>
        </div>

        {/* Right side: Large illustrative icon */}
        <div
          className={cn(
            'relative w-16 h-16 shrink-0 overflow-hidden',
            'opacity-100 transition-all duration-500',
            'group-hover:opacity-0 group-hover:w-0 group-hover:h-0 group-hover:pointer-events-none'
          )}
        >
          <Image src={imageSrc} alt={name} fill className="object-contain" />
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
