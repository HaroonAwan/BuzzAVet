import React from 'react';
import { DialogLayout } from '../DialogLayout';
import { PhoneNumberInput } from '@/components/form-inputs/PhoneNumberInput';
import { PhoneNumberMenuModelProps, usePhoneNumberModel } from './usePhoneNumberModel';
import { theme } from '@/lib/theme';
import { FormInput } from '@/components/form-inputs/Input';

const PhoneNumberMenuModel = ({
  isOpen,
  onOpenChange,
  variant,
  setPhoneModalVariant,
}: PhoneNumberMenuModelProps) => {
  const { addControl, otpControl, titleMap, mapActions, watchAdd, handleSubmitMap, remainingTime } =
    usePhoneNumberModel({
      setPhoneModalVariant,
      variant,
    });
  const phoneNumber = watchAdd('phoneNumber');
  return (
    <DialogLayout
      open={isOpen}
      onOpenChange={onOpenChange}
      title={titleMap[variant]}
      actions={mapActions[variant]}
      isForm
      handleSubmit={handleSubmitMap[variant]}
    >
      {variant === 'new' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
            Please enter your phone number in the format +92XXXXXXXXX, 03XXXXXXXXX or 92XXXXXXXXX.
            We will send a verification code to this number.
          </p>
          <PhoneNumberInput
            control={addControl}
            name="phoneNumber"
            label="Phone Number"
            defaultCountry="PK"
          />
        </div>
      )}
      {variant === 'change' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
            Update your phone number. We will send a verification code to the new number.
          </p>
          <PhoneNumberInput
            control={addControl}
            name="phoneNumber"
            label="Phone Number"
            defaultCountry="PK"
          />
        </div>
      )}
      {variant === 'verify' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
            An OTP has been sent to <span>{phoneNumber ?? 'your phone number'}</span>. Please enter
            it below to verify your number. OTP is valid for 1 hour.{' '}
            {remainingTime && (
              <span className="text-sm font-medium" style={{ color: theme.colors.text.secondary }}>
                You can request a new otp in <span>{remainingTime}</span>
              </span>
            )}
          </p>
          <div className="mx-auto w-fit">
            <FormInput control={otpControl} name="verificationCode" type="otp" />
          </div>
        </div>
      )}
    </DialogLayout>
  );
};

export default PhoneNumberMenuModel;
