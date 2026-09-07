import type { GameDataProvider } from '../types';
import type {
  User,
  ProgressBreakdown,
  Mission,
  Collectible,
  Challenge,
  Achievement,
  Vehicle,
  Business,
  MapLocation,
  OverallProgress,
} from '@/types';
import { mockData } from '@/data/mock-data';

export class MockGameDataProvider implements GameDataProvider {
  async getPlayer(): Promise<User> {
    return mockData.player;
  }

  async getProgress(): Promise<ProgressBreakdown> {
    return mockData.progress;
  }

  async getMissions(): Promise<Mission[]> {
    return mockData.missions;
  }

  async getMissionProgress(): Promise<OverallProgress> {
    const completed = mockData.missions.filter((m) => m.is_completed).length;
    const total = mockData.missions.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  async getCollectibles(): Promise<Collectible[]> {
    return mockData.collectibles;
  }

  async getCollectibleProgress(): Promise<OverallProgress> {
    const found = mockData.collectibles.filter((c) => c.is_found).length;
    const total = mockData.collectibles.length;
    return {
      completed: found,
      total,
      percentage: total > 0 ? Math.round((found / total) * 100) : 0,
    };
  }

  async getChallenges(): Promise<Challenge[]> {
    return mockData.challenges;
  }

  async getChallengeProgress(): Promise<OverallProgress> {
    const completed = mockData.challenges.filter((c) => c.is_completed).length;
    const total = mockData.challenges.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  async getAchievements(): Promise<Achievement[]> {
    return mockData.achievements;
  }

  async getVehicles(): Promise<Vehicle[]> {
    return mockData.vehicles;
  }

  async getBusinesses(): Promise<Business[]> {
    return mockData.businesses;
  }

  async getMapLocations(): Promise<MapLocation[]> {
    return mockData.mapLocations;
  }
}