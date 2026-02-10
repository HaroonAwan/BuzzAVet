import React from 'react';
import { cn } from '@/lib/utils';

const ContentBodyWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={cn('container px-15 py-10', className)}>{children}</section>;
};

export default ContentBodyWrapper;
