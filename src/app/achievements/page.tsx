'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameData } from '@/hooks/use-game-data';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { FilterBar } from '@/components/ui/filter-bar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { GradientProgress } from '@/components/ui/gradient-progress';
import { Medal, Search, Lock, CheckCircle2, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const rarityColors: Record<string, string> = {
  Common: 'bg-gray-500/20 text-gray-300',
  Uncommon: 'bg-green-500/20 text-green-300',
  Rare: 'bg-blue-500/20 text-blue-300',
  Epic: 'bg-purple-500/20 text-purple-300',
  Legendary: 'bg-orange-500/20 text-orange-300',
};

export default function AchievementsPage() {
  const { achievements, loading, error, refresh } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rarityFilter, setRarityFilter] = useState('all');

  const filteredAchievements = useMemo(() => {
    let filtered = [...achievements];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (achievement) =>
          achievement.title.toLowerCase().includes(query) ||
          achievement.description.toLowerCase().includes(query)
      );
    }

    if (statusFilter === 'unlocked') {
      filtered = filtered.filter((achievement) => achievement.is_unlocked);
    } else if (statusFilter === 'locked') {
      filtered = filtered.filter((achievement) => !achievement.is_unlocked);
    }

    if (rarityFilter !== 'all') {
      filtered = filtered.filter((achievement) => achievement.rarity === rarityFilter);
    }

    return filtered;
  }, [achievements, searchQuery, statusFilter, rarityFilter]);

  const unlockedCount = achievements.filter((a) => a.is_unlocked).length;
  const totalCount = achievements.length;

  if (loading) {
    return <AchievementsLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Achievements"
        description="Unlock all achievements to become a legend"
        icon={<Medal className="h-6 w-6" />}
      />

      {/* Progress Overview */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Achievement Progress</h2>
            <Badge variant="success">
              {unlockedCount} / {totalCount} Unlocked
            </Badge>
          </div>
          <GradientProgress
            value={unlockedCount}
            max={totalCount}
            showPercentage
            height="lg"
            gradientFrom="from-vice-magenta"
            gradientTo="to-vice-pink"
          />
        </GlassCard>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <FilterBar>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unlocked">Unlocked</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="Common">Common</SelectItem>
              <SelectItem value="Uncommon">Uncommon</SelectItem>
              <SelectItem value="Rare">Rare</SelectItem>
              <SelectItem value="Epic">Epic</SelectItem>
              <SelectItem value="Legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </FilterBar>
      </motion.div>

      {/* Achievements Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <AchievementCard achievement={achievement} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Medal className="h-8 w-8" />}
          title="No achievements found"
          description="Try adjusting your filters or search query"
        />
      )}
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: any }) {
  return (
    <GlassCard
      hover
      className={`p-6 ${!achievement.is_unlocked ? 'opacity-75' : ''}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold">{achievement.title}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
        {achievement.is_unlocked ? (
          <CheckCircle2 className="h-6 w-6 text-vice-success" />
        ) : (
          <Lock className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <div className="mb-4 flex items-center gap-2">
        <Badge className={rarityColors[achievement.rarity]}>
          {achievement.rarity}
        </Badge>
        <span className="flex items-center gap-1 text-sm font-semibold text-vice-success">
          <DollarSign className="h-4 w-4" />
          {formatCurrency(achievement.reward)}
        </span>
      </div>
      {achievement.is_unlocked && achievement.unlock_date && (
        <p className="text-sm text-muted-foreground">
          Unlocked: {formatDate(achievement.unlock_date)}
        </p>
      )}
    </GlassCard>
  );
}

function AchievementsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  );
}