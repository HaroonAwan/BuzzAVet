'use client';

import * as React from 'react';
import Select, {
  type StylesConfig,
  type GroupBase,
  type Props,
  type FormatOptionLabelMeta,
  components,
} from 'react-select';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';
import { ChevronDownIcon } from '@/assets/icon-components';

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Props<Option, IsMulti, Group> {
  className?: string;
  error?: boolean;
  warning?: boolean;
  success?: boolean;
}

const customStyles: StylesConfig<SelectOption, false> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '40px',
    borderRadius: '12px',
    height: '40px',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    borderColor: state.isDisabled
      ? 'var(--color-input)'
      : state.isFocused
        ? 'var(--color-foreground)'
        : 'var(--color-input)',
    borderWidth: state.isFocused ? '2px' : '1px',
    backgroundColor: state.isDisabled ? 'var(--color-muted)' : 'var(--color-background)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: state.isDisabled
        ? 'var(--color-input)'
        : state.isFocused
          ? 'var(--color-foreground)'
          : 'var(--color-input)',
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'var(--color-muted-foreground)' : 'var(--color-muted-foreground)',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'var(--color-muted-foreground)' : 'var(--color-foreground)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--color-foreground)',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '8px',
    cursor: 'pointer',
    color: state.isDisabled ? 'var(--color-muted-foreground)' : 'var(--color-foreground)',
    '&:hover': {
      color: state.isDisabled ? 'var(--color-muted-foreground)' : 'var(--color-foreground)',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    backgroundColor: 'var(--color-background)',
    zIndex: 50,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'transparent'
      : state.isFocused
        ? 'var(--color-muted)'
        : 'transparent',
    color: 'var(--color-foreground)',
    borderRadius: '12px',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:active': {
      backgroundColor: 'var(--color-muted)',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-muted)',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--color-foreground)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--color-foreground)',
    '&:hover': {
      backgroundColor: 'var(--color-destructive)',
      color: 'var(--color-destructive-foreground)',
    },
  }),
};

const CustomSelect = <
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  className,
  error,
  warning,
  success,
  styles,
  formatOptionLabel: customFormatOptionLabel,
  value,
  ...props
}: CustomSelectProps<Option, IsMulti, Group>) => {
  const formatLabel = React.useCallback(
    (option: Option, meta: FormatOptionLabelMeta<Option>) => {
      if (customFormatOptionLabel) {
        return customFormatOptionLabel(option, meta);
      }
      if (meta.context === 'menu') {
        const selectValue = meta.selectValue;
        const isSelected = Array.isArray(selectValue)
          ? selectValue.some(
              (v) => (v as unknown as SelectOption).value === (option as SelectOption).value
            )
          : selectValue &&
            (selectValue as unknown as SelectOption).value === (option as SelectOption).value;

        return (
          <div className="flex w-full items-center justify-between">
            <span>{(option as SelectOption).label}</span>
            {isSelected && (
              <Check className="text-foreground ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
            )}
          </div>
        );
      }
      return (option as SelectOption).label;
    },
    [customFormatOptionLabel]
  );

  const baseStyles = React.useMemo(() => {
    if (!error && !warning && !success) return customStyles;

    return {
      ...customStyles,
      control: (provided: any, state: any) => {
        const base = customStyles.control?.(provided, state) || provided;
        const getBorderColor = () => {
          if (error) return theme.colors.error;
          if (warning) return theme.colors.warning;
          if (success) return theme.colors.success;
          return state.isFocused ? theme.colors.active : theme.colors.defaultBorder;
        };
        return {
          ...base,
          borderColor: getBorderColor(),
          boxShadow: 'none',
        };
      },
    };
  }, [error, warning, success]);

  const mergedStyles = React.useMemo(() => {
    if (!styles) return baseStyles;
    return {
      control: (provided: any, state: any) => {
        const base = baseStyles.control?.(provided, state) || provided;
        const custom = styles.control?.(provided, state) || {};
        return { ...base, ...custom };
      },
      ...Object.keys(baseStyles).reduce(
        (acc, key) => {
          if (key === 'control') return acc;
          const customKey = key as keyof StylesConfig<SelectOption, false>;
          return {
            ...acc,
            [key]: (provided: any, state: any) => {
              const base = baseStyles[customKey]?.(provided, state) || provided;
              const custom = styles[customKey]?.(provided, state) || {};
              return { ...base, ...custom };
            },
          };
        },
        {} as StylesConfig<SelectOption, false>
      ),
    };
  }, [baseStyles, styles]);

  const DropdownIndicator = (props: any) => {
    const { selectProps } = props;
    const isOpen = selectProps.menuIsOpen;

    return (
      <components.DropdownIndicator {...props}>
        <div
          className={cn('transition-transform duration-200 ease-in-out', isOpen && 'rotate-180')}
        >
          <ChevronDownIcon size={20} />
        </div>
      </components.DropdownIndicator>
    );
  };

  return (
    <Select<Option, IsMulti, Group>
      {...props}
      value={value}
      className={cn('react-select-container', className)}
      classNamePrefix={props.classNamePrefix ? props.classNamePrefix : 'react-select'}
      styles={mergedStyles as StylesConfig<Option, IsMulti, Group>}
      formatOptionLabel={formatLabel}
      components={{
        ...props.components,
        DropdownIndicator,
      }}
    />
  );
};

CustomSelect.displayName = 'CustomSelect';

export { CustomSelect };
