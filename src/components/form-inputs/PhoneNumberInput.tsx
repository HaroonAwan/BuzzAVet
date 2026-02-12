'use client';

import * as React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { detectAndValidatePhoneNumber, type PhoneNumberInfo } from '@/lib/phoneUtils';

/**
 * Phone Number Input Component
 * Features:
 * - Auto-detects country from phone number
 * - Displays country flag
 * - Validates phone number length
 * - Shows error state with unknown flag on validation failure
 * - Supports both +92 format and national format (e.g., 03XX)
 *
 * Usage:
 * ```tsx
 * const { control, handleSubmit } = useForm();
 *
 * <form onSubmit={handleSubmit(console.log)}>
 *   <PhoneNumberInput
 *     control={control}
 *     name="phoneNumber"
 *     label="Phone Number"
 *   />
 * </form>
 * ```
 */

export interface PhoneNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<'input'>, 'name' | 'type'> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  warning?: boolean;
  success?: boolean;
  defaultCountry?: string;
}

const PhoneNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  warning = false,
  success = false,
  className,
  id,
  disabled,
  defaultCountry = 'PK',
  ...props
}: PhoneNumberInputProps<TFieldValues, TName>) => {
  const inputId = id || `phone-input-${name}`;
  const errorId = `error-${name}`;
  const [isFocused, setIsFocused] = React.useState(false);
  const [phoneInfo, setPhoneInfo] = React.useState<PhoneNumberInfo>({
    isValid: false,
    countryCode: null,
    countryName: null,
    flag: '🌍',
    nationalNumber: null,
    formattedNumber: null,
    e164Number: null,
    error: null,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const errorMessage = fieldState.error?.message;

        // Handle input changes and phone validation
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;

          // Only allow numbers, +, and spaces
          const filteredValue = value.replace(/[^\d+\s]/g, '');

          // Update form field
          field.onChange(filteredValue);

          // Validate and detect country
          const info = detectAndValidatePhoneNumber(filteredValue, defaultCountry);
          setPhoneInfo(info);
        };

        // Color state priority: Error > Validation Error > Warning > Success > Active (on focus) > Default
        const getBorderColor = () => {
          if (hasError) return theme.colors.error;
          if (phoneInfo.error) return theme.colors.error;
          if (warning) return theme.colors.warning;
          if (success) return theme.colors.success;
          if (isFocused) return theme.colors.active;
          return theme.colors.defaultBorder;
        };

        const borderColor = getBorderColor();

        return (
          <div className="flex flex-col gap-2 mb-2">
            {label && (
              <label htmlFor={inputId} className="block text-sm font-medium">
                {label}
              </label>
            )}
            <div className="relative">
              {/* Flag Icon Container */}
              <div className="pointer-events-none absolute top-[48%] left-3 flex -translate-y-1/2 items-center gap-1.5">
                <span className="text-lg">{phoneInfo.flag}</span>
                {/* {phoneInfo.countryCode && (
                  <span className="text-xs font-semibold text-gray-500">
                    {phoneInfo.countryCode}
                  </span>
                )} */}
              </div>

              {/* Input Field */}
              <Input
                {...field}
                {...props}
                type="tel"
                id={inputId}
                disabled={disabled}
                placeholder="+92 310 1234567"
                className={cn('pl-10', className)}
                onChange={handleChange}
                onFocus={(e) => {
                  setIsFocused(true);
                  props.onFocus?.(e);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  field.onBlur();
                  props.onBlur?.(e);
                }}
                style={{
                  borderColor: borderColor,
                  ...(props.style as React.CSSProperties),
                }}
                aria-invalid={hasError || !!phoneInfo.error}
                aria-describedby={hasError || phoneInfo.error ? errorId : undefined}
              />

              {/* Error Message */}
              {(hasError || phoneInfo.error) && (
                <p
                  id={errorId}
                  className="absolute right-1.5 -bottom-4.5 text-[12px]"
                  style={{ color: theme.colors.error }}
                  role="alert"
                  aria-live="polite"
                >
                  {errorMessage || phoneInfo.error}
                </p>
              )}
            </div>

            {/* Optional: Display detected country info (for debugging/feedback) */}
            {/* {phoneInfo.countryCode && !phoneInfo.error && (
              <p className="text-[12px]" style={{ color: theme.colors.text.tertiary }}>
                {phoneInfo.countryName} • {phoneInfo.e164Number}
              </p>
            )} */}
          </div>
        );
      }}
    />
  );
};

PhoneNumberInput.displayName = 'PhoneNumberInput';

export { PhoneNumberInput };
