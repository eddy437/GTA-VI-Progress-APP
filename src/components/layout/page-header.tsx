import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
  icon,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vice-purple/20 text-vice-pink">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold lg:text-4xl">{title}</h1>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}