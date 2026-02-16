import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Import TelemedicineCardProps for type safety
import type { TelemedicineCardProps } from '@/modules/home/layouts/TelemedicineCard';

// Dummy data for telemedicine services (matching TelemedicineCardProps)
const initialTelemedicine: TelemedicineCardProps = {
  name: 'Dr. Jane Doe',
  specialization: 'Veterinary Surgeon',
  clinicName: 'TeleVet Clinic',
  nextAvailable: 'Today, 3:00 PM',
  rating: 4.8,
  fee: 50,
  imageSrc:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  favorite: false,
};

const PAGE_SIZE = 25;
const TOTAL_TELEMEDICINES = 100;

export function useSearchedOrDefaultTelemedicinesNearYou() {
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const isInitialMount = useRef(true);
  const prevPageRef = useRef(currentPage);

  // Create 100 telemedicine services
  const allTelemedicines = useMemo(() => {
    return Array.from({ length: TOTAL_TELEMEDICINES }, (_, index) => ({
      ...initialTelemedicine,
      name: `Dr. Jane Doe ${index + 1}`,
      specialization: index % 2 === 0 ? 'Veterinary Surgeon' : 'Animal Nutritionist',
      clinicName: `TeleVet Clinic #${(index % 10) + 1}`,
      nextAvailable: `Today, ${2 + (index % 8)}:00 PM`,
      rating: 4.5 + (index % 5) * 0.1,
      fee: 40 + (index % 5) * 5,
      imageSrc: initialTelemedicine.imageSrc,
      favorite: false,
    }));
  }, []);

  const totalPages = Math.ceil(allTelemedicines.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const paginatedTelemedicines = useMemo(() => {
    return allTelemedicines.slice(startIndex, endIndex).map((service) => ({
      ...service,
      favorite: favorites[service.name] ?? false,
    }));
  }, [allTelemedicines, startIndex, endIndex, favorites]);

  const handleFavoriteToggle = (index: number, favorite: boolean) => {
    const service = paginatedTelemedicines[index];
    setFavorites((prev) => ({
      ...prev,
      [service.name]: favorite,
    }));
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

  return {
    allTelemedicines,
    paginatedTelemedicines,
    totalTelemedicines: allTelemedicines.length,
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE,
    handleFavoriteToggle,
    isNavbarExpanded,
    viewType,
    sectionRef,
  };
}
