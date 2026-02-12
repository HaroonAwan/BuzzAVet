'use client';

import * as React from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverLayout } from '../PopoverLayout';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

export interface NavbarNotificationsMenuPopoverProps {
  trigger: React.ReactNode;
  notifications?: NotificationItem[];
  onMarkAllRead?: () => void;
  onNotificationClick?: (id: string) => void;
  className?: string;
}

/**
 * Complete notifications menu popover component for Navbar.
 * Includes Popover wrapper, trigger binding, and all UI.
 *
 * Usage:
 * ```tsx
 * <NavbarNotificationsMenuPopover
 *   trigger={<Button>Bell</Button>}
 *   notifications={notifications}
 *   onMarkAllRead={handleMarkAllRead}
 * />
 * ```
 */
export function NavbarNotificationsMenuPopover({
  trigger,
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
  className,
}: NavbarNotificationsMenuPopoverProps) {
  if (notifications.length === 0) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverLayout align="end" side="bottom">
          <div
            className={cn('w-[320px] p-6 text-center', className)}
            style={{ color: theme.colors.text.secondary }}
          >
            <p className="text-sm">No new notifications</p>
          </div>
        </PopoverLayout>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverLayout align="end" side="bottom">
        <div className={cn('w-[320px]', className)}>
          {/* Header */}
          <div
            className="flex items-center justify-between border-b px-4 py-3"
            style={{ borderColor: theme.colors.border.default }}
          >
            <h3 className="text-base font-semibold" style={{ color: theme.colors.text.default }}>
              Notifications
            </h3>
            {onMarkAllRead && (
              <button
                onClick={onMarkAllRead}
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: theme.colors.text.link }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-100 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => onNotificationClick?.(notification.id)}
                className={cn(
                  'flex w-full flex-col gap-1 px-4 py-3 text-left',
                  'transition-colors hover:bg-gray-50',
                  'border-b last:border-b-0',
                  !notification.read && 'bg-blue-50/30'
                )}
                style={{
                  borderColor: theme.colors.border.default,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4
                    className="flex-1 text-sm font-semibold"
                    style={{ color: theme.colors.text.default }}
                  >
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <div
                      className="mt-1 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: theme.colors.text.link }}
                    />
                  )}
                </div>
                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  {notification.message}
                </p>
                <p className="text-xs" style={{ color: theme.colors.text.tertiary }}>
                  {notification.time}
                </p>
              </button>
            ))}
          </div>
        </div>
      </PopoverLayout>
    </Popover>
  );
}
