import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import React from 'react';

interface TabsLayoutForServicesSectionProps {
  children: React.ReactNode;
  menu: Array<string>;
  menuChange: (tab: string) => void;
  activeTab: string;
  actionSection?: React.ReactNode;
}

const TabsLayoutForServicesSection = ({
  children,
  menu,
  menuChange,
  activeTab,
  actionSection,
}: TabsLayoutForServicesSectionProps) => {
  return (
    <>
      <div className="flex gap-8 border-b">
        {/* MENU */}
        {menu.map((item) => (
          <Button
            variant="underline"
            className={cn('px-0 underline-offset-13')}
            key={item}
            style={{
              textDecorationColor: activeTab === item ? 'currentColor' : 'transparent',
              color: activeTab === item ? '' : theme.colors.text.tertiary,
            }}
            onClick={() => menuChange(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        {children}
        {actionSection && actionSection}
      </div>
    </>
  );
};

export default TabsLayoutForServicesSection;
