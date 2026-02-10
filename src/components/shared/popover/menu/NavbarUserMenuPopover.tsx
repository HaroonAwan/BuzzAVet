'use client';

import * as React from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverLayout } from '../PopoverLayout';
import { Avatar } from '@/components/shared/Avatar';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import {
  DogIcon,
  AppointmentIcon,
  AccountSettingsIcon,
  BellIcon,
  FavouritesIcon,
  HelpCentreIcon,
  LogOutIcon,
} from '@/assets/icon-components';

export interface NavbarUserMenuPopoverProps {
  trigger: React.ReactNode;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  onPetDashboard?: () => void;
  onAppointments?: () => void;
  onAccountSettings?: () => void;
  onNotifications?: () => void;
  onFavourites?: () => void;
  onHelpCentre?: () => void;
  onLogOut?: () => void;
  className?: string;
}

/**
 * Complete user menu popover component for Navbar.
 * Includes Popover wrapper, trigger binding, and all UI.
 *
 * Usage:
 * ```tsx
 * <NavbarUserMenuPopover
 *   trigger={<Button>User</Button>}
 *   userName="Jane Doe"
 *   userEmail="jane.doe@example.com"
 *   onLogOut={handleLogout}
 * />
 * ```
 */
export function NavbarUserMenuPopover({
  trigger,
  userName,
  userEmail,
  userAvatarUrl = '',
  onPetDashboard,
  onAppointments,
  onAccountSettings,
  onNotifications,
  onFavourites,
  onHelpCentre,
  onLogOut,
  className,
}: NavbarUserMenuPopoverProps) {
  const mainMenuItems = [
    {
      icon: <DogIcon size={22} iconColor={theme.icons.default} />,
      label: 'Pet Dashboard',
      onClick: onPetDashboard,
    },
    {
      icon: <AppointmentIcon size={22} fill={theme.icons.default} />,
      label: 'My Appointments',
      onClick: onAppointments,
    },
    {
      icon: <AccountSettingsIcon size={22} fill={theme.icons.default} />,
      label: 'Account Settings',
      onClick: onAccountSettings,
    },
    {
      icon: <BellIcon size={22} fill={theme.icons.default} />,
      label: 'Notifications',
      onClick: onNotifications,
    },
    {
      icon: <FavouritesIcon size={22} fill={theme.icons.default} />,
      label: 'Favourites',
      onClick: onFavourites,
    },
  ];

  const secondaryMenuItems = [
    {
      icon: <HelpCentreIcon size={22} fill={theme.icons.default} />,
      label: 'Help Centre',
      onClick: onHelpCentre,
    },
    {
      icon: <LogOutIcon size={22} fill={theme.colors.text.error} />,
      label: 'Log Out',
      variant: 'danger' as const,
      onClick: onLogOut,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverLayout align="end" side="bottom">
        <div className={cn('w-77.75 p-2', className)}>
          {/* User Info Section */}
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: theme.colors.background.secondary }}
          >
            <Avatar name={userName} url={userAvatarUrl as string} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate">{userName}</h3>
              <p className="text-sm truncate" style={{ color: theme.colors.text.secondary }}>
                {userEmail}
              </p>
            </div>
          </div>

          {/* Main Menu Items */}
          <div className="py-2 flex flex-col gap-1">
            {mainMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-1.5 text-left',
                  'hover:bg-gray-50 transition-colors'
                )}
              >
                <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
                <span className="text-sm font-medium flex-1">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary Menu Items with divider */}
          <div className="border-t" style={{ borderColor: theme.colors.border.default }}>
            <div className="py-2 flex flex-col gap-1">
              {secondaryMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-1.5 text-left',
                    'transition-colors',
                    item.variant === 'danger' ? 'hover:bg-red-50' : 'hover:bg-gray-50'
                  )}
                  style={{
                    color:
                      item.variant === 'danger'
                        ? theme.colors.text.error
                        : theme.colors.text.default,
                  }}
                >
                  <span
                    className="shrink-0 flex items-center justify-center"
                    style={{ color: 'inherit' }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverLayout>
    </Popover>
  );
}
