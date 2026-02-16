import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { HospitalOrPetServicesCardProps } from '@/modules/home/layouts/HospitalOrPetServicesCard';
import { ViewType } from '@/components/shared/navbar/types';

// ============================================
// DUMMY DATA
// ============================================
const initialHospital: HospitalOrPetServicesCardProps = {
  name: 'VetCare Hospital',
  location: '123 Main Street, Downtown',
  rating: 4.9,
  price: 100,
  favorite: false,
  imageSrc:
    'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  chips: [
    { label: 'Open Now', variant: 'success' },
    { label: '24/7 Emergency', variant: 'warning' },
  ],
};

// ============================================
// CONSTANTS
// ============================================
const PAGE_SIZE = 25;
const TOTAL_HOSPITALS = 200;

// ============================================
// HOOK
// ============================================
export function useSearchedOrDefaultHospitalsNearYou() {
  const searchParams = useSearchParams();

  // ============================================
  // PAGINATION STATE & LOGIC
  // ============================================
  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const isInitialMount = useRef(true);
  const prevPageRef = useRef(currentPage);

  // ============================================
  // HOSPITALS DATA
  // ============================================
  // Create 200 hospitals by mapping the initial hospital
  const allHospitals = useMemo(() => {
    return Array.from({ length: TOTAL_HOSPITALS }, (_, index) => ({
      ...initialHospital,
      name: `${initialHospital.name} ${index + 1}`,
    }));
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(allHospitals.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // ============================================
  // FAVORITES STATE & LOGIC
  // ============================================
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Get paginated hospitals with favorite state applied
  const paginatedHospitals = useMemo(() => {
    return allHospitals.slice(startIndex, endIndex).map((hospital) => ({
      ...hospital,
      favorite: favorites[hospital.name] ?? false,
    }));
  }, [allHospitals, startIndex, endIndex, favorites]);

  const handleFavoriteToggle = (index: number, favorite: boolean) => {
    const hospital = paginatedHospitals[index];
    setFavorites((prev) => ({
      ...prev,
      [hospital.name]: favorite,
    }));
  };

  // ============================================
  // NAVBAR STATE & LOGIC
  // ============================================
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  // Watch for navbar expansion state changes
  useEffect(() => {
    const checkNavbarState = () => {
      if (typeof document !== 'undefined') {
        const expanded = document.body.getAttribute('data-navbar-expanded') === 'true';
        setIsNavbarExpanded(expanded);
      }
    };

    // Check initial state
    checkNavbarState();

    // Watch for changes using MutationObserver
    const observer = new MutationObserver(checkNavbarState);
    if (typeof document !== 'undefined') {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-navbar-expanded'],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // ============================================
  // VIEW TYPE STATE & LOGIC
  // ============================================
  const [viewType, setViewType] = useState<ViewType>('list');

  // Watch for view type changes from navbar
  useEffect(() => {
    const checkViewType = () => {
      if (typeof document !== 'undefined') {
        const view = document.body.getAttribute('data-view-type') as ViewType | null;
        if (view === 'list' || view === 'map') {
          setViewType(view);
        }
      }
    };

    // Check initial state
    checkViewType();

    // Watch for changes using MutationObserver
    const observer = new MutationObserver(checkViewType);
    if (typeof document !== 'undefined') {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-view-type'],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // ============================================
  // SCROLL BEHAVIOR
  // ============================================
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll to top of section when page changes (but not on initial load without page param)
  useEffect(() => {
    // Check if there's a page param in URL (means user navigated to a specific page)
    const hasPageParam = searchParams.has('page');

    // Skip scroll on initial mount if there's no page param
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPageRef.current = currentPage;
      // If no page param on initial load, don't scroll
      if (!hasPageParam) {
        return;
      }
    }

    // Scroll if page changed and section exists
    if (currentPage !== prevPageRef.current && sectionRef.current) {
      // Use scrollIntoView which respects scroll-margin-top
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    prevPageRef.current = currentPage;
  }, [currentPage, searchParams]);

  // ============================================
  // RETURN VALUES
  // ============================================
  return {
    // Data
    allHospitals,
    paginatedHospitals,
    totalHospitals: allHospitals.length,

    // Pagination
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE,

    // Favorites
    handleFavoriteToggle,

    // Navbar
    isNavbarExpanded,

    // View Type
    viewType,

    // Scroll
    sectionRef,
  };
}
