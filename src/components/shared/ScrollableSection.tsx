/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React from 'react';
import { Button } from './Button';
import { ScrollArrowRightIcon } from '@/assets/icon-components';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export interface ScrollableSectionProps {
  title: string;
  children: React.ReactNode;
  /**
   * Scroll amount in pixels for each navigation click.
   * Defaults to the visible container width when not provided.
   */
  step?: number;
  className?: string;
}

export const ScrollableSection: React.FC<ScrollableSectionProps> = ({
  title,
  children,
  step,
  className,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const [computedStep, setComputedStep] = React.useState<number | null>(null);

  const getEffectiveStep = React.useCallback(() => {
    if (typeof step === 'number' && step > 0) {
      return step;
    }
    if (computedStep && computedStep > 0) {
      return computedStep;
    }
    const container = scrollContainerRef.current;
    return container?.clientWidth ?? 0;
  }, [step, computedStep]);

  const updateScrollState = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Check if content overflows (scrolling is enabled)
    const hasOverflow = scrollWidth > clientWidth;
    setIsScrollable(hasOverflow);

    if (hasOverflow) {
      setCanScrollLeft(scrollLeft > 0);
      // Use a small epsilon to avoid off‑by‑one due to rounding
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    } else {
      // No overflow, disable both buttons
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }

    // When step is not provided, keep computed step in sync with container width
    if (step === undefined) {
      setComputedStep(clientWidth);
    }
  }, [step]);

  const handleScroll = React.useCallback(() => {
    updateScrollState();
  }, [updateScrollState]);

  const scrollByDirection = React.useCallback(
    (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const amount = getEffectiveStep();
      if (!amount) return;

      const next =
        direction === 'left' ? container.scrollLeft - amount : container.scrollLeft + amount;

      container.scrollTo({
        left: next,
        behavior: 'smooth',
      });
    },
    [getEffectiveStep]
  );

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [handleScroll, updateScrollState]);

  return (
    <section className={cn('flex w-full flex-col gap-8', className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="twenty-eight font-semibold">{title}</h2>

        {isScrollable && (
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="outline"
              icon={<ScrollArrowRightIcon size={20} className="rotate-180" />}
              iconPlacement="center"
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              className="h-14 w-14 rounded-xl"
              style={{
                borderColor: theme.colors.border.secondary,
                backgroundColor: theme.colors.background.default,
                color: canScrollLeft ? theme.icons.active : theme.icons.disabled,
              }}
              onClick={() => scrollByDirection('left')}
            />
            <Button
              size="icon"
              variant="outline"
              icon={<ScrollArrowRightIcon size={20} />}
              iconPlacement="center"
              aria-label="Scroll right"
              disabled={!canScrollRight}
              className="h-14 w-14 rounded-xl"
              style={{
                borderColor: theme.colors.border.secondary,
                backgroundColor: theme.colors.background.default,
                color: canScrollRight ? theme.icons.active : theme.icons.disabled,
              }}
              onClick={() => scrollByDirection('right')}
            />
          </div>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide overflow-x-auto overflow-y-hidden"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        <div className="flex gap-5">{children}</div>
      </div>
    </section>
  );
};
