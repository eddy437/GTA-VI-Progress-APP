'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
  showLabel?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    indicatorClassName,
    showLabel = false,
    animated = true,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-white/10',
          className
        )}
        {...props}
      >
        {animated ? (
          <motion.div
            className={cn(
              'h-full rounded-full bg-gradient-to-r from-vice-magenta to-vice-pink',
              indicatorClassName
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={cn(
              'h-full rounded-full bg-gradient-to-r from-vice-magenta to-vice-pink',
              indicatorClassName
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
        {showLabel && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };