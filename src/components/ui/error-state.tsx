'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/layout/glass-card';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <GlassCard className="p-12 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-6 text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </GlassCard>
  );
}