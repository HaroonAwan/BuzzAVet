'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import PersonalInfoIcon from '@/assets/images/settings/personal-info.svg';
import AddressBookIcon from '@/assets/images/settings/address-book.svg';
import PaymentMethodsIcon from '@/assets/images/settings/payment-methods.svg';
import NotificationIcon from '@/assets/images/settings/notification.svg';
import SecurityPrivacyIcon from '@/assets/images/settings/security-privacy.svg';
import { Avatar } from '@/components/shared/Avatar';
import { theme } from '@/lib/theme';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface AccountSettingsSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'personal-info',
    label: 'Personal Info',
    icon: PersonalInfoIcon,
  },
  {
    id: 'address-book',
    label: 'Address book',
    icon: AddressBookIcon,
  },
  {
    id: 'payment-methods',
    label: 'Payment Methods',
    icon: PaymentMethodsIcon,
  },
  {
    id: 'notification-settings',
    label: 'Notification Settings',
    icon: NotificationIcon,
  },
  {
    id: 'security-privacy',
    label: 'Security & Privacy',
    icon: SecurityPrivacyIcon,
  },
];

export default function AccountSettingsSidebar({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}: AccountSettingsSidebarProps) {
  const handleMenuClick = (tabId: string) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white lg:static',
          'transform transition-transform duration-300 ease-in-out',
          'lg:transform-none',
          'min-w-85',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Close Button */}
          <div className="mb-4 flex items-center justify-between border-b p-5.5 lg:hidden">
            <h2 className="text-lg font-semibold">Account Settings</h2>
            {/* <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X />
            </button> */}
          </div>
          <div className="flex items-center gap-4 px-4">
            <Avatar size="lg" src="#" alt="Jane Doe" />
            <div className="flex flex-col leading-none">
              <span className="font-semibold">Jane Doe</span>
              <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                jane.doe@example.com
              </span>
            </div>
          </div>
          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors',
                      'hover:bg-gray-50',
                      activeTab === item.id
                        ? 'bg-[#F3F4F6] font-medium text-[#020409]'
                        : 'text-gray-700'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-5 w-5 items-center justify-center',
                        activeTab === item.id ? 'opacity-100' : 'opacity-70'
                      )}
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className={cn(
                          'h-5 w-5',
                          activeTab === item.id ? 'brightness-0 saturate-100' : 'brightness-0'
                        )}
                      />
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
