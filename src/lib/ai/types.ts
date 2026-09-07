import { z } from 'zod';

export const AIRecommendationRequestSchema = z.object({
  overallProgress: z.number().min(0).max(100),
  unfinishedMissions: z.number().int().min(0),
  nearbyCollectibles: z.number().int().min(0),
  recentActivities: z.array(z.string()),
  level: z.number().int().positive(),
});

export const AIRecommendationResponseSchema = z.object({
  title: z.string(),
  message: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  action: z.string(),
  reason: z.string(),
});

export type AIRecommendationRequest = z.infer<typeof AIRecommendationRequestSchema>;
export type AIRecommendationResponse = z.infer<typeof AIRecommendationResponseSchema>;

export interface AIProvider {
  getRecommendation(
    input: AIRecommendationRequest
  ): Promise<AIRecommendationResponse>;
}