import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/layout/glass-card';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <GlassCard className={cn('p-12 text-center', className)}>
      {icon && (
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {description && (
        <p className="mb-6 text-muted-foreground">{description}</p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </GlassCard>
  );
}