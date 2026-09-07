'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/layout/glass-card';

export default function Error({
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
    <div className="flex min-h-screen items-center justify-center p-4">
      <GlassCard className="max-w-md p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
        <p className="mb-6 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} className="vice-gradient-bg hover:opacity-90">
          Try Again
        </Button>
      </GlassCard>
    </div>
  );
}