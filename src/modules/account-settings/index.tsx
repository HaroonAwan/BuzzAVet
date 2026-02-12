'use client';

import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import AccountSettingsSidebar from './layouts/AccountSettingsSidebar';
import PersonalInfo from './sections/PersonalInfo';
import AddressBook from './sections/AddressBook';
import PaymentMethods from './sections/PaymentMethods';
import NotificationSettings from './sections/NotificationSettings';
import SecurityPrivacy from './sections/SecurityPrivacy';
import { MenuIcon } from 'lucide-react';
import SectionsWrapper from '@/layouts/SectionsWrapper';

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'personal-info':
        return <PersonalInfo />;
      case 'address-book':
        return <AddressBook />;
      case 'payment-methods':
        return <PaymentMethods />;
      case 'notification-settings':
        return <NotificationSettings />;
      case 'security-privacy':
        return <SecurityPrivacy />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <MainLayout>
      <SectionsWrapper>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mb-4 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 transition-colors hover:bg-gray-50 lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
          <span className="font-medium">Menu</span>
        </button>

        {/* Main Content Area */}
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar */}
          <AccountSettingsSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Content Area */}
          <main className="min-w-0 flex-1">
            <div className="max-w-4xl">{renderContent()}</div>
          </main>
        </div>
      </SectionsWrapper>
    </MainLayout>
  );
}
