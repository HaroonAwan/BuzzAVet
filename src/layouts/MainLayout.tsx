'use client';

import React from 'react';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
