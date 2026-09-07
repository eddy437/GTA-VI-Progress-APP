'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

export function FilterBar({ children, className, sticky = false }: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-lg bg-white/5 p-2 backdrop-blur-sm',
        sticky && 'sticky top-20 z-10',
        className
      )}
    >
      {children}
    </div>
  );
}