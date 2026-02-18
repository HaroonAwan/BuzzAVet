'use client';

import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import { Pagination } from '@/components/shared/Pagination';
import { useSearchedOrDefaultTelemedicinesNearYou } from '../hooks/useSearchedOrDefaultTelemedicinesNearYou';
import { theme } from '@/lib/theme';
import { TelemedicineCard } from '@/modules/home/layouts/TelemedicineCard';
import SectionsWrapper from '@/layouts/SectionsWrapper';
import ApiResponseWrapper from '@/components/shared/states/ApiResponseWrapper';
import { usePathname } from 'next/navigation';

const NearYouVets = () => {
  const pathname = usePathname();
  const {
    paginatedTelemedicines,
    totalTelemedicines,
    currentPage,
    totalPages,
    handleFavoriteToggle,
    isNavbarExpanded,
    viewType,
    sectionRef,
    isLoading: telemedicinesIsLoading,
    error: telemedicinesError,
    hasMorePages,
  } = useSearchedOrDefaultTelemedicinesNearYou();

  return (
    <SectionsWrapper noContainer>
      <div className="flex flex-col gap-6">
        <p className="font-semibold">
          {totalTelemedicines} {pathname.includes('/mobile-vets') ? 'Mobile Vet' : 'Telemedicine'}{' '}
          Services Near you
        </p>
        <h2 className="twenty-eight font-semibold">
          Other {pathname.includes('/mobile-vets') ? 'Mobile Vet' : 'Telemedicine'} Services Near
          You
        </h2>
        {viewType === 'list' ? (
          <ApiResponseWrapper
            isLoading={telemedicinesIsLoading}
            hasError={!!telemedicinesError}
            hasData={paginatedTelemedicines.length > 0}
            loadingSize={{ width: 300, height: 200 }}
            errorSize={{ width: 300, height: 200 }}
            hasDataSize={{ width: 300, height: 200 }}
          >
            <>
              <section
                ref={sectionRef}
                className="grid gap-5"
                style={{
                  scrollMarginTop: isNavbarExpanded ? '230px' : '170px',
                  transition: 'scrollMarginTop 0.3s ease-in-out',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(203px, 1fr))',
                }}
              >
                {paginatedTelemedicines.map((service, index) => (
                  <TelemedicineCard
                    key={`${service.name}-${index}`}
                    {...service}
                    onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
                    className="isDynamicWidth"
                    pathname={pathname}
                  />
                ))}
              </section>
              {hasMorePages && <Pagination currentPage={currentPage} totalPages={totalPages} />}
            </>
          </ApiResponseWrapper>
        ) : (
          <div
            ref={sectionRef as React.RefObject<HTMLDivElement | null>}
            className="flex items-center justify-center py-20"
            style={{
              scrollMarginTop: isNavbarExpanded ? '230px' : '170px',
              transition: 'scrollMarginTop 0.3s ease-in-out',
            }}
          >
            <p className="text-lg font-medium" style={{ color: theme.colors.text.secondary }}>
              Map will be integrated Soon
            </p>
          </div>
        )}
      </div>
    </SectionsWrapper>
  );
};

export default NearYouVets;
