'use client';
import React from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@/assets/icon-components';

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <Button
        icon={<ArrowLeftIcon />}
        iconPlacement="start"
        variant="ghost"
        onClick={handleBack}
        className="text-base px-0 font-semibold"
      >
        Back
      </Button>
    </div>
  );
};

export default BackButton;
