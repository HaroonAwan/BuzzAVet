'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Tag input component for creating and managing tags.
 * Tags are created on Enter or comma key press.
 * Tags can be removed by clicking the X button.
 */
export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  ({ value = [], onChange, placeholder = 'Type and press Enter', className, disabled }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !value.includes(trimmedValue)) {
          onChange([...value, trimmedValue]);
          setInputValue('');
        }
      } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        // Remove last tag when backspace is pressed on empty input
        onChange(value.slice(0, -1));
      }
    };

    const handleRemoveTag = (tagToRemove: string) => {
      if (disabled) return;
      onChange(value.filter((tag) => tag !== tagToRemove));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      setInputValue(e.target.value);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-12.5 flex-wrap gap-2 rounded-md border p-2',
          'focus-within:ring-2 focus-within:ring-offset-0 focus-within:outline-none',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        style={{
          borderColor: theme.colors.defaultBorder,
          backgroundColor: theme.colors.surface,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: theme.colors.background.tertiary,
              color: theme.colors.text.default,
            }}
          >
            <span>{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
                className="ml-1 cursor-pointer transition-opacity hover:opacity-70 focus:outline-none"
                aria-label={`Remove ${tag}`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled}
          className="min-w-30 flex-1 bg-transparent text-sm outline-none"
          style={{ color: theme.colors.text.default }}
        />
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';
