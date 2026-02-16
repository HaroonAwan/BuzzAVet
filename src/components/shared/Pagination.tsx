'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { ArrowIcon } from '@/assets/icon-components';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Pagination Component
 *
 * A reusable pagination component that handles page navigation through URL query parameters.
 * Matches Figma design with rounded buttons, active/inactive states, and ellipsis.
 *
 * When next/prev buttons or page numbers are clicked, the component updates the URL query parameter 'page',
 * which can be read by hooks using `useSearchParams` to trigger API calls.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   pageSize={24}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Integration with hook for API calls
 * // In your hook (e.g., useHospitals.ts):
 * export function useHospitals() {
 *   const searchParams = useSearchParams();
 *
 *   // Get current page from URL (updated by Pagination component)
 *   const currentPage = useMemo(() => {
 *     const page = searchParams.get('page');
 *     return page ? parseInt(page, 10) : 1;
 *   }, [searchParams]);
 *
 *   // Use currentPage in API call
 *   useEffect(() => {
 *     fetchHospitals({ page: currentPage, pageSize: 24 })
 *       .then(setHospitals);
 *   }, [currentPage]);
 *
 *   return { hospitals, currentPage };
 * }
 *
 * // In your component:
 * const { hospitals, currentPage } = useHospitals();
 * const totalPages = Math.ceil(totalCount / 24);
 *
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   pageSize={24}
 * />
 * ```
 *
 * @param props - Pagination component props
 * @param props.currentPage - The current active page number (1-indexed), typically read from URL via `useSearchParams`
 * @param props.totalPages - The total number of pages available
 * @param props.pageSize - Number of items per page (default: 24)
 *
 * @remarks
 * - Clicking next/prev or a page number updates the URL query parameter `?page=N`
 * - Hooks should use `useSearchParams()` to read the page number and trigger API calls
 * - The component preserves other URL query parameters when updating the page
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

/**
 * Calculate which page numbers to display with ellipsis logic
 */
function calculatePageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage <= 4) {
      // Show pages 1-5, then ellipsis, then last
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Show first, ellipsis, then last 5 pages
      pages.push('ellipsis');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, ellipsis, current-1, current, current+1, ellipsis, last
      pages.push('ellipsis');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('ellipsis');
      pages.push(totalPages);
    }
  }

  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Handles navigation to a specific page.
   * Updates the URL query parameter 'page' while preserving other search parameters.
   */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    // Always set the page param, even if 1
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  /**
   * Handles navigation to the next page.
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  /**
   * Handles navigation to the previous page.
   */
  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // If no page param or page=1, treat as 1
  const isFirstPage = !searchParams.get('page') || String(currentPage) === '1';
  const isLastPage = currentPage === totalPages;

  // Calculate which page numbers to display
  const pageNumbers = useMemo(
    () => calculatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <PaginationRoot>
      <PaginationContent className="gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <Button
            onClick={handlePrev}
            disabled={isFirstPage}
            variant="ghost"
            size="icon"
            icon={
              <ArrowIcon
                size={20}
                rotate={180}
                style={{
                  color: isFirstPage ? '#9CA3AF' : '#374151',
                }}
              />
            }
            iconPlacement="center"
            className={cn(
              'h-10 w-10 rounded-[10px] p-0',
              'disabled:cursor-not-allowed',
              isFirstPage ? 'bg-(--bg-tertiary)' : 'border bg-transparent'
            )}
            aria-label="Go to previous page"
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis
                  className="text-gray-700"
                  style={{ color: theme.colors.text.default }}
                />
              </PaginationItem>
            );
          }

          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <Button
                onClick={() => handlePageChange(page)}
                variant="ghost"
                size="icon"
                className={cn(
                  'h-10 w-10 rounded-[10px] p-0',
                  'text-sm font-semibold',
                  isActive ? 'cursor-default' : 'cursor-pointer'
                )}
                style={
                  isActive
                    ? {
                        backgroundColor: theme.colors.active,
                        color: 'white',
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: theme.colors.text.default,
                      }
                }
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </Button>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <Button
            onClick={handleNext}
            disabled={isLastPage}
            variant="ghost"
            size="icon"
            icon={
              <ArrowIcon
                size={20}
                rotate={0}
                style={{
                  color: isLastPage ? '#9CA3AF' : '#374151',
                }}
              />
            }
            iconPlacement="center"
            className={cn(
              'h-10 w-10 rounded-[10px] p-0',
              'disabled:cursor-not-allowed',
              isLastPage ? 'bg-(--bg-tertiary)' : 'border bg-transparent'
            )}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
