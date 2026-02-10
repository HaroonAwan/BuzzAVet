import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceCategory, ViewType, RecentSearch, RecentServiceSearch } from './types';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/apis/auth/authSlice';

export function useNavbar() {
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

  const router = useRouter();
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

  const handleCategorySelect = (category: ServiceCategory, route: string) => {
    setSelectedCategory(category);
    router.push(route);
  };
  const dummyUser =
    'https://0.gravatar.com/avatar/fb0cd172ed03b131feb040f34db10fef8156d773f9891c8cadc23ca9e43730ba?s=1040';

  return {
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
    handleRegisterClick,
  };
}
