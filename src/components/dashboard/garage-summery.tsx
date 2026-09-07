'use client';

import { GlassCard } from '@/components/layout/glass-card';
import { Car } from 'lucide-react';
import Link from 'next/link';

interface GarageSummaryProps {
  vehicles: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

export function GarageSummary({ vehicles }: GarageSummaryProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-vice-orange" />
          <h3 className="text-lg font-semibold">Garage</h3>
        </div>
        <Link
          href="/vehicles"
          className="text-sm text-vice-pink hover:underline"
        >
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {vehicles.slice(0, 4).map((vehicle) => (
          <div
            key={vehicle.id}
            className="rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
          >
            <p className="font-medium">{vehicle.name}</p>
            <p className="text-sm text-muted-foreground">{vehicle.category}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}