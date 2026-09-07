export const APP_NAME = 'VICECOMPANION';
export const APP_TAGLINE = 'Your game. Your progress. Your next move.';
export const APP_DESCRIPTION = 'Track missions, collectibles, vehicles, challenges and everything standing between you and 100%.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const GAME_DATA_VERSION = '1.0.0';
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_AVATAR_DIMENSION = 512;

export const NOTIFICATION_TYPES = {
  REMINDER: 'reminder',
  ACHIEVEMENT: 'achievement',
  PROGRESS: 'progress',
  SYSTEM: 'system',
} as const;

export const ACTIVITY_TYPES = {
  MISSION_COMPLETED: 'mission_completed',
  COLLECTIBLE_FOUND: 'collectible_found',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  VEHICLE_UNLOCKED: 'vehicle_unlocked',
  LEVEL_UP: 'level_up',
  BUSINESS_PURCHASED: 'business_purchased',
} as const;

export const MISSION_CATEGORIES = [
  'Main Story',
  'Side Mission',
  'Stranger & Freaks',
  'Heist',
  'Special',
] as const;

export const COLLECTIBLE_CATEGORIES = [
  'Hidden Packages',
  'Photo Opportunities',
  'Stashes',
  'Special Items',
] as const;

export const VEHICLE_CATEGORIES = [
  'Super',
  'Sports',
  'Off-Road',
  'Muscle',
  'Bike',
  'Utility',
  'Special',
] as const;

export const BUSINESS_TYPES = [
  'Nightclub',
  'Warehouse',
  'Bunker',
  'Arcade',
  'Auto Shop',
  'Agency',
] as const;

export const THEME_OPTIONS = [
  { value: 'dark', label: 'Dark', description: 'Default neon dark theme' },
  { value: 'darker', label: 'Darker', description: 'Even darker with subtle highlights' },
  { value: 'high-contrast', label: 'High Contrast', description: 'Maximum readability' },
] as const;

export const REDUCED_MOTION_KEY = 'reduced-motion';
export const AI_RECOMMENDATIONS_KEY = 'ai-recommendations';
export const NOTIFICATIONS_ENABLED_KEY = 'notifications-enabled';
export const PUSH_NOTIFICATIONS_KEY = 'push-notifications';