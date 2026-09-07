'use client';

import { GlassCard } from '@/components/layout/glass-card';
import { Activity } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import {
  CheckCircle2,
  Car,
  MapPin,
  TrendingUp,
  Trophy,
  Building2,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  date: string;
  metadata?: Record<string, any>;
}

interface ActivityListProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
  onViewAll?: () => void;
}

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  mission_completed: CheckCircle2,
  collectible_found: MapPin,
  achievement_unlocked: Trophy,
  vehicle_unlocked: Car,
  level_up: TrendingUp,
  business_purchased: Building2,
};

const activityColors: Record<string, string> = {
  mission_completed: 'text-vice-success',
  collectible_found: 'text-vice-pink',
  achievement_unlocked: 'text-vice-orange',
  vehicle_unlocked: 'text-vice-coral',
  level_up: 'text-vice-coral',
  business_purchased: 'text-vice-violet',
};

export function ActivityList({
  activities,
  title = 'Recent Activity',
  maxItems,
  onViewAll,
}: ActivityListProps) {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;

  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-vice-coral" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {onViewAll && activities.length > 0 && (
          <button
            onClick={onViewAll}
            className="text-sm text-vice-pink hover:underline"
          >
            View All
          </button>
        )}
      </div>
      <div className="space-y-3">
        {displayActivities.map((activity) => {
          const Icon = activityIcons[activity.type] || Activity;
          const iconColor = activityColors[activity.type] || 'text-muted-foreground';
          
          return (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${iconColor}`} />
                <p className="font-medium">{activity.description}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatRelativeTime(activity.date)}
              </span>
            </div>
          );
        })}
        {displayActivities.length === 0 && (
          <p className="text-center text-muted-foreground">No recent activity</p>
        )}
      </div>
    </GlassCard>
  );
}