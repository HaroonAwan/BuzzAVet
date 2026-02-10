'use client';

import * as React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { EyeIcon } from '@/assets/icon-components';

/**
 * Form-connected text input for use with `react-hook-form` and yup validation.
 * Shows validation, warning, and success styles based on form state and props.
 * Validation is handled by yup schema defined in the form hook.
 *
 * Usage:
 * ```tsx
 * const { control, handleSubmit } = useForm({
 *   resolver: yupResolver(schema)
 * });
 *
 * <form onSubmit={handleSubmit(console.log)}>
 *   <FormInput
 *     control={control}
 *     name="email"
 *     label="Email"
 *   />
 * </form>
 * ```
 *
 * Props:
 * - `control`: `react-hook-form` control instance.
 * - `name`: field name bound to the form.
 * - `label`: optional accessible label rendered above the input.
 * - `warning` / `success`: visual state indicators (Error is derived from validation).
 */

export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<'input'>, 'name'> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  warning?: boolean;
  success?: boolean;
}

const FormInput = <
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
  type,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  const inputId = id || `input-${name}`;
  const errorId = `error-${name}`;
  const isPassword = type === 'password';
  const isOtp = type === 'otp';
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  // OTP-specific refs and state
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [focusedOtpIndex, setFocusedOtpIndex] = React.useState<number | null>(null);
  const OTP_LENGTH = 6;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const errorMessage = fieldState.error?.message;

        // Color state priority: Error > Warning > Success > Active (on focus) > Default
        const getBorderColor = () => {
          if (hasError) return theme.colors.error;
          if (warning) return theme.colors.warning;
          if (success) return theme.colors.success;
          if (isFocused) return theme.colors.active;
          return theme.colors.defaultBorder;
        };

        const borderColor = getBorderColor();
        const inputType = isPassword && showPassword ? 'text' : type;

        // OTP-specific logic
        const otpValue = (field.value || '').toString().slice(0, OTP_LENGTH);
        const otpDigits = Array.from({ length: OTP_LENGTH }, (_, idx) => otpValue[idx] || '');

        // Auto-focus first field on mount
        React.useEffect(() => {
          if (isOtp && otpRefs.current[0]) {
            otpRefs.current[0]?.focus();
          }
        }, [isOtp]);

        // Update form value when OTP digits change
        const updateOtpValue = (digits: string[]) => {
          const newValue = digits.join('');
          field.onChange(newValue);
        };

        // Handle OTP input change
        const handleOtpChange = (index: number, value: string | number) => {
          // Convert to string and only allow single digit (0-9)
          const stringValue = String(value || '');
          const digit = stringValue.replace(/[^0-9]/g, '').slice(0, 1);
          const newDigits = [...otpDigits];
          newDigits[index] = digit;
          updateOtpValue(newDigits);

          // Auto-advance to next field if digit entered
          if (digit && index < OTP_LENGTH - 1) {
            // Small delay to ensure the value is set before focusing
            setTimeout(() => {
              otpRefs.current[index + 1]?.focus();
            }, 0);
          } else if (digit && index === OTP_LENGTH - 1) {
            // Last field filled, blur all inputs
            setTimeout(() => {
              otpRefs.current.forEach((ref) => ref?.blur());
            }, 0);
          }
        };

        // Handle OTP key down
        const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
          // Block invalid characters
          if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === '.') {
            e.preventDefault();
            return;
          }

          // Handle backspace
          if (e.key === 'Backspace') {
            if (!otpDigits[index] && index > 0) {
              // If current field is empty, move to previous field
              otpRefs.current[index - 1]?.focus();
            } else {
              // Clear current field
              const newDigits = [...otpDigits];
              newDigits[index] = '';
              updateOtpValue(newDigits);
            }
          }

          // Handle arrow keys
          if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            otpRefs.current[index - 1]?.focus();
          }
          if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
            e.preventDefault();
            otpRefs.current[index + 1]?.focus();
          }
        };

        // Handle OTP paste
        const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
          e.preventDefault();
          const pastedData = e.clipboardData
            .getData('text')
            .replace(/[^0-9]/g, '')
            .slice(0, OTP_LENGTH);

          if (pastedData.length > 0) {
            const newDigits = [...otpDigits];
            for (let i = 0; i < pastedData.length && i < OTP_LENGTH; i++) {
              newDigits[i] = pastedData[i];
            }
            updateOtpValue(newDigits);

            // Focus the next empty field or last field
            const nextIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
            if (nextIndex < OTP_LENGTH) {
              otpRefs.current[nextIndex]?.focus();
            } else {
              // All fields filled, blur all
              otpRefs.current.forEach((ref) => ref?.blur());
            }
          }
        };

        // Handle OTP focus
        const handleOtpFocus = (index: number) => {
          setFocusedOtpIndex(index);
          // Select all text when focusing
          otpRefs.current[index]?.select();
        };

        // Handle OTP blur
        const handleOtpBlur = () => {
          setFocusedOtpIndex(null);
          field.onBlur();
        };

        // Get border color for a specific OTP field
        const getOtpBorderColor = (index: number) => {
          if (hasError) return theme.colors.error;
          if (warning) return theme.colors.warning;
          if (success) return theme.colors.success;
          if (focusedOtpIndex === index) return theme.colors.active;
          return theme.colors.defaultBorder;
        };

        // Render OTP fields
        if (isOtp) {
          return (
            <div className="flex flex-col gap-2">
              {label && (
                <label htmlFor={inputId} className="block text-sm font-medium">
                  {label}
                </label>
              )}
              <div className="relative">
                <div className="flex gap-2 justify-between items-center">
                  {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                    <Input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      type="number"
                      inputMode="numeric"
                      maxLength={1}
                      value={otpDigits[index] || ''}
                      min={0}
                      max={9}
                      disabled={disabled}
                      className={cn(
                        'w-13 h-13 text-center text-xl font-semibold p-0 text-foreground',
                        className
                      )}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onPaste={handleOtpPaste}
                      onFocus={() => handleOtpFocus(index)}
                      onBlur={handleOtpBlur}
                      style={{
                        borderColor: getOtpBorderColor(index),
                        ...(props.style as React.CSSProperties),
                      }}
                      aria-invalid={hasError}
                      aria-describedby={hasError ? errorId : undefined}
                      id={index === 0 ? inputId : undefined}
                    />
                  ))}
                </div>
                {hasError && errorMessage && (
                  <p
                    id={errorId}
                    className="text-[12px] absolute -bottom-4.5 right-1.5"
                    style={{ color: theme.colors.error }}
                    role="alert"
                    aria-live="polite"
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          );
        }

        // Render regular input
        return (
          <div className="flex flex-col gap-2">
            {label && (
              <label htmlFor={inputId} className="block text-sm font-medium">
                {label}
              </label>
            )}
            <div className="relative">
              <Input
                {...field}
                {...props}
                type={inputType}
                id={inputId}
                disabled={disabled}
                className={cn(isPassword && 'pr-10', className)}
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
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  <EyeIcon show={showPassword} size={20} />
                </button>
              )}
              {hasError && errorMessage && (
                <p
                  id={errorId}
                  className="text-[12px] absolute -bottom-4.5 right-1.5"
                  style={{ color: theme.colors.error }}
                  role="alert"
                  aria-live="polite"
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

FormInput.displayName = 'FormInput';

export { FormInput };
