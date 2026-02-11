'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import type { MultiValue, SingleValue, ActionMeta } from 'react-select';
import { CustomSelect, type SelectOption } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

/**
 * Form-connected select input (single or multi) using `react-select`.
 *
 * Usage:
 * ```tsx
 * const { control } = useForm<{ category: string }>();
 * const options = [
 *   { value: "1", label: "Example #1" },
 *   { value: "2", label: "Example #2" },
 * ];
 *
 * <FormSelect
 *   control={control}
 *   name="category"
 *   label="Category"
 *   options={options}
 * />
 * ```
 *
 * Props:
 * - `control`: `react-hook-form` control instance.
 * - `name`: field name bound to the form.
 * - `options`: list of `{ value, label }` options.
 * - `isMulti`: enable multi-select (form value becomes an array of values).
 * - `label` / `placeholder`: accessible label and placeholder text.
 * - `warning` / `success`: visual state indicators in addition to error.
 * - `rules`: validation rules passed to `Controller`.
 */
export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  isMulti?: boolean;
  warning?: boolean;
  success?: boolean;
  rules?: Parameters<typeof Controller<TFieldValues, TName>>[0]['rules'];
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Controlled select component (single or multi) integrated with `react-hook-form`.
 * Maps between raw form values and `react-select` option objects and displays validation state.
 *
 * Usage:
 * ```tsx
 * const { control } = useForm<{ category: string }>();
 * const options = [
 *   { value: "1", label: "Example #1" },
 *   { value: "2", label: "Example #2" },
 *   { value: "3", label: "Example #3" },
 * ];
 *
 * <FormSelect
 *   control={control}
 *   name="category"
 *   label="Category"
 *   options={options}
 *   placeholder="Select"
 * />
 * ```
 *
 * Props:
 * - `control`: `react-hook-form` control instance.
 * - `name`: field name bound to the form.
 * - `label` / `placeholder`: accessible text next to and below the control.
 * - `options`: list of `{ value, label }` options.
 * - `isMulti`: enable multi-select (form value becomes an array of values).
 * - `warning` / `success`: visual state indicators in addition to error.
 * - `rules`: validation rules passed to `Controller`.
 * - `disabled`: disable the select input.
 * - `className`: additional CSS classes to apply to the select container.
 * - `id`: optional custom ID for the select input.
 */
const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  placeholder = 'Select',
  isMulti = false,
  warning = false,
  success = false,
  rules,
  disabled,
  className,
  id,
}: FormSelectProps<TFieldValues, TName>) => {
  const selectId = id || `select-${name}`;
  const errorId = `error-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const errorMessage = fieldState.error?.message;

        const handleChange = (
          newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
          _actionMeta: ActionMeta<SelectOption>
        ) => {
          if (isMulti) {
            const values = Array.isArray(newValue)
              ? (newValue as SelectOption[]).map((opt) => opt.value)
              : [];
            field.onChange(values);
          } else {
            const value =
              newValue && !Array.isArray(newValue) ? (newValue as SelectOption).value : null;
            field.onChange(value);
          }
        };

        const getValue = (): SelectOption | SelectOption[] | null => {
          if (isMulti) {
            const values = Array.isArray(field.value) ? (field.value as string[]) : [];
            return options.filter((opt) => values.includes(opt.value));
          } else {
            const fieldValue = field.value as string | undefined;
            return options.find((opt) => opt.value === fieldValue) || null;
          }
        };

        return (
          <div className={cn('space-y-2', className)}>
            {label && (
              <label htmlFor={selectId} className="text-foreground block text-sm font-medium">
                {label}
              </label>
            )}
            <div className="relative">
              <CustomSelect
                inputId={selectId}
                options={options}
                value={getValue()}
                onChange={handleChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                isMulti={isMulti}
                isDisabled={disabled}
                isClearable
                error={hasError}
                warning={warning}
                success={success}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
              />
              {hasError && errorMessage && (
                <p
                  id={errorId}
                  className="absolute top-full left-0 mt-1 text-sm"
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

FormSelect.displayName = 'FormSelect';

export { FormSelect };
