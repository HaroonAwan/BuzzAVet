import { useGetVetsNearYouQuery } from '@/apis/vets/vetsApi';
import { FAVORITE_ITEM_TYPE, SERVICE_TYPE } from '@/lib/enums';
import { extractApiError } from '@/types/api';
import type { TelemedicineCardProps } from '@/modules/home/layouts/TelemedicineCard';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useToggleFavoriteMutation } from '@/apis/favorite/favoriteApi';

const PAGE_SIZE = 25;
const MILES = 500000000;

export function useSearchedOrDefaultTelemedicinesNearYou() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [toggleFavorite] = useToggleFavoriteMutation();

  const currentPage = useMemo(() => {
    // get path name from url using next-Navigation

    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const { data, isLoading, error } = useGetVetsNearYouQuery({
    QUERY: {
      page: currentPage,
      perPage: PAGE_SIZE,
      serviceType:
        pathname === '/mobile-vets' ? SERVICE_TYPE.MOBILE_VET : SERVICE_TYPE.TELEMEDICINE,
      miles: MILES,
    },
    BODY: {},
  });

  const vets = data?.data || [];
  const totalTelemedicines = data?.totalCount || 0;
  const totalPages = data?.totalPages || 1;

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const paginatedTelemedicines: TelemedicineCardProps[] = useMemo(() => {
    return vets.map((vet) => {
      const id = vet._id;
      return {
        id,
        name: `Dr. ${vet.firstName} ${vet.lastName}`,
        specialization:
          vet.profile?.specialties?.certifiedVeterinarySpecialist?.[0] ||
          vet.profile?.areaOfExpertise?.typesOfProcedures?.[0] ||
          'General Practice',
        clinicName: vet.profile?.businessDetails?.name || 'Telemedicine',
        nextAvailable: 'See Profile',
        rating: vet.ratings || 0,
        fee:
          vet.profile?.telemedicine?.pricing?.per30MinPrice ||
          vet.profile?.telemedicine?.pricing?.per10MinPrice ||
          0,
        favorite: favorites[id] ?? vet.isFavorite ?? false,
        imageSrc: vet.profile?.documents?.profilePhoto?.path || '',
      };
    });
  }, [vets, favorites]);

  const handleFavoriteToggle = async (index: number, favorite: boolean) => {
    const vet = paginatedTelemedicines[index];
    const key = vet.id || vet.name;
    setFavorites((prev) => ({
      ...prev,
      [key]: favorite,
    }));
    if (!vet.id) return;
    try {
      await toggleFavorite({
        itemType: FAVORITE_ITEM_TYPE.PERSON,
        item: vet.id,
      }).unwrap();
    } catch (e) {
      setFavorites((prev) => ({
        ...prev,
        [key]: !favorite,
      }));
    }
  };

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

  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  useEffect(() => {
    const checkViewType = () => {
      if (typeof document !== 'undefined') {
        const view = document.body.getAttribute('data-view-type') as 'list' | 'map' | null;
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

  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const prevPageRef = { current: currentPage };
    if (currentPage !== prevPageRef.current && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    prevPageRef.current = currentPage;
  }, [currentPage, searchParams]);

  return {
    paginatedTelemedicines,
    totalTelemedicines,
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE,
    hasMorePages: currentPage < totalPages,
    handleFavoriteToggle,
    isNavbarExpanded,
    viewType,
    sectionRef,
    isLoading,
    error: extractApiError(error),
  };
}
