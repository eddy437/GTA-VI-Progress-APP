'use client';

import { useMemo } from 'react';
import type { ProgressBreakdown } from '@/types';

export function useProgress(progress: ProgressBreakdown | null) {
  const overallProgress = useMemo(() => {
    if (!progress) return null;

    const categories = Object.values(progress);
    const completed = categories.reduce((sum, p) => sum + p.completed, 0);
    const total = categories.reduce((sum, p) => sum + p.total, 0);
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      percentage,
      remaining: total - completed,
    };
  }, [progress]);

  const categoryProgress = useMemo(() => {
    if (!progress) return [];
    return Object.entries(progress).map(([key, value]) => ({
      category: key,
      ...value,
    }));
  }, [progress]);

  return {
    overallProgress,
    categoryProgress,
  };
}