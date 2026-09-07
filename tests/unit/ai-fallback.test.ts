import { describe, it, expect } from 'vitest';
import { FallbackAIProvider } from '@/lib/ai/fallback-provider';

describe('Fallback AI Provider', () => {
  const provider = new FallbackAIProvider();

  it('should return recommendation for unfinished missions', async () => {
    const result = await provider.getRecommendation({
      overallProgress: 30,
      unfinishedMissions: 10,
      nearbyCollectibles: 1,
      recentActivities: [],
      level: 15,
    });

    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('priority');
    expect(result).toHaveProperty('action');
    expect(result).toHaveProperty('reason');
  });

  it('should return recommendation for nearby collectibles', async () => {
    const result = await provider.getRecommendation({
      overallProgress: 60,
      unfinishedMissions: 2,
      nearbyCollectibles: 5,
      recentActivities: [],
      level: 25,
    });

    expect(result.priority).toBe('medium');
    expect(result.action).toBe('Open Map');
  });

  it('should return recommendation for high progress', async () => {
    const result = await provider.getRecommendation({
      overallProgress: 90,
      unfinishedMissions: 1,
      nearbyCollectibles: 0,
      recentActivities: [],
      level: 45,
    });

    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('message');
  });

  it('should handle edge cases', async () => {
    const result = await provider.getRecommendation({
      overallProgress: 0,
      unfinishedMissions: 0,
      nearbyCollectibles: 0,
      recentActivities: [],
      level: 1,
    });

    expect(result).toBeDefined();
    expect(result.priority).toMatch(/^(low|medium|high)$/);
  });
});