'use client';

import { RadioField } from '@/components/form-inputs';
import { Button } from '@/components/shared/Button';
import { booleanRule } from '@/lib/validationRules';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const notificationTypes = [
  {
    title: 'Email Notifications',
    description: 'Receive appointment confirmations and reminders via email.',
    name: 'emailNotifications',
  },
  {
    title: 'In-App Notifications',
    description: 'Receive in-app notifications for important updates.',
    name: 'inAppNotifications',
  },
];
const marketingTypes = [
  {
    title: 'Promotion & Offers',
    description: 'Receive emails about new features and special offers.',
    name: 'promotionalEmails',
  },
  {
    title: 'Partner Updates',
    description: 'Receive updates from our insurance and health partners.',
    name: 'partnerUpdates',
  },
];

interface notificationTogglePayload {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  promotionalEmails: boolean;
  partnerUpdates: boolean;
}

const notificationTogglePayload: notificationTogglePayload = {
  emailNotifications: false,
  inAppNotifications: true,
  promotionalEmails: false,
  partnerUpdates: false,
};
const notificationToggleSchema = yup.object().shape({
  emailNotifications: booleanRule,
  inAppNotifications: booleanRule,
  promotionalEmails: booleanRule,
  partnerUpdates: booleanRule,
});

export default function NotificationSettings() {
  const { control, handleSubmit } = useForm<notificationTogglePayload>({
    mode: 'onSubmit',
    resolver: yupResolver(notificationToggleSchema),
    defaultValues: notificationTogglePayload,
  });

  const onSubmit = (data: notificationTogglePayload) => {
    console.log('Notification Settings Updated:', data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-1.5 text-2xl font-semibold">Notification Settings</h1>
        <p className="text-gray-600">Choose what notifications you want to receive</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-5 border-b pb-6">
          <h1 className="text-[18px] font-semibold">Appointment Reminders</h1>
          {notificationTypes.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <RadioField
                  style="slider"
                  control={control}
                  name={item.name as keyof notificationTogglePayload}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col gap-5 border-b pb-6">
          <h1 className="text-[18px] font-semibold">Marketing</h1>
          {marketingTypes.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <RadioField
                  style="slider"
                  control={control}
                  name={item.name as keyof notificationTogglePayload}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="underline" className="pr-0">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
