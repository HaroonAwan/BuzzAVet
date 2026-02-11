'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../Button';

interface ActionButton {
  label: string;
  variant?: 'pill' | 'outline' | 'underline' | 'ghost' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Props for the DialogLayout component
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * const handleImport = () => {
 *   console.log('Import action');
 * };
 *
 * const handleAdd = () => {
 *   console.log('Add action');
 *   setIsOpen(false);
 * };
 *
 * <DialogLayout
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Add Note"
 *   actions={[
 *     { label: 'Import Note', onClick: handleImport },
 *     { label: 'Add Note', onClick: handleAdd, variant: 'default' }
 *   ]}
 * >
 *   <form>
 *     <input type="text" placeholder="Note Title" />
 *     <textarea placeholder="Note content..." />
 *   </form>
 * </DialogLayout>
 * ```
 */
interface DialogLayoutProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  actions?: ActionButton[];
  children: React.ReactNode;
  isForm?: boolean;
  handleSubmit?: () => void;
  noPadding?: boolean;
}

export const DialogLayout: React.FC<DialogLayoutProps> = ({
  open,
  onOpenChange,
  title,
  actions = [],
  children,
  isForm = false,
  handleSubmit,
  noPadding = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-159.5">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {isForm ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit?.();
            }}
          >
            {/* Body Content */}
            <div className={`max-h-[calc(100dvh-12rem)] overflow-y-auto ${noPadding ? '' : 'p-4'}`}>
              {children}
            </div>

            {/* Footer Actions */}
            <DialogFooter>
              {/* Cancel Button */}
              <DialogClose
                render={
                  <Button type="button" variant="underline" className="gap-2">
                    Cancel
                  </Button>
                }
              />
              {!actions.length && <span />}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    type={action.type ?? 'button'}
                    size="md"
                    variant={action.variant}
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </DialogFooter>
          </form>
        ) : (
          <>
            {/* Body Content */}
            <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto p-4">{children}</div>

            {/* Footer Actions */}
            <DialogFooter>
              {/* Cancel Button */}
              <DialogClose
                render={
                  <Button type="button" variant="underline" className="gap-2">
                    Cancel
                  </Button>
                }
              />
              {!actions.length && <span />}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    type={action.type ?? 'button'}
                    size="md"
                    variant={action.variant}
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogLayout;
