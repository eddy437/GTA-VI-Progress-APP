'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/layout/glass-card';
import { AlertCircle } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <GlassCard className="max-w-md p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h2 className="mb-4 text-2xl font-bold">Failed to Load Dashboard</h2>
        <p className="mb-6 text-muted-foreground">
          There was an error loading your dashboard. Please try again.
        </p>
        <Button onClick={reset} className="vice-gradient-bg hover:opacity-90">
          Try Again
        </Button>
      </GlassCard>
    </div>
  );
}