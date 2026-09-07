'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  closeOnOverlayClick?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full h-full',
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  closeOnOverlayClick = true,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'w-full rounded-lg border border-white/10 bg-vice-purple/95 backdrop-blur-xl',
                sizeClasses[size],
                className
              )}
            >
              {(title || description) && (
                <div className="flex items-start justify-between border-b border-white/10 p-4">
                  <div>
                    {title && <h2 className="text-lg font-semibold">{title}</h2>}
                    {description && (
                      <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
              <div className="p-4">{children}</div>
              {footer && (
                <div className="flex justify-end gap-2 border-t border-white/10 p-4">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}