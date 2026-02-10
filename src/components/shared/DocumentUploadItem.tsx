'use client';

import React, { useState, useEffect } from 'react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { CrossIcon } from '@/assets/icon-components';

interface DocumentUploadItemProps {
  file: File;
  isUploading?: boolean;
  uploadProgress?: number;
  onRemove: () => void;
}

/**
 * Document upload item component with progress indicator
 * Shows file icon, name, date, upload progress, and remove button
 */
export function DocumentUploadItem({
  file,
  isUploading = false,
  uploadProgress = 0,
  onRemove,
}: DocumentUploadItemProps) {
  const [dots, setDots] = useState('');

  // Animate dots for "Uploading..." text
  useEffect(() => {
    if (!isUploading) {
      setDots('');
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '.';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isUploading]);

  const formatDate = (file: File) => {
    const date = new Date(file.lastModified);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Calculate progress for circular border
  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDashoffset = circumference - (uploadProgress / 100) * circumference;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border"
      style={{
        borderColor: theme.colors.defaultBorder,
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      {/* File Icon with Progress */}
      <div className="relative shrink-0">
        {isUploading && (
          <svg className="absolute inset-0 w-12 h-12 -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={theme.colors.error}
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
            />
          </svg>
        )}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: theme.colors.background.default,
            border: isUploading
              ? '2px solid transparent'
              : `2px solid ${theme.colors.defaultBorder}`,
          }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path
              d="M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H16C18.2091 24 20 22.2091 20 20V8L12 0H4Z"
              fill={theme.colors.text.tertiary}
              opacity="0.3"
            />
            <path
              d="M12 0V6C12 7.10457 12.8954 8 14 8H20L12 0Z"
              fill={theme.colors.text.tertiary}
            />
          </svg>
        </div>
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: theme.colors.text.default }}>
          {file.name}
        </p>
        <div className="flex items-center gap-2 text-xs" style={{ color: theme.colors.text.muted }}>
          <span>{formatDate(file)}</span>
          {!isUploading && <span>• {formatFileSize(file.size)}</span>}
        </div>
      </div>

      {/* Upload Status / Remove Button */}
      <div className="flex items-center gap-2 shrink-0">
        {isUploading && (
          <span className="text-xs min-w-20" style={{ color: theme.colors.error }}>
            Uploading{dots}
          </span>
        )}
        <button
          onClick={onRemove}
          className="p-1 hover:opacity-70 transition-opacity"
          disabled={isUploading}
          aria-label="Remove document"
        >
          <CrossIcon size={16} fill={theme.colors.text.secondary} />
        </button>
      </div>
    </div>
  );
}
