'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameData } from '@/hooks/use-game-data';
import { useProgress } from '@/hooks/use-progress';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, TrendingUp, Target, Package, Trophy, Medal, Car, Building2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const COLORS = ['#C52A9A', '#F12DB0', '#FF5B78', '#FF9A55', '#42F59E', '#7024A8'];

export default function StatsPage() {
  const { progress, loading, error, refresh } = useGameData();
  const { overallProgress, categoryProgress } = useProgress(progress);

  const chartData = useMemo(() => {
    if (!categoryProgress) return [];
    return categoryProgress.map((item) => ({
      name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      completed: item.completed,
      total: item.total,
      percentage: item.percentage,
    }));
  }, [categoryProgress]);

  const pieData = useMemo(() => {
    if (!overallProgress) return [];
    return [
      { name: 'Completed', value: overallProgress.completed },
      { name: 'Remaining', value: overallProgress.remaining },
    ];
  }, [overallProgress]);

  if (loading) {
    return <StatsLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statistics"
        description="Analyze your gaming progress"
        icon={<BarChart3 className="h-6 w-6" />}
      />

      {/* Overall Stats */}
      <motion.div {...fadeInUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Completion"
          value={`${overallProgress?.percentage || 0}%`}
          percentage={overallProgress?.percentage || 0}
          gradientFrom="from-vice-magenta"
          gradientTo="to-vice-pink"
        />
        <StatCard
          title="Total Completed"
          value={overallProgress?.completed.toString() || '0'}
          percentage={overallProgress?.percentage || 0}
          gradientFrom="from-vice-violet"
          gradientTo="to-vice-magenta"
        />
        <StatCard
          title="Remaining"
          value={overallProgress?.remaining.toString() || '0'}
          percentage={100 - (overallProgress?.percentage || 0)}
          gradientFrom="from-vice-coral"
          gradientTo="to-vice-orange"
        />
        <StatCard
          title="Total Items"
          value={overallProgress?.total.toString() || '0'}
          percentage={100}
          gradientFrom="from-vice-success"
          gradientTo="to-emerald-400"
        />
      </motion.div>

      {/* Category Progress Chart */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <h2 className="mb-6 text-xl font-semibold">Category Progress</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#C9BBD7" />
                <YAxis stroke="#C9BBD7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(27, 10, 56, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#C52A9A" />
                <Bar dataKey="total" fill="#7024A8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Completion Distribution */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <h2 className="mb-6 text-xl font-semibold">Completion Distribution</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(27, 10, 56, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div {...fadeInUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProgress.map((category) => {
          const icons = {
            missions: Target,
            collectibles: Package,
            challenges: Trophy,
            achievements: Medal,
            vehicles: Car,
            businesses: Building2,
          };
          const Icon = icons[category.category as keyof typeof icons] || Target;

          return (
            <GlassCard key={category.category} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <Icon className="h-5 w-5 text-vice-pink" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold capitalize">{category.category}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.completed} / {category.total} completed
                  </p>
                </div>
                <span className="text-lg font-bold">{category.percentage}%</span>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-[400px]" />
      <Skeleton className="h-[400px]" />
    </div>
  );
}