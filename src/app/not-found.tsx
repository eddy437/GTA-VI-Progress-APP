import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/layout/glass-card';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <GlassCard className="max-w-md p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="vice-gradient-bg hover:opacity-90">
          <Link href="/">Return Home</Link>
        </Button>
      </GlassCard>
    </div>
  );
}