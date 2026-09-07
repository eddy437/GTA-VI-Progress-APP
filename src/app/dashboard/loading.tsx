import { Skeleton } from '@/components/ui/skeleton';
import { GlassCard } from '@/components/layout/glass-card';

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Main progress skeleton */}
      <GlassCard className="p-6 lg:p-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-6">
            <Skeleton className="h-40 w-40 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-24 rounded-lg" />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Stat cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>

      {/* Middle row skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
      </div>

      {/* Bottom row skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  );
}