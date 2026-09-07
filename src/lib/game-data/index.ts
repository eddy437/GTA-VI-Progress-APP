import { DEMO_MODE } from '@/lib/constants';
import { MockGameDataProvider } from './providers/mock';
import { OfficialGameDataProvider } from './providers/official';
import type { GameDataProvider } from './types';

export function createGameDataProvider(): GameDataProvider {
  if (DEMO_MODE) {
    return new MockGameDataProvider();
  }

  // In production mode, check if official API is configured
  const officialApiUrl = process.env.OFFICIAL_GAME_API_URL;
  const officialApiKey = process.env.OFFICIAL_GAME_API_KEY;

  if (officialApiUrl && officialApiKey) {
    return new OfficialGameDataProvider(officialApiUrl, officialApiKey);
  }

  // Fallback to mock provider if no external services are configured
  return new MockGameDataProvider();
}

export const gameDataProvider = createGameDataProvider();
export type { GameDataProvider } from './types';