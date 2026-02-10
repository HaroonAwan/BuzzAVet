'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { APP_ENV } from '@/constants';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { ArrowDownIcon } from '@assets/icon-components';

interface ErrorBoundaryUIProps {
  error: Error;
  errorInfo: React.ErrorInfo | null;
}

export function ErrorBoundaryUI({ error, errorInfo }: ErrorBoundaryUIProps) {
  const router = useRouter();
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDevelopment = APP_ENV === 'development';

  const handleGoHome = () => {
    router.push('/');
    // Reset error state by reloading
    window.location.href = '/';
  };

  const handleCopyError = async () => {
    const errorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack || 'No component stack available',
      timestamp: new Date().toISOString(),
    };

    const errorText = JSON.stringify(errorDetails, null, 2);

    try {
      await navigator.clipboard.writeText(errorText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy error:', err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background.default }}
    >
      <div className="max-w-2xl w-full text-center space-y-6">
        {/* Main Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold" style={{ color: theme.colors.text.default }}>
            Something went wrong
          </h1>
          <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
            A bit inconvenience, sorry
          </p>
        </div>

        {/* Home Button */}
        <div className="flex justify-center">
          <Button size="lg" variant="pill" onClick={handleGoHome}>
            Home Page
          </Button>
        </div>

        {/* Development Tools */}
        {isDevelopment && (
          <div className="mt-8 text-left">
            <button
              onClick={() => setIsDevToolsOpen(!isDevToolsOpen)}
              className="w-full text-left p-4 rounded-lg border transition-colors"
              style={{
                backgroundColor: isDevToolsOpen
                  ? theme.colors.background.secondary
                  : theme.colors.background.default,
                borderColor: theme.colors.border.default,
                color: theme.colors.text.default,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">Developer Tools</span>
                <span className="text-sm" style={{ color: theme.colors.text.tertiary }}>
                  <ArrowDownIcon
                    className={cn(
                      'transition-transform duration-200',
                      isDevToolsOpen ? 'rotate-180' : 'rotate-0'
                    )}
                    size={16}
                  />
                </span>
              </div>
            </button>

            {isDevToolsOpen && (
              <div
                className="mt-2 p-4 rounded-lg border space-y-4"
                style={{
                  backgroundColor: theme.colors.background.secondary,
                  borderColor: theme.colors.border.default,
                }}
              >
                {/* Error Name and Message */}
                <div className="space-y-2">
                  <div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: theme.colors.text.error }}
                    >
                      Error Name:
                    </h3>
                    <p
                      className="text-sm font-mono p-2 rounded"
                      style={{
                        backgroundColor: theme.colors.background.default,
                        color: theme.colors.text.default,
                      }}
                    >
                      {error.name}
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: theme.colors.text.error }}
                    >
                      Error Message:
                    </h3>
                    <p
                      className="text-sm font-mono p-2 rounded wrap-break-word"
                      style={{
                        backgroundColor: theme.colors.background.default,
                        color: theme.colors.text.default,
                      }}
                    >
                      {error.message}
                    </p>
                  </div>
                </div>

                {/* Error Stack */}
                {error.stack && (
                  <div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: theme.colors.text.error }}
                    >
                      Stack Trace:
                    </h3>
                    <pre
                      className="text-xs font-mono p-3 rounded overflow-auto max-h-64"
                      style={{
                        backgroundColor: theme.colors.background.default,
                        color: theme.colors.text.default,
                        border: `1px solid ${theme.colors.border.default}`,
                      }}
                    >
                      {error.stack}
                    </pre>
                  </div>
                )}

                {/* Component Stack */}
                {errorInfo?.componentStack && (
                  <div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: theme.colors.text.error }}
                    >
                      Component Stack:
                    </h3>
                    <pre
                      className="text-xs font-mono p-3 rounded overflow-auto max-h-64"
                      style={{
                        backgroundColor: theme.colors.background.default,
                        color: theme.colors.text.default,
                        border: `1px solid ${theme.colors.border.default}`,
                      }}
                    >
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}

                {/* Copy Button */}
                <div className="pt-2">
                  <Button size="md" variant="outline" onClick={handleCopyError} className="w-full">
                    {copied ? 'Copied!' : 'Copy Error Details'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
