import type { AIProvider, AIRecommendationRequest, AIRecommendationResponse } from './types';

export class FallbackAIProvider implements AIProvider {
  private recommendations: AIRecommendationResponse[] = [
    {
      title: 'Time to explore Vice Beach!',
      message: "You haven't found 3 collectibles near this area. Explore the beach to find them all.",
      priority: 'medium',
      action: 'Open Map',
      reason: 'Collectibles in this area will boost your completion percentage',
    },
    {
      title: 'Complete The Assassination',
      message: 'This main story mission is still unfinished. Completing it will unlock new missions.',
      priority: 'high',
      action: 'View Mission',
      reason: 'Main story missions unlock critical progression',
    },
    {
      title: 'Challenge Progress',
      message: "You're 2 challenges away from your next achievement. Focus on Speed Demon challenge.",
      priority: 'low',
      action: 'View Challenges',
      reason: 'Completing challenges earns valuable rewards',
    },
    {
      title: 'Vehicle Collection',
      message: 'You can afford a new super car. Check the vehicle dealership for available options.',
      priority: 'low',
      action: 'View Vehicles',
      reason: 'New vehicles improve mission performance',
    },
    {
      title: 'Business Opportunity',
      message: 'Your nightclub is ready for an upgrade. Invest to increase passive income.',
      priority: 'medium',
      action: 'View Business',
      reason: 'Upgraded businesses generate more income',
    },
  ];

  async getRecommendation(
    input: AIRecommendationRequest
  ): Promise<AIRecommendationResponse> {
    // Simple deterministic logic based on input
    let recommendation: AIRecommendationResponse;

    if (input.unfinishedMissions > 5) {
      recommendation = this.recommendations[1];
    } else if (input.nearbyCollectibles > 2) {
      recommendation = this.recommendations[0];
    } else if (input.overallProgress < 50) {
      recommendation = this.recommendations[2];
    } else if (input.overallProgress < 80) {
      recommendation = this.recommendations[3];
    } else {
      recommendation = this.recommendations[4];
    }

    // Add slight delay to simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 300));

    return recommendation;
  }
}