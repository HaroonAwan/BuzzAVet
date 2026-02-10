import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TabsLayoutForServicesSection from '../layouts/TabsLayoutForServicesSection';
import BookHospitalAppointment from './BookHospitalAppointment.tsx';
import OverviewTab from './OverviewTab';
import VeterinariansTab from './VeterinariansTab';
import ReviewsTab from './ReviewsTab';

const menu = ['Overview', 'Veterinarians', 'Reviews'];

interface HospitalContentProps {
  slug: { slug: string; name: string };
}

const HospitalContent = ({ slug }: HospitalContentProps) => {
  console.log('🚀 ~ HospitalContent ~ slug:', slug);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(tabParam || 'Overview');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`, { scroll: false });
  };

  // console the appointment data when booked
  const handleBookAppointment = (appointmentData: any) => {
    console.log('Appointment Data:', appointmentData);
    router.push(`/services/${slug.slug}/${slug.name}/appointment`);
  };

  return (
    <TabsLayoutForServicesSection
      menuChange={handleTabClick}
      menu={menu}
      activeTab={activeTab}
      actionSection={<BookHospitalAppointment onBookAppointment={handleBookAppointment} />}
    >
      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'Veterinarians' && <VeterinariansTab />}
      {activeTab === 'Reviews' && <ReviewsTab />}
    </TabsLayoutForServicesSection>
  );
};

export default HospitalContent;
