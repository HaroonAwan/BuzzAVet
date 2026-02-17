import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { HospitalOrPetServicesCardProps } from '@/modules/home/layouts/HospitalOrPetServicesCard';
import { ViewType } from '@/components/shared/navbar/types';
import { useGetHospitalsNearYouQuery } from '@/apis/hospitals/hospitalsApi';
import { extractApiError } from '@/types/api';
import type { HospitalsNearYouResponse, Hospital } from '@/types/hospitalsTypes';
import { useToggleFavoriteMutation } from '@/apis/favorite/favoriteApi';
import { FAVORITE_ITEM_TYPE } from '@/lib/enums';
import toast from 'react-hot-toast';

// ============================================
// CONSTANTS
// ============================================

const PAGE_SIZE = 24;

// ============================================
// HOOK
// ============================================
export const useSearchedOrDefaultHospitalsNearYou = () => {
  const searchParams = useSearchParams();
  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const { data, error, isLoading } = useGetHospitalsNearYouQuery({
    QUERY: { page: currentPage, perPage: PAGE_SIZE },
    BODY: {},
  }) as { data?: HospitalsNearYouResponse; error?: any; isLoading: boolean };
  console.log('🚀 ~ useSearchedOrDefaultHospitalsNearYou ~ data:', data);
  const [toggleFavorite, { isLoading: isTogglingFavorite }] = useToggleFavoriteMutation();

  // ============================================
  // FAVORITES STATE & LOGIC
  // ============================================
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const paginatedHospitals: HospitalOrPetServicesCardProps[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((hospital: Hospital) => {
      const id = hospital._id;
      const name = hospital.basicInformation?.name || '';
      const location = hospital.basicInformation?.address?.address || '';
      const rating = typeof hospital.ratings === 'number' ? hospital.ratings : 0;
      const imageSrc = hospital.documents?.profilePicture?.path || undefined;
      const favorite = typeof hospital.isFavorite === 'boolean' ? hospital.isFavorite : false;
      const type = hospital.details?.type || undefined;
      let chips: HospitalOrPetServicesCardProps['chips'] = [];
      if (Array.isArray(hospital.preferences?.appointmentConsistOf)) {
        if (hospital.preferences.appointmentConsistOf.includes('emergency')) {
          chips.push({ label: '24/7 Emergency', variant: 'warning' });
        }
        if (hospital.preferences.appointmentConsistOf.includes('openNow')) {
          chips.push({ label: 'Open Now', variant: 'success' });
        }
      }
      const price = hospital.pricing?.basePrice || 0;
      const favoriteKey = id || name;
      const slug = 'hospitals';
      const hasSessionBooking = false;
      const servesInArea = undefined;

      return {
        id,
        name,
        location,
        rating,
        imageSrc,
        favorite: favorites[favoriteKey] ?? favorite,
        chips,
        price,
        hasSessionBooking,
        servesInArea,
        type,
        slug,
        isDynamicWidth: false,
      };
    });
  }, [data, favorites]);

  const handleFavoriteToggle = async (index: number, favorite: boolean) => {
    const hospital = paginatedHospitals[index];
    const key = hospital.id || hospital.name;
    setFavorites((prev) => ({
      ...prev,
      [key]: favorite,
    }));
    if (!hospital.id) return;
    try {
      await toggleFavorite({
        itemType: FAVORITE_ITEM_TYPE.HOSPITAL,
        item: hospital.id,
      }).unwrap();
    } catch (e: any) {
      toast.error('Failed to update favorite. Please try again.');
      setFavorites((prev) => ({
        ...prev,
        [key]: !favorite,
      }));
    }
  };

  // ============================================
  // NAVBAR STATE & LOGIC
  // ============================================
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  useEffect(() => {
    const checkNavbarState = () => {
      if (typeof document !== 'undefined') {
        const expanded = document.body.getAttribute('data-navbar-expanded') === 'true';
        setIsNavbarExpanded(expanded);
      }
    };
    checkNavbarState();
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

  useEffect(() => {
    const checkViewType = () => {
      if (typeof document !== 'undefined') {
        const view = document.body.getAttribute('data-view-type') as ViewType | null;
        if (view === 'list' || view === 'map') {
          setViewType(view);
        }
      }
    };
    checkViewType();
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
  const isInitialMount = useRef(true);
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    const hasPageParam = searchParams.has('page');
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPageRef.current = currentPage;
      if (!hasPageParam) {
        return;
      }
    }
    if (currentPage !== prevPageRef.current && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    prevPageRef.current = currentPage;
  }, [currentPage, searchParams]);

  // ============================================
  // RETURN VALUES
  // ============================================
  return {
    paginatedHospitals,
    currentPage,
    pageSize: PAGE_SIZE,
    handleFavoriteToggle,
    isNavbarExpanded,
    viewType,
    sectionRef,
    nearYouHospitals: {
      totalPages: data?.totalPages ?? 1,
      hospitalsData: data?.data ?? [],
      totalHospitals: data?.totalCount ?? 0,
      hospitalsError: extractApiError(error),
      hospitalsIsLoading: isLoading,
      page: data?.page ?? 1,
      perPage: data?.perPage ?? PAGE_SIZE,
    },
  };
};
