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