'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import Logo from '../Logo';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { ChevronDownIcon, BellIcon } from '@/assets/icon-components';
import { NavbarUserMenuPopover, NavbarNotificationsMenuPopover } from '../popover';
import { useNavbar } from './useNavbar';
import { TopBar } from './TopBar';
import { SearchBar } from './SearchBar';
import { useLogout } from '@/modules/auth/hooks/useLogout';

export interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  const handleLogout = useLogout();

  const {
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
    dummyUser,
    isAuthenticated,
    locationInputRef,
    locationDropdownRef,
    serviceTypeInputRef,
    serviceTypeDropdownRef,
    heading,
    activeSlug,
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
    // setIsServiceTypeFocused,
    handleAccountSettingsClick,
    setViewType,
    handleLoginClick,
    handleRegisterClick,
  } = useNavbar();

  const navRef = useRef<HTMLElement>(null);

  // Track header height and store in session storage
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        sessionStorage.setItem('headerHeight', height.toString());
      }
    };

    // Update height on mount and pathname change
    updateHeaderHeight();

    // Observe height changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [pathname, isSearchExpanded, isRoot]);

  // Set data attribute on body to indicate navbar expansion state
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isSearchExpanded && !isRoot) {
        document.body.setAttribute('data-navbar-expanded', 'true');
      } else {
        document.body.setAttribute('data-navbar-expanded', 'false');
      }
    }
  }, [isSearchExpanded, isRoot]);

  // Set data attribute on body to indicate view type (list/map)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-view-type', viewType);
    }
  }, [viewType]);

  return (
    <nav
      ref={navRef}
      className={cn(
        'w-full border-b bg-white',
        'transition-all duration-300',
        'sticky top-0 z-50',
        className
      )}
      style={{
        borderColor: theme.colors.border.default,
      }}
    >
      <div className="container mx-auto px-6">
        {isRoot ? (
          <div className="flex items-center justify-between py-3">
            <div className="shrink-0">
              <Logo isUrl="/" />
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <NavbarNotificationsMenuPopover
                trigger={
                  <Button
                    size="lg"
                    variant="ghost"
                    iconPlacement="center"
                    icon={<BellIcon fill={theme.icons.default} />}
                    aria-label="Notifications"
                    className="h-12 w-12"
                  />
                }
                notifications={[]}
                onMarkAllRead={() => console.log('Mark all read')}
                onNotificationClick={(id) => console.log('Notification clicked', id)}
              />

              <NavbarUserMenuPopover
                trigger={
                  <div
                    className="flex cursor-pointer items-center justify-center gap-3"
                    aria-label="User menu"
                  >
                    <Avatar name="Nauman Majeed" size="lg" url={dummyUser} />
                    <Button
                      size="lg"
                      variant="ghost"
                      iconPlacement="center"
                      icon={<ChevronDownIcon size={20} style={{ color: theme.icons.default }} />}
                      aria-label="User menu"
                      className="h-5 w-5 p-0"
                    />
                  </div>
                }
                userName="Nauman Majeed"
                userEmail="nauman.majeed@example.com"
                userAvatarUrl={dummyUser}
                onPetDashboard={() => console.log('Pet Dashboard')}
                onAppointments={() => console.log('Appointments')}
                onAccountSettings={handleAccountSettingsClick}
                onNotifications={() => console.log('Notifications')}
                onFavourites={() => console.log('Favourites')}
                onHelpCentre={() => console.log('Help Centre')}
                onLogOut={handleLogout}
              />
            </div>
          </div>
        ) : isSearchExpanded ? (
          <>
            <TopBar selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
            <SearchBar
              isExpanded={true}
              locationValue={locationValue}
              serviceTypeValue={serviceTypeValue}
              showLocationDropdown={showLocationDropdown}
              showServiceTypeDropdown={showServiceTypeDropdown}
              isServiceTypeFocused={isServiceTypeFocused}
              viewType={viewType}
              recentSearches={recentSearches}
              recentServiceSearches={recentServiceSearches}
              onLocationChange={setLocationValue}
              onLocationFocus={handleLocationFocus}
              onLocationClick={handleLocationClick}
              onLocationSelect={handleLocationSelect}
              onLocationClear={handleClearLocation}
              onNearbyClick={handleNearbyClick}
              onClearRecentSearches={handleClearRecentSearches}
              onServiceTypeChange={setServiceTypeValue}
              onServiceTypeFocus={handleServiceTypeFocus}
              onServiceTypeClick={handleServiceTypeClick}
              onServiceTypeSelect={handleServiceTypeSelect}
              onClearRecentServiceSearches={handleClearRecentServiceSearches}
              onViewChange={setViewType}
              locationInputRef={locationInputRef}
              locationDropdownRef={locationDropdownRef}
              serviceTypeInputRef={serviceTypeInputRef}
              serviceTypeDropdownRef={serviceTypeDropdownRef}
              heading={heading}
              activeSlug={activeSlug}
            />
          </>
        ) : (
          <div className="flex items-center justify-between py-3">
            <div className="shrink-0">
              <Logo isUrl="/" />
            </div>

            {isAuthenticated && (
              <SearchBar
                isExpanded={false}
                locationValue={locationValue}
                serviceTypeValue={serviceTypeValue}
                showLocationDropdown={showLocationDropdown}
                showServiceTypeDropdown={showServiceTypeDropdown}
                isServiceTypeFocused={isServiceTypeFocused}
                viewType={viewType}
                recentSearches={recentSearches}
                recentServiceSearches={recentServiceSearches}
                onLocationChange={setLocationValue}
                onLocationFocus={handleLocationFocus}
                onLocationClick={handleLocationClick}
                onLocationSelect={handleLocationSelect}
                onLocationClear={handleClearLocation}
                onNearbyClick={handleNearbyClick}
                onClearRecentSearches={handleClearRecentSearches}
                onServiceTypeChange={setServiceTypeValue}
                onServiceTypeFocus={handleServiceTypeFocus}
                onServiceTypeClick={handleServiceTypeClick}
                onServiceTypeSelect={handleServiceTypeSelect}
                onClearRecentServiceSearches={handleClearRecentServiceSearches}
                onViewChange={setViewType}
                locationInputRef={locationInputRef}
                locationDropdownRef={locationDropdownRef}
                serviceTypeInputRef={serviceTypeInputRef}
                serviceTypeDropdownRef={serviceTypeDropdownRef}
                heading={heading}
                activeSlug={activeSlug}
              />
            )}

            <div className="flex shrink-0 items-center gap-3">
              {isAuthenticated ? (
                <>
                  <NavbarNotificationsMenuPopover
                    trigger={
                      <Button
                        size="lg"
                        variant="ghost"
                        iconPlacement="center"
                        icon={<BellIcon fill={theme.icons.default} />}
                        aria-label="Notifications"
                        className="h-12 w-12"
                      />
                    }
                    notifications={[]}
                    onMarkAllRead={() => console.log('Mark all read')}
                    onNotificationClick={(id) => console.log('Notification clicked', id)}
                  />

                  <NavbarUserMenuPopover
                    trigger={
                      <div
                        className="flex cursor-pointer items-center justify-center gap-3"
                        aria-label="User menu"
                      >
                        <Avatar name="Nauman Majeed" size="lg" url={dummyUser} />
                        <Button
                          size="lg"
                          variant="ghost"
                          iconPlacement="center"
                          icon={
                            <ChevronDownIcon size={20} style={{ color: theme.icons.default }} />
                          }
                          aria-label="User menu"
                          className="h-5 w-5 p-0"
                        />
                      </div>
                    }
                    userName="Nauman Majeed"
                    userEmail="nauman.majeed@example.com"
                    userAvatarUrl={dummyUser}
                    onPetDashboard={() => console.log('Pet Dashboard')}
                    onAppointments={() => console.log('Appointments')}
                    onAccountSettings={handleAccountSettingsClick}
                    onNotifications={() => console.log('Notifications')}
                    onFavourites={() => console.log('Favourites')}
                    onHelpCentre={() => console.log('Help Centre')}
                    onLogOut={handleLogout}
                  />
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="ghost" onClick={handleLoginClick}>
                    Log in
                  </Button>
                  <Button
                    className="text-white"
                    onClick={handleRegisterClick}
                    style={{ backgroundColor: theme.colors.background.range }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
