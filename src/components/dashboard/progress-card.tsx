'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/layout/glass-card';
import { RadialProgress } from '@/components/progress/radial-progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface ProgressCardProps {
  percentage: number;
  completed: number;
  total: number;
  achievements: string;
  rewards: string;
}

export function ProgressCard({
  percentage,
  completed,
  total,
  achievements,
  rewards,
}: ProgressCardProps) {
  return (
    <GlassCard className="p-6 lg:p-8">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-6">
          <RadialProgress value={percentage} size={160} strokeWidth={12}>
            <div className="text-center">
              <span className="text-4xl font-bold">{percentage}%</span>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </RadialProgress>
          <div>
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <p className="mt-2 text-muted-foreground">
              You're getting closer. Keep pushing!
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="success">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {completed} / {total} Completed
              </Badge>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-white/5 p-4 text-center">
            <div className="text-2xl font-bold">{achievements}</div>
            <div className="mt-1 text-sm text-muted-foreground">Achievements</div>
          </div>
          <div className="rounded-lg bg-white/5 p-4 text-center">
            <div className="text-2xl font-bold">{rewards}</div>
            <div className="mt-1 text-sm text-muted-foreground">Rewards</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}