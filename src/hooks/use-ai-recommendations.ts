'use client';

import { useState, useCallback } from 'react';
import { DEMO_MODE } from '@/lib/constants';
import type { AIRecommendation } from '@/types';

export function useAIRecommendations() {
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRecommendation = useCallback(async (input: {
    overallProgress: number;
    unfinishedMissions: number;
    nearbyCollectibles: number;
    recentActivities: string[];
    level: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (data.success) {
        setRecommendation(data.data);
        return data.data;
      } else {
        throw new Error(data.error?.message || 'Failed to get recommendation');
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const provideFeedback = useCallback(
    async (positive: boolean) => {
      // In production, send feedback to improve recommendations
      console.log('AI recommendation feedback:', positive ? 'positive' : 'negative');
    },
    []
  );

  return {
    recommendation,
    loading,
    error,
    getRecommendation,
    provideFeedback,
  };
}