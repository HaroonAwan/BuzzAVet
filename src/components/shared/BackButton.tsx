'use client';
import React from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@/assets/icon-components';

const BackButton = ({ url }: { url?: string }) => {
  const router = useRouter();
  const handleBack = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };
  return (
    <div>
      <Button
        icon={<ArrowLeftIcon />}
        iconPlacement="start"
        variant="ghost"
        onClick={handleBack}
        className="px-0 text-base font-semibold"
      >
        Back
      </Button>
    </div>
  );
};

export default BackButton;
