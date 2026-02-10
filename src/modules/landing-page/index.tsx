'use client';

import MainLayout from '@/layouts/MainLayout';
import Hero from '../home/sections/Hero';
import AboutBuzzAVet from './sections/AboutBuzzAVet';
import OurServices from './sections/OurServices';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import FAQs from './sections/FAQs';
import LetsGetStarted from './sections/LetsGetStarted';
import GetInTouch from './sections/GetInTouch';

export default function LandingPage() {
  return (
    <MainLayout>
      <Hero />
      <AboutBuzzAVet />
      <OurServices />
      <WhyChooseUs />
      <Testimonials />
      <FAQs />
      <LetsGetStarted />
      <GetInTouch />
    </MainLayout>
  );
}
