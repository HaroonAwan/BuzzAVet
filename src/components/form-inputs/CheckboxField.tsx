'use client';

import * as React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { Checkbox, type CheckboxSize } from '@/components/ui/checkbox';

/**
 * Form-connected checkbox field for boolean values using `react-hook-form`.
 *
 * Usage:
 * ```tsx
 * const { control } = useForm<{ termsAccepted: boolean }>();
 *
 * <CheckboxField
 *   control={control}
 *   name="termsAccepted"
 *   label="I agree to the terms"
 * />
 * ```
 *
 * Props:
 * - `control`: `react-hook-form` control instance.
 * - `name`: field name bound to the form.
 * - `label` / `description`: accessible text next to and below the checkbox.
 * - `size`: visual size of the checkbox.
 * - `rules`: validation rules passed to `Controller`.
 */
export interface CheckboxFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  size?: CheckboxSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function CheckboxField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  size = 'md',
  label,
  description,
  disabled = false,
  className,
}: CheckboxFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ref, onBlur }, fieldState: { error, isTouched } }) => {
        const checked = Boolean(value);

        const handleCheckedChange = (next: boolean) => {
          onChange(next);
          onBlur();
        };

        return (
          <div className={cn('flex flex-col gap-1', className)}>
            <label className="inline-flex items-center gap-3">
              <Checkbox
                ref={ref as React.Ref<HTMLButtonElement>}
                checked={checked}
                onCheckedChange={handleCheckedChange}
                size={size}
                disabled={disabled}
                hasError={!!error}
                aria-invalid={!!error}
              />
              {label ? (
                <span
                  className="text-sm font-medium"
                  style={{
                    color: error ? theme.colors.error : undefined,
                  }}
                >
                  {label}
                </span>
              ) : null}
            </label>
            {description ? (
              <p className="text-xs" style={{ color: theme.colors.text.default }}>
                {description}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
}
