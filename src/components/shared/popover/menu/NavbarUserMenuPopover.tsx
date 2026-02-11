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
            className="flex items-center gap-3 rounded-xl p-3"
            style={{ backgroundColor: theme.colors.background.secondary }}
          >
            <Avatar name={userName} url={userAvatarUrl as string} size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold">{userName}</h3>
              <p className="truncate text-sm" style={{ color: theme.colors.text.secondary }}>
                {userEmail}
              </p>
            </div>
          </div>

          {/* Main Menu Items */}
          <div className="flex flex-col gap-1 py-2">
            {mainMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={cn(
                  'flex w-full items-center gap-3 px-3 py-1.5 text-left',
                  'transition-colors hover:bg-gray-50'
                )}
              >
                <span className="flex shrink-0 items-center justify-center">{item.icon}</span>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary Menu Items with divider */}
          <div className="border-t" style={{ borderColor: theme.colors.border.default }}>
            <div className="flex flex-col gap-1 py-2">
              {secondaryMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-1.5 text-left',
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
                    className="flex shrink-0 items-center justify-center"
                    style={{ color: 'inherit' }}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverLayout>
    </Popover>
  );
}
