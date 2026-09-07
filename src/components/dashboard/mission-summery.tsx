'use client';

import { GlassCard } from '@/components/layout/glass-card';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GradientProgress } from '@/components/ui/gradient-progress';
import Link from 'next/link';

interface MissionSummaryProps {
  missions: Array<{
    id: string;
    title: string;
    category: string;
    is_completed: boolean;
  }>;
  completedCount: number;
  totalCount: number;
}

export function MissionSummary({
  missions,
  completedCount,
  totalCount,
}: MissionSummaryProps) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-vice-violet" />
          <h3 className="text-lg font-semibold">Missions</h3>
        </div>
        <Link
          href="/missions"
          className="text-sm text-vice-pink hover:underline"
        >
          View All
        </Link>
      </div>
      
      <div className="mb-4">
        <GradientProgress
          value={completedCount}
          max={totalCount}
          showPercentage
          gradientFrom="from-vice-violet"
          gradientTo="to-vice-magenta"
        />
      </div>

      <div className="space-y-3">
        {missions.slice(0, 4).map((mission) => (
          <div key={mission.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {mission.is_completed ? (
                <CheckCircle2 className="h-4 w-4 text-vice-success" />
              ) : (
                <Clock className="h-4 w-4 text-vice-orange" />
              )}
              <span className={mission.is_completed ? 'line-through opacity-50' : ''}>
                {mission.title}
              </span>
            </div>
            <Badge variant={mission.is_completed ? 'success' : 'secondary'}>
              {mission.is_completed ? 'Done' : 'In Progress'}
            </Badge>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}