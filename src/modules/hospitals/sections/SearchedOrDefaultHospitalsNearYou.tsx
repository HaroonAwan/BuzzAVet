'use client';

import ContentBodyWrapper from '@/layouts/ContentBodyWrapper';
import { HospitalOrPetServicesCard } from '@/modules/home/layouts/HospitalOrPetServicesCard';
import { Pagination } from '@/components/shared/Pagination';
import { useSearchedOrDefaultHospitalsNearYou } from '../hooks/useSearchedOrDefaultHospitalsNearYou';
import { theme } from '@/lib/theme';
import Loading from '@/components/shared/states/Loading';
import Error from '@/components/shared/states/Error';
import NoData from '@/components/shared/states/NoData';

const SearchedOrDefaultHospitalsNearYou = () => {
  const {
    paginatedHospitals,
    currentPage,
    handleFavoriteToggle,
    isNavbarExpanded,
    viewType,
    sectionRef,
    nearYouHospitals,
    hasPages,
  } = useSearchedOrDefaultHospitalsNearYou();
  const { hospitalsError, hospitalsIsLoading, totalHospitals, totalPages } = nearYouHospitals;
  return (
    <ContentBodyWrapper>
      <div className="flex flex-col gap-6">
        <p className="font-semibold">{totalHospitals} Results Near you</p>
        <h2 className="twenty-eight font-semibold">Other Hospitals Near You</h2>
        {viewType === 'list' ? (
          <>
            {hospitalsIsLoading ? (
              <Loading width={300} height={200} />
            ) : !hospitalsIsLoading && paginatedHospitals.length === 0 && !hospitalsError ? (
              <NoData width={300} height={200} />
            ) : hospitalsError ? (
              <Error width={300} height={200} message={hospitalsError?.message} />
            ) : (
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
                  {paginatedHospitals.map((hospital, index) => (
                    <HospitalOrPetServicesCard
                      key={`${hospital.name}-${index}`}
                      {...hospital}
                      onFavoriteToggle={(favorite) => handleFavoriteToggle(index, favorite)}
                      isDynamicWidth
                    />
                  ))}
                </section>
                {hasPages && <Pagination currentPage={currentPage} totalPages={totalPages} />}
              </>
            )}
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
              Map will be integrated Soon
            </p>
          </div>
        )}
      </div>
    </ContentBodyWrapper>
  );
};

export default SearchedOrDefaultHospitalsNearYou;
