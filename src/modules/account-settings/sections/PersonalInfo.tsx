'use client';

import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { FormInput } from '@/components/form-inputs/Input';
import { theme } from '@/lib/theme';
import { usePersonalInfo, PersonalInfoFormData } from '../hooks/usePersonalInfo';
import EmailIcon from '@/assets/images/settings/email.svg';
import PhoneIcon from '@/assets/images/settings/phone.svg';
import Image from 'next/image';
import { Chip } from '@/components/shared/Chip';
import PhoneNumberMenuModel from '@/components/shared/dialogs/settings/PhoneNumberMenuModel';
import { useState } from 'react';

// const isEmailVerified = true;
const isPhoneAvailable = false;
const isPhoneVerified = false;
const phoneId = undefined as string | undefined;

export default function PersonalInfo() {
  const [isNumberModelOpen, setIsNumberModelOpen] = useState(false);
  const [phoneModalVariant, setPhoneModalVariant] = useState<'new' | 'change' | 'verify'>('new');
  const {
    control,
    handleSubmit,
    fullName,
    avatarPreview,
    isHovering,
    setIsHovering,
    isUploading,
    fileInputRef,
    handleAvatarClick,
    handleImageChange,
    onSubmit,
    isDirty,
  } = usePersonalInfo();

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="mb-1.5 text-2xl font-semibold">Personal Info</h1>
          <p style={{ color: theme.colors.text.secondary }}>
            Manage your personal details and how we can reach you
          </p>
        </div>

        {/* Profile Section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-6">
            {/* Profile Image and name */}
            <div className="relative flex w-full items-center gap-5">
              <div
                className="relative flex h-25 w-25 shrink-0 cursor-pointer overflow-hidden rounded-xl"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleAvatarClick}
              >
                <Avatar size="max" url={avatarPreview} name={fullName} />

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isUploading}
                />

                {/* Overlay with Change button - shows on hover */}
                {isHovering && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button variant="underline" size="sm" className="text-white!">
                      Change
                    </Button>
                  </div>
                )}

                {/* Upload Loading Spinner */}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <FormInput<PersonalInfoFormData>
                  control={control}
                  name="fullName"
                  label="Your Full Name"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="w-full">
              <FormInput<PersonalInfoFormData>
                control={control}
                type="textarea"
                name="aboutMe"
                label="About Me"
                placeholder="Tell us a bit about you and your pets..."
              />
            </div>

            {/* Save Button */}
            <div className="ml-auto">
              <Button type="submit" variant="pill" size="md" disabled={!isDirty}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>

        {/* Contact Information */}
        <div className="space-y-4">
          {/* Email Address */}
          {/* <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image src={EmailIcon} alt="Email Icon" width={16} height={16} />
                <span className="text-sm font-medium text-gray-900">Email Address</span>
              </div>
              <Chip size="md" variant="success">
                Verified
              </Chip>
            </div>
            <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
              jane.doe@example.com
            </p>
          </div>
          {!isEmailVerified && (
            <div className="flex items-center justify-between">
              <Button variant="underline">Verify Now</Button>
            </div>
          )}
        </div> */}

          {/* Phone Number */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Image src={PhoneIcon} alt="Phone Icon" width={16} height={16} />
                  <span className="text-sm font-medium text-gray-900">Phone Number</span>
                </div>
                <Chip size="md" variant={isPhoneVerified ? 'success' : 'alert'}>
                  {isPhoneVerified ? 'Verified' : 'Pending'}
                </Chip>
              </div>
              <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                +1 (555) 123-4567
              </p>
            </div>
            {!isPhoneAvailable && (
              <div className="flex items-center justify-between">
                <Button
                  variant="underline"
                  onClick={() => {
                    setPhoneModalVariant('new');
                    setIsNumberModelOpen(true);
                  }}
                >
                  Add new
                </Button>
              </div>
            )}
            {!isPhoneVerified && isPhoneAvailable && (
              <div className="flex items-center justify-between">
                <Button
                  variant="underline"
                  onClick={() => {
                    setPhoneModalVariant('verify');
                    setIsNumberModelOpen(true);
                  }}
                >
                  Verify Now
                </Button>
              </div>
            )}
            {isPhoneVerified && isPhoneAvailable && (
              <div className="flex items-center justify-between">
                <Button
                  variant="underline"
                  onClick={() => {
                    setPhoneModalVariant('change');
                    setIsNumberModelOpen(true);
                  }}
                >
                  Change
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isNumberModelOpen && (
        <PhoneNumberMenuModel
          isOpen={isNumberModelOpen}
          onOpenChange={setIsNumberModelOpen}
          variant={phoneModalVariant}
          id={phoneId}
          setPhoneModalVariant={setPhoneModalVariant}
        />
      )}
    </>
  );
}
