import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-[12px] border bg-background px-3 py-2 text-[14px] file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm',
          'border-(--theme-default-border)',
          'text-(--theme-text-default)',
          'placeholder:text-(--theme-placeholder)',
          'focus-visible:outline-none focus-visible:border-(--theme-active)',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--theme-disabled-bg)',
          className
        )}
        style={{
          borderColor: props.style?.borderColor || `var(--theme-default-border)`,
          color: props.style?.color || `var(--theme-text-default)`,
          ...(props.style as React.CSSProperties),
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
