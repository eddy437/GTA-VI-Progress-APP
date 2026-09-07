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
import { Trophy, Search, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ChallengesPage() {
  const { challenges, loading, error, refresh } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('progress');

  const filteredChallenges = useMemo(() => {
    let filtered = [...challenges];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(query) ||
          challenge.description.toLowerCase().includes(query)
      );
    }

    if (statusFilter === 'completed') {
      filtered = filtered.filter((challenge) => challenge.is_completed);
    } else if (statusFilter === 'incomplete') {
      filtered = filtered.filter((challenge) => !challenge.is_completed);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          const aProgress = a.target > 0 ? (a.current / a.target) * 100 : 0;
          const bProgress = b.target > 0 ? (b.current / b.target) * 100 : 0;
          return bProgress - aProgress;
        case 'reward':
          return b.reward - a.reward;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [challenges, searchQuery, statusFilter, sortBy]);

  const completedCount = challenges.filter((c) => c.is_completed).length;
  const totalCount = challenges.length;

  if (loading) {
    return <ChallengesLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Challenges"
        description="Complete challenges to earn rewards"
        icon={<Trophy className="h-6 w-6" />}
      />

      {/* Progress Overview */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Challenge Progress</h2>
            <Badge variant="success">
              {completedCount} / {totalCount} Completed
            </Badge>
          </div>
          <GradientProgress
            value={completedCount}
            max={totalCount}
            showPercentage
            height="lg"
            gradientFrom="from-vice-orange"
            gradientTo="to-vice-coral"
          />
        </GlassCard>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <FilterBar>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="reward">Reward</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </FilterBar>
      </motion.div>

      {/* Challenges List */}
      {filteredChallenges.length > 0 ? (
        <div className="space-y-4">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <ChallengeCard challenge={challenge} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Trophy className="h-8 w-8" />}
          title="No challenges found"
          description="Try adjusting your filters or search query"
        />
      )}
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: any }) {
  const progress = challenge.target > 0 ? (challenge.current / challenge.target) * 100 : 0;

  return (
    <GlassCard hover className="p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold">{challenge.title}</h3>
          <p className="text-sm text-muted-foreground">{challenge.description}</p>
        </div>
        {challenge.is_completed ? (
          <CheckCircle2 className="h-6 w-6 text-vice-success" />
        ) : (
          <Clock className="h-6 w-6 text-vice-orange" />
        )}
      </div>
      <div className="mb-3">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-muted-foreground">
            {challenge.current} / {challenge.target}
          </span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
        <GradientProgress
          value={challenge.current}
          max={challenge.target}
          gradientFrom="from-vice-orange"
          gradientTo="to-vice-coral"
        />
      </div>
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{challenge.category}</Badge>
        <span className="flex items-center gap-1 font-semibold text-vice-success">
          <DollarSign className="h-4 w-4" />
          {formatCurrency(challenge.reward)}
        </span>
      </div>
    </GlassCard>
  );
}

function ChallengesLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}