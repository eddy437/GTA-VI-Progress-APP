'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientProgressProps {
  value: number;
  max?: number;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  height?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  animated?: boolean;
}

const heightClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export function GradientProgress({
  value,
  max = 100,
  className,
  gradientFrom = 'from-vice-magenta',
  gradientTo = 'to-vice-pink',
  height = 'md',
  showPercentage = false,
  animated = true,
}: GradientProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-1', className)}>
      <div className={cn(
        'relative w-full overflow-hidden rounded-full bg-white/10',
        heightClasses[height]
      )}>
        {animated ? (
          <motion.div
            className={cn(
              'h-full rounded-full bg-gradient-to-r',
              gradientFrom,
              gradientTo
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={cn(
              'h-full rounded-full bg-gradient-to-r',
              gradientFrom,
              gradientTo
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      {showPercentage && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{value} / {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}