'use client';

import { useState, useEffect } from 'react';
import { gameDataProvider } from '@/lib/game-data';
import type {
  User,
  ProgressBreakdown,
  Mission,
  Collectible,
  Challenge,
  Achievement,
  Vehicle,
  Business,
} from '@/types';

interface GameDataState {
  player: User | null;
  progress: ProgressBreakdown | null;
  missions: Mission[];
  collectibles: Collectible[];
  challenges: Challenge[];
  achievements: Achievement[];
  vehicles: Vehicle[];
  businesses: Business[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useGameData() {
  const [state, setState] = useState<GameDataState>({
    player: null,
    progress: null,
    missions: [],
    collectibles: [],
    challenges: [],
    achievements: [],
    vehicles: [],
    businesses: [],
    loading: true,
    error: null,
    refresh: async () => {},
  });

  const loadData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [
        player,
        progress,
        missions,
        collectibles,
        challenges,
        achievements,
        vehicles,
        businesses,
      ] = await Promise.all([
        gameDataProvider.getPlayer(),
        gameDataProvider.getProgress(),
        gameDataProvider.getMissions(),
        gameDataProvider.getCollectibles(),
        gameDataProvider.getChallenges(),
        gameDataProvider.getAchievements(),
        gameDataProvider.getVehicles(),
        gameDataProvider.getBusinesses(),
      ]);

      setState({
        player,
        progress,
        missions,
        collectibles,
        challenges,
        achievements,
        vehicles,
        businesses,
        loading: false,
        error: null,
        refresh: loadData,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return state;
}