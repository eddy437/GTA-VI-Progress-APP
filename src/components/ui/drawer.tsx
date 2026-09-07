'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeClasses = {
  sm: {
    left: 'w-64',
    right: 'w-64',
    top: 'h-64',
    bottom: 'h-64',
  },
  md: {
    left: 'w-80',
    right: 'w-80',
    top: 'h-80',
    bottom: 'h-80',
  },
  lg: {
    left: 'w-96',
    right: 'w-96',
    top: 'h-96',
    bottom: 'h-96',
  },
  xl: {
    left: 'w-[32rem]',
    right: 'w-[32rem]',
    top: 'h-[32rem]',
    bottom: 'h-[32rem]',
  },
  full: {
    left: 'w-full',
    right: 'w-full',
    top: 'h-full',
    bottom: 'h-full',
  },
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  side = 'right',
  size = 'md',
  className,
}: DrawerProps) {
  const slideDirections = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' },
  };

  const drawerClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={slideDirections[side]}
            animate={{ x: 0, y: 0 }}
            exit={slideDirections[side]}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed z-50 border-white/10 bg-vice-purple/20 backdrop-blur-xl',
              drawerClasses[side],
              sizeClasses[size][side],
              className
            )}
          >
            <div className="flex h-full flex-col">
              {(title || description) && (
                <div className="border-b border-white/10 p-4">
                  <div className="flex items-center justify-between">
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
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}