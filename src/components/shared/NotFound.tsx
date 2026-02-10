'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { theme } from '@/lib/theme';

export function NotFound() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background.default }}
    >
      <div className="max-w-2xl w-full text-center space-y-6">
        {/* 404 Number */}
        <div className="space-y-2">
          <h1
            className="text-8xl md:text-9xl font-bold"
            style={{ color: theme.colors.text.default }}
          >
            404
          </h1>
          <h2
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: theme.colors.text.default }}
          >
            Page Not Found
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button size="lg" variant="pill">
              Go to Home
            </Button>
          </Link>
          <Button size="lg" variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
