import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TabsLayoutForServicesSection from '../../layouts/TabsLayoutForServicesSection';
import BookHospitalAppointment from '../(hospital)/BookHospitalAppointment.tsx';
import ReviewsTab from '../(hospital)/ReviewsTab';
import VetsOverViewTab from './VetsOverViewTab';
import BookTelemedicineAppointment from './(bookings)/BookTelemedicineAppointment';

const menu = ['Overview', 'Reviews'];

interface VetsContentProps {
  slug: { slug: string; name: string };
}

const VetsContent = ({ slug }: VetsContentProps) => {
  console.log('🚀 ~ VetsContent ~ slug:', slug);
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
      actionSection={<BookTelemedicineAppointment onBookAppointment={handleBookAppointment} />}
    >
      {activeTab === 'Overview' && <VetsOverViewTab />}
      {activeTab === 'Reviews' && <ReviewsTab />}
    </TabsLayoutForServicesSection>
  );
};

export default VetsContent;
