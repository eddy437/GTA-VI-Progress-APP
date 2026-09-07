import type { AIProvider, AIRecommendationRequest, AIRecommendationResponse } from './types';
import { AIRecommendationResponseSchema } from './types';

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'gpt-4') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async getRecommendation(
    input: AIRecommendationRequest
  ): Promise<AIRecommendationResponse> {
    const prompt = this.buildPrompt(input);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a gaming assistant that provides helpful recommendations for players. Return responses in JSON format.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const parsed = JSON.parse(content);
      return AIRecommendationResponseSchema.parse(parsed);
    } catch (error) {
      console.error('OpenAI provider error:', error);
      throw error;
    }
  }

  private buildPrompt(input: AIRecommendationRequest): string {
    return `Based on the following player stats, provide a gaming recommendation:
- Overall Progress: ${input.overallProgress}%
- Unfinished Missions: ${input.unfinishedMissions}
- Nearby Collectibles: ${input.nearbyCollectibles}
- Level: ${input.level}
- Recent Activities: ${input.recentActivities.join(', ') || 'None'}

Return a JSON object with:
{
  "title": "Recommendation title",
  "message": "Detailed recommendation message",
  "priority": "low|medium|high",
  "action": "Suggested action button text",
  "reason": "Why this recommendation is helpful"
}`;
  }
}