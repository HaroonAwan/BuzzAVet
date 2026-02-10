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
import { Switch, type SwitchSize } from '@/components/ui/switch';
import { Radio, type RadioSize } from '@/components/ui/radio';

/**
 * Form-connected boolean toggle rendered as either a slider switch or round radio.
 *
 * Usage:
 * ```tsx
 * const { control } = useForm<{ notificationsEnabled: boolean }>();
 *
 * <RadioField
 *   control={control}
 *   name="notificationsEnabled"
 *   style="slider"
 *   label="Enable notifications"
 * />
 * ```
 *
 * Props:
 * - `control`: `react-hook-form` control instance.
 * - `name`: field name bound to the form.
 * - `style`: visual style, `"slider"` (switch) or `"round"` (radio).
 * - `label` / `description`: accessible text next to and below the control.
 * - `size`: size of the underlying switch/radio.
 * - `rules`: validation rules passed to `Controller`.
 */
export type RadioStyle = 'slider' | 'round';

export interface RadioFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  style?: RadioStyle;
  size?: RadioSize & SwitchSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function RadioField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  style = 'round',
  size = 'md',
  label,
  description,
  disabled = false,
  className,
}: RadioFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        const checked = Boolean(value);

        const handleCheckedChange = (next: boolean) => {
          onChange(next);
        };

        const ControlComponent =
          style === 'slider'
            ? (Switch as React.ComponentType<React.ComponentProps<typeof Switch>>)
            : (Radio as React.ComponentType<React.ComponentProps<typeof Radio>>);

        return (
          <div className={cn('flex flex-col gap-1', className)}>
            <label className="inline-flex items-center gap-3">
              <ControlComponent
                ref={ref as React.Ref<HTMLButtonElement>}
                checked={checked}
                onCheckedChange={handleCheckedChange}
                size={size as SwitchSize}
                disabled={disabled}
                aria-invalid={!!error}
              />
              {label ? (
                <span className="text-sm font-medium" style={{ color: theme.colors.text.default }}>
                  {label}
                </span>
              ) : null}
            </label>
            {description ? (
              <p className="text-xs" style={{ color: theme.colors.text.default }}>
                {description}
              </p>
            ) : null}
            {error?.message ? (
              <p className="text-xs" role="alert" style={{ color: theme.colors.text.error }}>
                {error.message}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
}
