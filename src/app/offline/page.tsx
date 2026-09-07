import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/layout/glass-card';
import { WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <GlassCard className="max-w-md p-8 text-center">
        <WifiOff className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-4 text-3xl font-bold">You're Offline</h1>
        <p className="mb-6 text-muted-foreground">
          Please check your internet connection and try again.
        </p>
        <Button asChild className="vice-gradient-bg hover:opacity-90">
          <Link href="/">Retry</Link>
        </Button>
      </GlassCard>
    </div>
  );
}