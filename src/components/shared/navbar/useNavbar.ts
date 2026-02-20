import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ServiceCategory, ViewType, RecentSearch, RecentServiceSearch } from './types';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/apis/auth/authSlice';
import { FilterState } from '../popover';
import { useForm } from 'react-hook-form';
import { useGetHospitalServicesQuery } from '@/apis/dropdownOptions/dropdownOptionsApi';

interface UseNavbarProps {
  onApply?: (filters: FilterState) => void;
  onClearAll?: () => void;
}

export function useNavbar({ onApply, onClearAll }: UseNavbarProps = {}) {
  const { data } = useGetHospitalServicesQuery();
  console.log('🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️ ~ useNavbar ~ data:', data);
  // Build medical services and facilities lists from API response
  const medicalServicesOptions = (data || [])
    .filter((item: any) => item.type === 'MEDICAL_SERVICES')
    .map((item: any) => {
      let title = (item.title || '').trim();
      // quick fix for common misspellings
      const id = item._id || item.slug || title.toLowerCase().replace(/\s+/g, '-');
      return { id, title };
    });

  const facilitiesOptions = (data || [])
    .filter((item: any) => item.type === 'FACILITIES')
    .map((item: any) => {
      let title = (item.title || '').trim();
      const id = item._id || item.slug || title.toLowerCase().replace(/\s+/g, '-');
      return { id, title };
    });
  const form = useForm<FilterState>({
    defaultValues: {
      consultationFee: { minPrice: 24, maxPrice: 500 },
      minRating: null,
      maxMiles: 5000,
      emergencyServices: false,
      medicalServices: [],
      facilities: [],
      accreditations: { isFearFreeCertified: false, isAAHAACertified: false },
      gender: [],
      languages: [],
      insuranceAccepted: [],
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = form;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  let heading = 'Hospitals In';
  let activeSlug = 'hospitals';
  if (pathname === '/' || !pathname) {
    heading = 'Search All Services In';
    activeSlug = 'search';
  } else if (pathname.startsWith('/hospitals')) {
    heading = 'Hospitals In';
    activeSlug = 'hospitals';
  } else if (pathname.startsWith('/telemedicine')) {
    heading = 'Telemedicine In';
    activeSlug = 'telemedicine';
  } else if (pathname.startsWith('/mobile-vets')) {
    heading = 'Mobile Vets In';
    activeSlug = 'mobile-vets';
  } else if (pathname.startsWith('/pet-services')) {
    heading = 'Pet Services In';
    activeSlug = 'pet-services';
  } else {
    activeSlug = 'search';
  }

  const getAppliedFiltersCount = (filters: FilterState) => {
    let count = 0;
    if (filters.consultationFee.minPrice !== 24 || filters.consultationFee.maxPrice !== 500)
      count++;
    if (filters.minRating) count++;
    if (filters.maxMiles !== 5000) count++;
    if (filters.emergencyServices) count++;
    if (filters.medicalServices && filters.medicalServices.length > 0) count++;
    if (filters.facilities && filters.facilities.length > 0) count++;
    if (
      filters.accreditations &&
      (filters.accreditations.isAAHAACertified || filters.accreditations.isFearFreeCertified)
    )
      count++;
    if (filters.insuranceAccepted && filters.insuranceAccepted.length > 0) count++;
    if (filters.gender && (filters.gender as any).length > 0) count++;
    if (filters.languages && filters.languages.length > 0) count++;
    return count;
  };

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('hospital');
  const [locationValue, setLocationValue] = useState('Toronto, Canada');
  const [serviceTypeValue, setServiceTypeValue] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showServiceTypeDropdown, setShowServiceTypeDropdown] = useState(false);
  const [isServiceTypeFocused, setIsServiceTypeFocused] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [viewType, setViewType] = useState<ViewType>('list');
  const [recentSearches] = useState<RecentSearch[]>([
    { id: '1', location: 'Toronto, Canada' },
    { id: '2', location: 'Chicago, Canada' },
    { id: '3', location: 'Chicago, Canada' },
  ]);
  const [recentServiceSearches] = useState<RecentServiceSearch[]>([
    { id: '1', service: 'Dermatology' },
    { id: '2', service: 'Cardiology' },
    { id: '3', service: 'Dermatology' },
  ]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['medical-services'])
  );
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const serviceTypeInputRef = useRef<HTMLInputElement>(null);
  const serviceTypeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }

      if (
        serviceTypeDropdownRef.current &&
        !serviceTypeDropdownRef.current.contains(event.target as Node) &&
        serviceTypeInputRef.current &&
        !serviceTypeInputRef.current.contains(event.target as Node)
      ) {
        setShowServiceTypeDropdown(false);
      }
    };

    if (showLocationDropdown || showServiceTypeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLocationDropdown, showServiceTypeDropdown]);

  useEffect(() => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    const newFilters: Partial<FilterState> = {};
    // Dynamic: use all keys in FilterState
    if (params.has('min') || params.has('max')) {
      newFilters.consultationFee = {
        minPrice: params.has('min') ? Number(params.get('min')) : 24,
        maxPrice: params.has('max') ? Number(params.get('max')) : 500,
      };
    }
    if (params.has('minRating') || params.has('rating')) {
      newFilters.minRating = params.get('minRating') || params.get('rating');
    }
    if (params.has('maxMiles')) {
      newFilters.maxMiles = Number(params.get('maxMiles'));
    }
    if (params.has('emergencyServices')) {
      newFilters.emergencyServices = params.get('emergencyServices') === 'true';
    }
    // Multi-selects: arrays (include languages and gender)
    ['medicalServices', 'facilities', 'insuranceAccepted', 'languages', 'gender'].forEach((key) => {
      if (params.has(key)) {
        (newFilters as any)[key] = params.get(key)?.split(';').filter(Boolean) || [];
      }
    });
    // Accreditations: individual boolean flags
    if (params.has('isFearFreeCertified') || params.has('isAAHAACertified')) {
      (newFilters as any).accreditations = {
        isFearFreeCertified: params.get('isFearFreeCertified') === 'true',
        isAAHAACertified: params.get('isAAHAACertified') === 'true',
      };
    }
    // Set values if any
    if (Object.keys(newFilters).length > 0) {
      form.reset({
        consultationFee: newFilters.consultationFee || { minPrice: 24, maxPrice: 500 },
        minRating: newFilters.minRating ?? null,
        maxMiles: newFilters.maxMiles ?? 10000,
        emergencyServices: newFilters.emergencyServices ?? false,
        medicalServices: newFilters.medicalServices || [],
        facilities: newFilters.facilities || [],
        accreditations: newFilters.accreditations || {
          isFearFreeCertified: false,
          isAAHAACertified: false,
        },
        gender: newFilters.gender || [],
        languages: newFilters.languages || [],
        insuranceAccepted: newFilters.insuranceAccepted || [],
      });
    }
  }, [searchParams]);

  const handleLocationFocus = () => {
    setIsSearchExpanded(true);
    setShowLocationDropdown(true);
  };

  const handleLocationClick = () => {
    setIsSearchExpanded(true);
    setShowLocationDropdown(true);
    locationInputRef.current?.focus();
  };

  const handleLocationSelect = (location: string) => {
    setLocationValue(location);
    setShowLocationDropdown(false);
  };

  const handleClearLocation = () => {
    setLocationValue('');
    locationInputRef.current?.focus();
  };

  const handleClearRecentSearches = () => {
    console.log('Clear recent searches');
  };

  const handleClearRecentServiceSearches = () => {
    console.log('Clear recent service searches');
  };

  const handleNearbyClick = () => {
    console.log('Find nearby');
    setShowLocationDropdown(false);
  };

  const handleServiceTypeFocus = () => {
    setShowServiceTypeDropdown(true);
  };

  const handleServiceTypeClick = () => {
    setShowServiceTypeDropdown(true);
    serviceTypeInputRef.current?.focus();
  };

  const handleServiceTypeSelect = (service: string) => {
    setServiceTypeValue(service);
    setShowServiceTypeDropdown(false);
  };
  const handleLoginClick = () => {
    router.push('/auth/login');
  };
  const handleRegisterClick = () => {
    router.push('/auth/register');
  };
  const handleAccountSettingsClick = () => {
    router.push('/user-menu');
  };

  const handleCategorySelect = (category: ServiceCategory, route: string) => {
    setSelectedCategory(category);
    router.push(route);
  };

  const filters = watch();

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleClearAll = () => {
    reset({
      consultationFee: { minPrice: 24, maxPrice: 500 },
      minRating: null,
      maxMiles: 10000,
      emergencyServices: false,
      medicalServices: [],
      facilities: [],
      accreditations: { isFearFreeCertified: false, isAAHAACertified: false },
      gender: [],
      languages: [],
      insuranceAccepted: [],
    });
    onClearAll?.();
  };

  // Use dynamic query keys based on filter titles
  const onSubmit = (data: FilterState) => {
    // Ensure all numeric values are integers
    const roundedData: FilterState = {
      ...data,
      consultationFee: {
        minPrice: Math.round(data.consultationFee.minPrice),
        maxPrice: Math.round(data.consultationFee.maxPrice),
      },
      maxMiles: Math.round(data.maxMiles),
    };

    const params = new URLSearchParams(searchParams?.toString() || '');

    // Use dynamic keys for all filters
    // Consultation Fee
    if (roundedData.consultationFee.minPrice !== 24) {
      params.set('minPrice', String(roundedData.consultationFee.minPrice));
    } else {
      params.delete('minPrice');
    }
    if (roundedData.consultationFee.maxPrice !== 500) {
      params.set('maxPrice', String(roundedData.consultationFee.maxPrice));
    } else {
      params.delete('maxPrice');
    }
    // Minimum Rating (use minRating as key)
    if (roundedData.minRating) {
      params.set('minRating', roundedData.minRating);
    } else {
      params.delete('minRating');
    }
    // maxMiles
    if (roundedData.maxMiles !== 10000) {
      params.set('maxMiles', String(roundedData.maxMiles));
    } else {
      params.delete('maxMiles');
    }
    // Emergency Services
    if (roundedData.emergencyServices) {
      params.set('emergencyServices', 'true');
    } else {
      params.delete('emergencyServices');
    }
    // Only push filters relevant to the current route.
    // `consultationFee` is handled above (minPrice/maxPrice), so exclude it here.
    let keysToProcess = Object.keys(roundedData).filter((k) => k !== 'consultationFee');
    if (activeSlug === 'telemedicine' || activeSlug === 'mobile-vets') {
      // For telemedicine & mobile-vets only allow rating, gender and languages (and consultationFee handled above)
      keysToProcess = keysToProcess.filter((k) => ['minRating', 'gender', 'languages'].includes(k));
    }

    keysToProcess.forEach((key) => {
      const value: any = (roundedData as any)[key];
      if (Array.isArray(value) && value.length > 0) {
        // Use set with custom encoding to avoid encoding ';'
        params.delete(key); // Remove any existing
        const joined = value.join(';');
        // Manually append to avoid encoding ';'
        params.append(key, joined);
        return;
      }
      if (Array.isArray(value) && value.length === 0) {
        params.delete(key);
        return;
      }
      // gender handled as array above (joined with ';')
      // Accreditations object -> serialize as a JSON param and remove any top-level flags
      if (key === 'accreditations' && typeof value === 'object' && value !== null) {
        try {
          params.set('accreditations', JSON.stringify(value));
        } catch (e) {
          // fallback: set individual flags if serialization fails
          const acc = value as { [k: string]: boolean };
          Object.entries(acc).forEach(([k, v]) => {
            params.set(k, v ? 'true' : 'false');
          });
        }
        // Ensure we do not leave duplicate top-level accreditation flags
        params.delete('isFearFreeCertified');
        params.delete('isAAHAACertified');
        return;
      }
      // Fallback: set primitive values directly
      if (value !== undefined && value !== null && typeof value !== 'object') {
        params.set(key, String(value));
      }
    });

    // Build query string with custom encoding to preserve ';'
    const queryString = Array.from(params.entries())
      .map(([k, v]) => `${encodeURIComponent(k)}=${v.replace(/;/g, ';')}`)
      .join('&');

    // Push to URL
    router.push(`${pathname}?${queryString}`);

    onApply?.(roundedData);
  };

  const toggleService = (
    serviceId: string,
    category: 'medicalServices' | 'facilities' | 'insuranceAccepted' | 'languages' | 'gender'
  ) => {
    const currentValues = (filters as any)[category] || [];
    const newValues = currentValues.includes(serviceId)
      ? currentValues.filter((id: string) => id !== serviceId)
      : [...currentValues, serviceId];
    setValue(category as any, newValues);
  };

  const toggleAccreditation = (key: 'isFearFreeCertified' | 'isAAHAACertified') => {
    const current = (filters as any).accreditations || {
      isFearFreeCertified: false,
      isAAHAACertified: false,
    };
    setValue('accreditations' as any, {
      ...current,
      [key]: !current[key],
    });
  };

  const dummyUser =
    'https://0.gravatar.com/avatar/fb0cd172ed03b131feb040f34db10fef8156d773f9891c8cadc23ca9e43730ba?s=1040';

  return {
    heading,
    activeSlug,
    // State
    isSearchExpanded,
    selectedCategory,
    locationValue,
    serviceTypeValue,
    showLocationDropdown,
    showServiceTypeDropdown,
    isServiceTypeFocused,
    viewType,
    recentSearches,
    recentServiceSearches,
    isAuthenticated,
    // Refs
    locationInputRef,
    locationDropdownRef,
    serviceTypeInputRef,
    serviceTypeDropdownRef,
    dummyUser,
    // Handlers
    handleLocationFocus,
    handleLocationClick,
    handleLocationSelect,
    handleClearLocation,
    handleClearRecentSearches,
    handleClearRecentServiceSearches,
    handleNearbyClick,
    handleServiceTypeFocus,
    handleServiceTypeClick,
    handleServiceTypeSelect,
    handleCategorySelect,
    setLocationValue,
    setServiceTypeValue,
    setIsServiceTypeFocused,
    setViewType,
    handleLoginClick,
    handleAccountSettingsClick,
    handleRegisterClick,
    toggleSection,
    onSubmitForm: handleSubmit(onSubmit),
    toggleService,
    medicalServicesOptions,
    facilitiesOptions,
    toggleAccreditation,
    getAppliedFiltersCount,
    filters,
    handleClearAll,
    expandedSections,
    control,
  };
}
