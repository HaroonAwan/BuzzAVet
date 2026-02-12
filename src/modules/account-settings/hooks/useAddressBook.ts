'use client';

import { useState } from 'react';

export const useAddressBook = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleEdit = (id?: string) => {
    console.log('edit', id);
    setIsPopoverOpen(false);
  };

  const handleSetAsDefault = (id?: string) => {
    console.log('set as default', id);
    setIsPopoverOpen(false);
  };

  const handleDelete = (id?: string) => {
    console.log('delete', id);
    setIsPopoverOpen(false);
  };

  return {
    isPopoverOpen,
    setIsPopoverOpen,
    handleEdit,
    handleSetAsDefault,
    handleDelete,
  };
};
