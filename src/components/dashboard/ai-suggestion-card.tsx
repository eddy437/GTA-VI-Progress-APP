'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/layout/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, ThumbsUp, ThumbsDown, MapPin } from 'lucide-react';

interface AISuggestionCardProps {
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  action: string;
  reason?: string;
  onAction?: () => void;
  onFeedback?: (positive: boolean) => void;
}

export function AISuggestionCard({
  title,
  message,
  priority,
  action,
  reason,
  onAction,
  onFeedback,
}: AISuggestionCardProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const priorityColors = {
    low: 'bg-vice-success/20 text-vice-success',
    medium: 'bg-vice-orange/20 text-vice-orange',
    high: 'bg-destructive/20 text-destructive',
  };

  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-vice-pink" />
        <h3 className="text-lg font-semibold">AI Suggestion</h3>
        <Badge className={priorityColors[priority]}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </Badge>
      </div>
      <h4 className="mb-2 text-xl font-bold">{title}</h4>
      <p className="mb-4 text-muted-foreground">{message}</p>
      {reason && (
        <p className="mb-4 text-sm text-muted-foreground italic">"{reason}"</p>
      )}
      <div className="flex items-center gap-2">
        {onAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
          >
            <MapPin className="mr-1 h-4 w-4" />
            {action}
          </Button>
        )}
        {onFeedback && (
          <div className="ml-auto flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFeedback('positive');
                onFeedback(true);
              }}
              className={feedback === 'positive' ? 'text-vice-success' : ''}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFeedback('negative');
                onFeedback(false);
              }}
              className={feedback === 'negative' ? 'text-destructive' : ''}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  );
}