import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  className?: string;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-card',
          hover && 'glass-card-hover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';