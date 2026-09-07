'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameData } from '@/hooks/use-game-data';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { FilterBar } from '@/components/ui/filter-bar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { GradientProgress } from '@/components/ui/gradient-progress';
import { Target, Search, CheckCircle2, Clock, MapPin, DollarSign, Filter } from 'lucide-react';
import { MISSION_CATEGORIES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function MissionsPage() {
  const { missions, loading, error, refresh } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredMissions = useMemo(() => {
    let filtered = [...missions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (mission) =>
          mission.title.toLowerCase().includes(query) ||
          mission.description.toLowerCase().includes(query) ||
          mission.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((mission) => mission.category === selectedCategory);
    }

    // Status filter
    if (statusFilter === 'completed') {
      filtered = filtered.filter((mission) => mission.is_completed);
    } else if (statusFilter === 'incomplete') {
      filtered = filtered.filter((mission) => !mission.is_completed);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'reward':
          return b.reward - a.reward;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'status':
          return Number(a.is_completed) - Number(b.is_completed);
        default:
          return 0;
      }
    });

    return filtered;
  }, [missions, searchQuery, selectedCategory, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredMissions.length / itemsPerPage);
  const paginatedMissions = filteredMissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const completedCount = missions.filter((m) => m.is_completed).length;
  const totalCount = missions.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return <MissionsLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Missions"
        description="Track your progress through every mission"
        icon={<Target className="h-6 w-6" />}
      />

      {/* Progress Overview */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Mission Progress</h2>
            <Badge variant="success">
              {completedCount} / {totalCount} Completed
            </Badge>
          </div>
          <GradientProgress
            value={completedCount}
            max={totalCount}
            showPercentage
            height="lg"
            gradientFrom="from-vice-violet"
            gradientTo="to-vice-magenta"
          />
        </GlassCard>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <FilterBar>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {MISSION_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="reward">Reward</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </FilterBar>
      </motion.div>

      {/* Mission Grid */}
      {paginatedMissions.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MissionCard mission={mission} />
              </motion.div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState
          icon={<Target className="h-8 w-8" />}
          title="No missions found"
          description="Try adjusting your filters or search query"
        />
      )}
    </div>
  );
}

function MissionCard({ mission }: { mission: any }) {
  return (
    <GlassCard hover className="p-4 transition-all">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-semibold">{mission.title}</h3>
        {mission.is_completed ? (
          <CheckCircle2 className="h-5 w-5 text-vice-success" />
        ) : (
          <Clock className="h-5 w-5 text-vice-orange" />
        )}
      </div>
      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
        {mission.description}
      </p>
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="secondary">{mission.category}</Badge>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {mission.location}
        </span>
        <span className="flex items-center gap-1 font-semibold text-vice-success">
          <DollarSign className="h-4 w-4" />
          {formatCurrency(mission.reward)}
        </span>
      </div>
    </GlassCard>
  );
}

function MissionsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  );
}