import { z } from 'zod';

// Base entity types
export interface Timestamped {
  created_at: string;
  updated_at: string;
}

export interface UUIDEntity extends Timestamped {
  id: string;
}

// User and Profile types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  level: number;
  experience: number;
  created_at: string;
  updated_at: string;
}

// Game content types
export interface Mission extends Timestamped {
  id: string;
  title: string;
  description: string;
  category: 'Main Story' | 'Side Mission' | 'Stranger & Freaks' | 'Heist' | 'Special';
  location: string;
  reward: number;
  objectives: MissionObjective[];
  is_completed: boolean;
  completion_date?: string;
}

export interface MissionObjective {
  id: string;
  description: string;
  is_completed: boolean;
}

export interface Collectible extends Timestamped {
  id: string;
  name: string;
  category: 'Hidden Packages' | 'Photo Opportunities' | 'Stashes' | 'Special Items';
  location: string;
  reward: number;
  description: string;
  is_found: boolean;
  found_date?: string;
}

export interface Challenge extends Timestamped {
  id: string;
  title: string;
  description: string;
  category: string;
  target: number;
  current: number;
  reward: number;
  is_completed: boolean;
  completion_date?: string;
}

export interface Achievement extends Timestamped {
  id: string;
  title: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  reward: number;
  is_unlocked: boolean;
  unlock_date?: string;
}

export interface Vehicle extends Timestamped {
  id: string;
  name: string;
  category: 'Super' | 'Sports' | 'Off-Road' | 'Muscle' | 'Bike' | 'Utility' | 'Special';
  performance: {
    speed: number;
    acceleration: number;
    handling: number;
    braking: number;
  };
  is_owned: boolean;
  garage?: string;
  modifications: string[];
}

export interface Business extends Timestamped {
  id: string;
  name: string;
  type: 'Nightclub' | 'Warehouse' | 'Bunker' | 'Arcade' | 'Auto Shop' | 'Agency';
  location: string;
  income: number;
  upgrades: string[];
  status: 'active' | 'inactive' | 'upgrading';
  completion: number;
}

export interface Reminder extends Timestamped {
  id: string;
  title: string;
  description: string;
  linked_entity?: string;
  entity_type?: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'pending' | 'completed' | 'snoozed' | 'cancelled';
}

export interface Notification extends Timestamped {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'progress' | 'system';
  is_read: boolean;
  link?: string;
}

export interface Activity extends Timestamped {
  id: string;
  user_id: string;
  type: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface Crew extends Timestamped {
  id: string;
  name: string;
  description: string;
  member_count: number;
  rank: number;
}

// Progress types
export interface OverallProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface ProgressBreakdown {
  missions: OverallProgress;
  collectibles: OverallProgress;
  challenges: OverallProgress;
  achievements: OverallProgress;
  vehicles: OverallProgress;
  businesses: OverallProgress;
}

// AI types
export interface AIRecommendationInput {
  overallProgress: number;
  unfinishedMissions: number;
  nearbyCollectibles: number;
  recentActivities: string[];
  level: number;
}

export interface AIRecommendation {
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  action: string;
  reason: string;
}

// Map types
export interface MapLocation {
  id: string;
  name: string;
  type: 'mission' | 'collectible' | 'challenge' | 'vehicle' | 'business' | 'special';
  coordinates: {
    lat: number;
    lng: number;
  };
  is_completed: boolean;
}

// Provider types
export interface GameDataProvider {
  getPlayer(): Promise<User>;
  getProgress(): Promise<ProgressBreakdown>;
  getMissions(): Promise<Mission[]>;
  getMissionProgress(): Promise<OverallProgress>;
  getCollectibles(): Promise<Collectible[]>;
  getCollectibleProgress(): Promise<OverallProgress>;
  getChallenges(): Promise<Challenge[]>;
  getChallengeProgress(): Promise<OverallProgress>;
  getAchievements(): Promise<Achievement[]>;
  getVehicles(): Promise<Vehicle[]>;
  getBusinesses(): Promise<Business[]>;
  getMapLocations(): Promise<MapLocation[]>;
}

// Zod schemas
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  avatar_url: z.string().url().optional(),
  level: z.number().int().positive(),
  experience: z.number().int().nonnegative(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const MissionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  category: z.enum(['Main Story', 'Side Mission', 'Stranger & Freaks', 'Heist', 'Special']),
  location: z.string().max(200),
  reward: z.number().nonnegative(),
  objectives: z.array(z.object({
    id: z.string(),
    description: z.string().min(1),
    is_completed: z.boolean(),
  })),
  is_completed: z.boolean(),
  completion_date: z.string().datetime().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const AIRecommendationSchema = z.object({
  title: z.string(),
  message: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  action: z.string(),
  reason: z.string(),
});

export type Mission = z.infer<typeof MissionSchema>;
export type AIRecommendation = z.infer<typeof AIRecommendationSchema>;