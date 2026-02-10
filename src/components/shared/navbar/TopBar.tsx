import React from 'react';
import Logo from '../Logo';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { ChevronDownIcon, BellIcon } from '@/assets/icon-components';
import { theme } from '@/lib/theme';
import { NavbarUserMenuPopover, NavbarNotificationsMenuPopover } from '../popover';
import { ServiceCategories } from './ServiceCategories';
import { ServiceCategory } from './types';
import { useLogout } from '@/modules/auth/hooks/useLogout';

interface TopBarProps {
  selectedCategory: ServiceCategory;
  onCategorySelect: (category: ServiceCategory, route: string) => void;
}

export function TopBar({ selectedCategory, onCategorySelect }: TopBarProps) {
  const handleLogout = useLogout();

  return (
    <div className="flex items-center justify-between py-4">
      <div className="shrink-0">
        <Logo isUrl="/" />
      </div>

      <ServiceCategories selectedCategory={selectedCategory} onCategorySelect={onCategorySelect} />

      <div className="flex items-center gap-3 shrink-0">
        <NavbarNotificationsMenuPopover
          trigger={
            <Button
              size="lg"
              variant="ghost"
              iconPlacement="center"
              icon={<BellIcon fill={theme.icons.default} />}
              aria-label="Notifications"
              className="w-12 h-12"
            />
          }
          notifications={[]}
          onMarkAllRead={() => console.log('Mark all read')}
          onNotificationClick={(id) => console.log('Notification clicked', id)}
        />

        <NavbarUserMenuPopover
          trigger={
            <div
              className="flex items-center justify-center gap-3 cursor-pointer"
              aria-label="User menu"
            >
              <Avatar name="Nauman Majeed" size="lg" />
              <Button
                size="lg"
                variant="ghost"
                iconPlacement="center"
                icon={<ChevronDownIcon size={20} style={{ color: theme.icons.default }} />}
                aria-label="User menu"
                className="w-5 h-5 p-0"
              />
            </div>
          }
          userName="Nauman Majeed"
          userEmail="nauman.majeed@example.com"
          onPetDashboard={() => console.log('Pet Dashboard')}
          onAppointments={() => console.log('Appointments')}
          onAccountSettings={() => console.log('Account Settings')}
          onNotifications={() => console.log('Notifications')}
          onFavourites={() => console.log('Favourites')}
          onHelpCentre={() => console.log('Help Centre')}
          onLogOut={handleLogout}
        />
      </div>
    </div>
  );
}
