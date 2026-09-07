import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-vice-pink" />
        <p className="text-lg font-semibold text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}