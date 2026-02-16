'use client';

import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import { Pagination } from '@/components/shared/Pagination';
import { useSearchedOrDefaultTelemedicinesNearYou } from '../hooks/useSearchedOrDefaultTelemedicinesNearYou';
import { theme } from '@/lib/theme';
import { TelemedicineCard } from '@/modules/home/layouts/TelemedicineCard';
import SectionsWrapper from '@/layouts/SectionsWrapper';

const NearYouTeleMedicines = () => {
  const {
    paginatedTelemedicines,
    totalTelemedicines,
    currentPage,
    totalPages,
    handleFavoriteToggle,
    isNavbarExpanded,
    viewType,
    sectionRef,
  } = useSearchedOrDefaultTelemedicinesNearYou();

  return (
    <SectionsWrapper noContainer>
      <div className="flex flex-col gap-6">
        <p className="font-semibold">{totalTelemedicines} Telemedicine Services Near you</p>
        <h2 className="twenty-eight font-semibold">Other Telemedicine Services Near You</h2>
        {viewType === 'list' ? (
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
                />
              ))}
            </section>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
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
              Map will be integrated later
            </p>
          </div>
        )}
      </div>
    </SectionsWrapper>
  );
};

export default NearYouTeleMedicines;
