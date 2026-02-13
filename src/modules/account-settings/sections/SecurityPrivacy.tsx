'use client';

import { Button } from '@/components/shared/Button';
import ChangePasswordModel from '@/components/shared/dialogs/settings/ChangePasswordModel';
import DeleteAccountModel from '@/components/shared/dialogs/settings/DeleteAccountModel';
import { useState } from 'react';

export default function SecurityPrivacy() {
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [isChangePasswordModelOpen, setIsChangePasswordModelOpen] = useState(false);
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="mb-1.5 text-2xl font-semibold">Security & Privacy</h1>
          <p className="text-gray-600">Manage your account security and privacy settings</p>
        </div>

        {/* Password Section */}
        <div className="border-b pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-[18px] font-semibold">Change Password</h3>
              <p className="text-sm text-gray-600">
                Regularly changing your password helps keep your account secure.
              </p>
            </div>
            <Button variant="underline" onClick={() => setIsChangePasswordModelOpen(true)}>
              Change Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-b pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-[18px] font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account by requiring a verification code in
                addition to your password.
              </p>
            </div>
            <Button variant="underline">Enable</Button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="rounded-xl bg-[#FEF2F2] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-[18px] font-semibold">Delete Account</h3>
              <p className="text-sm text-gray-600">
                Permanently delete your account and all of your content. This action cannot be
                undone.
              </p>
            </div>
            <Button variant="destructive" onClick={() => setIsDeleteModelOpen(true)}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      <DeleteAccountModel isOpen={isDeleteModelOpen} setIsOpen={setIsDeleteModelOpen} />
      <ChangePasswordModel
        isOpen={isChangePasswordModelOpen}
        setIsOpen={setIsChangePasswordModelOpen}
      />
    </>
  );
}
