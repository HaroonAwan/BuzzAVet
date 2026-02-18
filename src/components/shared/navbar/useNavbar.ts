import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ServiceCategory, ViewType, RecentSearch, RecentServiceSearch } from './types';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/apis/auth/authSlice';
import { FilterState } from '../popover';
import { useForm } from 'react-hook-form';

interface UseNavbarProps {
  onApply?: (filters: FilterState) => void;
  onClearAll?: () => void;
}

export function useNavbar({ onApply, onClearAll }: UseNavbarProps = {}) {
  const form = useForm<FilterState>({
    defaultValues: {
      consultationFee: { min: 24, max: 500 },
      minimumRating: null,
      distance: 50,
      emergencyServices: false,
      medicalServices: [],
      facilities: [],
      accreditations: [],
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
    if (filters.consultationFee.min !== 24 || filters.consultationFee.max !== 500) count++;
    if (filters.minimumRating) count++;
    if (filters.distance !== 50) count++;
    if (filters.emergencyServices) count++;
    if (filters.medicalServices && filters.medicalServices.length > 0) count++;
    if (filters.facilities && filters.facilities.length > 0) count++;
    if (filters.accreditations && filters.accreditations.length > 0) count++;
    if (filters.insuranceAccepted && filters.insuranceAccepted.length > 0) count++;
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
        min: params.has('min') ? Number(params.get('min')) : 24,
        max: params.has('max') ? Number(params.get('max')) : 500,
      };
    }
    if (params.has('minimumRating') || params.has('rating')) {
      newFilters.minimumRating = params.get('minimumRating') || params.get('rating');
    }
    if (params.has('distance')) {
      newFilters.distance = Number(params.get('distance'));
    }
    if (params.has('emergencyServices')) {
      newFilters.emergencyServices = params.get('emergencyServices') === 'true';
    }
    // Multi-selects: use all keys
    ['medicalServices', 'facilities', 'accreditations', 'insuranceAccepted'].forEach((key) => {
      if (params.has(key)) {
        (newFilters as any)[key] = params.get(key)?.split(';').filter(Boolean) || [];
      }
    });
    // Set values if any
    if (Object.keys(newFilters).length > 0) {
      form.reset({
        consultationFee: newFilters.consultationFee || { min: 24, max: 500 },
        minimumRating: newFilters.minimumRating ?? null,
        distance: newFilters.distance ?? 50,
        emergencyServices: newFilters.emergencyServices ?? false,
        medicalServices: newFilters.medicalServices || [],
        facilities: newFilters.facilities || [],
        accreditations: newFilters.accreditations || [],
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
      consultationFee: { min: 24, max: 500 },
      minimumRating: null,
      distance: 50,
      emergencyServices: false,
      medicalServices: [],
      facilities: [],
      accreditations: [],
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
        min: Math.round(data.consultationFee.min),
        max: Math.round(data.consultationFee.max),
      },
      distance: Math.round(data.distance),
    };

    const params = new URLSearchParams(searchParams?.toString() || '');

    // Use dynamic keys for all filters
    // Consultation Fee
    if (roundedData.consultationFee.min !== 24) {
      params.set('min', String(roundedData.consultationFee.min));
    } else {
      params.delete('min');
    }
    if (roundedData.consultationFee.max !== 500) {
      params.set('max', String(roundedData.consultationFee.max));
    } else {
      params.delete('max');
    }
    // Minimum Rating (use minimumRating as key)
    if (roundedData.minimumRating) {
      params.set('minimumRating', roundedData.minimumRating);
    } else {
      params.delete('minimumRating');
    }
    // Distance
    if (roundedData.distance !== 50) {
      params.set('distance', String(roundedData.distance));
    } else {
      params.delete('distance');
    }
    // Emergency Services
    if (roundedData.emergencyServices) {
      params.set('emergencyServices', 'true');
    } else {
      params.delete('emergencyServices');
    }
    // Multi-selects
    Object.entries(roundedData).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // Use set with custom encoding to avoid encoding ';'
        params.delete(key); // Remove any existing
        const joined = value.join(';');
        // Manually append to avoid encoding ';'
        params.append(key, joined);
      }
      if (Array.isArray(value) && value.length === 0) {
        params.delete(key);
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
    category: 'medicalServices' | 'facilities' | 'accreditations' | 'insuranceAccepted'
  ) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(serviceId)
      ? currentValues.filter((id) => id !== serviceId)
      : [...currentValues, serviceId];
    setValue(category, newValues);
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
    getAppliedFiltersCount,
    filters,
    handleClearAll,
    expandedSections,
    control,
  };
}
