'use client';

import { motion } from 'framer-motion';
import { gameDataProvider } from '@/lib/game-data';
import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/layout/glass-card';
import { RadialProgress } from '@/components/progress/radial-progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Target,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  Brain,
  Activity,
  Car,
  Users,
  MapPin,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function DashboardPage() {
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(null);
  const [missions, setMissions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [playerData, progressData, missionsData, vehiclesData] = await Promise.all([
        gameDataProvider.getPlayer(),
        gameDataProvider.getProgress(),
        gameDataProvider.getMissions(),
        gameDataProvider.getVehicles(),
      ]);

      setPlayer(playerData);
      setProgress(progressData);
      setMissions(missionsData);
      setVehicles(vehiclesData);
      setActivities([
        {
          id: '1',
          type: 'mission_completed',
          description: 'Completed: Cargo Ship Robbery',
          date: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'vehicle_unlocked',
          description: 'New Vehicle Unlocked: Karin S95',
          date: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          type: 'collectible_found',
          description: 'Found 1/5 Hidden Packages',
          date: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: '4',
          type: 'level_up',
          description: 'Reached Level 27',
          date: new Date(Date.now() - 10800000).toISOString(),
        },
      ]);
    };

    loadData();
  }, []);

  if (!player || !progress) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-vice-pink border-t-transparent" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const overallCompleted = Object.values(progress).reduce((sum, p) => sum + p.completed, 0);
  const overallTotal = Object.values(progress).reduce((sum, p) => sum + p.total, 0);
  const overallPercentage = Math.round((overallCompleted / overallTotal) * 100);

  const ownedVehicles = vehicles.filter((v) => v.is_owned);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div {...fadeInUp}>
        <h1 className="text-3xl font-bold lg:text-4xl">
          Welcome back, <span className="vice-gradient-text">{player.username}</span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          More missions. More stories. More Vice.
        </p>
      </motion.div>

      {/* Main Progress Card */}
      <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
        <GlassCard className="p-6 lg:p-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="flex items-center gap-6">
              <RadialProgress value={overallPercentage} size={160} strokeWidth={12}>
                <span className="text-4xl font-bold">{overallPercentage}%</span>
              </RadialProgress>
              <div>
                <h2 className="text-2xl font-bold">Your Progress</h2>
                <p className="mt-2 text-muted-foreground">
                  You're getting closer. Keep pushing!
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="success">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {overallCompleted} / {overallTotal} Completed
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: 'Done', value: overallCompleted.toString(), icon: <Target className="h-5 w-5" /> },
                { label: 'Left', value: (overallTotal - overallCompleted).toString(), icon: <Clock className="h-5 w-5" /> },
                { label: 'Achievements', value: '12/58', icon: <Trophy className="h-5 w-5" /> },
                { label: 'Rewards', value: '$4.2M', icon: <DollarSign className="h-5 w-5" /> },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-white/5 p-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-vice-purple/20 text-vice-pink">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stat Row */}
      <motion.div {...fadeInUp} transition={{ delay: 0.15 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Main Story',
            value: '12 / 34',
            percentage: 35,
            color: 'from-vice-magenta to-vice-pink',
          },
          {
            title: 'Side Missions',
            value: '18 / 42',
            percentage: 43,
            color: 'from-vice-violet to-vice-magenta',
          },
          {
            title: 'Stranger & Freaks',
            value: '7 / 20',
            percentage: 35,
            color: 'from-vice-coral to-vice-orange',
          },
          {
            title: 'Collectibles',
            value: '15 / 30',
            percentage: 50,
            color: 'from-vice-success to-emerald-400',
          },
        ].map((stat) => (
          <Card key={stat.title} className="transition-all hover:scale-105">
            <CardContent className="p-4">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{stat.title}</h3>
              <p className="mb-2 text-2xl font-bold">{stat.value}</p>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Middle Row */}
      <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="grid gap-6 lg:grid-cols-2">
        {/* Reminder Card */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-vice-orange" />
            <h3 className="text-lg font-semibold">Reminder</h3>
          </div>
          <h4 className="mb-2 text-xl font-bold">The Assassination</h4>
          <p className="mb-4 text-muted-foreground">
            You left this mission unfinished. Complete it to progress the story.
          </p>
          <Badge variant="warning">Unfinished Mission</Badge>
        </GlassCard>

        {/* AI Suggestion */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-vice-pink" />
            <h3 className="text-lg font-semibold">AI Suggestion</h3>
          </div>
          <h4 className="mb-2 text-xl font-bold">Time to explore Vice Beach!</h4>
          <p className="mb-4 text-muted-foreground">
            You haven't found 3 collectibles near this area. Explore the beach to find them all.
          </p>
          <Badge variant="secondary">Explore Map</Badge>
        </GlassCard>
      </motion.div>

      {/* Recent Activity */}
      <motion.div {...fadeInUp} transition={{ delay: 0.25 }}>
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-vice-coral" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3"
              >
                <div className="flex items-center gap-3">
                  {activity.type === 'mission_completed' && (
                    <CheckCircle2 className="h-5 w-5 text-vice-success" />
                  )}
                  {activity.type === 'vehicle_unlocked' && (
                    <Car className="h-5 w-5 text-vice-orange" />
                  )}
                  {activity.type === 'collectible_found' && (
                    <MapPin className="h-5 w-5 text-vice-pink" />
                  )}
                  {activity.type === 'level_up' && (
                    <TrendingUp className="h-5 w-5 text-vice-coral" />
                  )}
                  <p className="font-medium">{activity.description}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Bottom Row */}
      <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="grid gap-6 lg:grid-cols-2">
        {/* Missions */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-vice-violet" />
            <h3 className="text-lg font-semibold">Missions</h3>
          </div>
          <div className="space-y-3">
            {missions.slice(0, 4).map((mission) => (
              <div key={mission.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {mission.is_completed ? (
                    <CheckCircle2 className="h-4 w-4 text-vice-success" />
                  ) : (
                    <Clock className="h-4 w-4 text-vice-orange" />
                  )}
                  <span className={mission.is_completed ? 'line-through opacity-50' : ''}>
                    {mission.title}
                  </span>
                </div>
                <Badge variant={mission.is_completed ? 'success' : 'secondary'}>
                  {mission.is_completed ? 'Done' : 'In Progress'}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Garage */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Car className="h-5 w-5 text-vice-orange" />
            <h3 className="text-lg font-semibold">Garage</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ownedVehicles.slice(0, 4).map((vehicle) => (
              <div key={vehicle.id} className="rounded-lg bg-white/5 p-3">
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-sm text-muted-foreground">{vehicle.category}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}