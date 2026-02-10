import React from 'react';
import { cn } from '@/lib/utils';

const SectionsWrapper = ({
  children,
  className,
  noContainer = false,
}: {
  children: React.ReactNode;
  className?: string;
  noContainer?: boolean;
}) => {
  return (
    <section className={cn('p-5 md:p-10 lg:p-15', { container: !noContainer }, className)}>
      {children}
    </section>
  );
};

export default SectionsWrapper;
