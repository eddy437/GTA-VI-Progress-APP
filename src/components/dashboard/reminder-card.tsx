'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/layout/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, Bell, BellOff } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface ReminderCardProps {
  title: string;
  description: string;
  type: string;
  scheduledDate?: string;
  onComplete?: () => void;
  onSnooze?: () => void;
}

export function ReminderCard({
  title,
  description,
  type,
  scheduledDate,
  onComplete,
  onSnooze,
}: ReminderCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(false);

  if (isCompleted) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8 text-vice-success" />
          <div>
            <h3 className="font-semibold">Reminder Completed</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={`p-6 ${isSnoozed ? 'opacity-50' : ''}`}>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-vice-orange" />
        <h3 className="text-lg font-semibold">Reminder</h3>
        {scheduledDate && (
          <span className="ml-auto text-sm text-muted-foreground">
            {formatRelativeTime(scheduledDate)}
          </span>
        )}
      </div>
      <h4 className="mb-2 text-xl font-bold">{title}</h4>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <div className="flex items-center gap-2">
        <Badge variant="warning">{type}</Badge>
        <div className="ml-auto flex gap-2">
          {onSnooze && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSnoozed(true);
                onSnooze();
              }}
            >
              <BellOff className="mr-1 h-4 w-4" />
              Snooze
            </Button>
          )}
          {onComplete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsCompleted(true);
                onComplete();
              }}
            >
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Complete
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}