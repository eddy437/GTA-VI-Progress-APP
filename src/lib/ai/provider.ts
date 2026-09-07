import type { AIProvider, AIRecommendationRequest, AIRecommendationResponse } from './types';
import { FallbackAIProvider } from './fallback-provider';
import { OpenAIProvider } from './openai-provider';

export function createAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;

  if (provider === 'openai' && apiKey) {
    return new OpenAIProvider(apiKey, model);
  }

  // Default to fallback provider
  return new FallbackAIProvider();
}

export const aiProvider = createAIProvider();
export type { AIProvider, AIRecommendationRequest, AIRecommendationResponse };