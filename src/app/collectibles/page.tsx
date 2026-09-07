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
import { Pagination } from '@/components/ui/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { GradientProgress } from '@/components/ui/gradient-progress';
import { Package, Search, CheckCircle2, MapPin, DollarSign } from 'lucide-react';
import { COLLECTIBLE_CATEGORIES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CollectiblesPage() {
  const { collectibles, loading, error, refresh } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredCollectibles = useMemo(() => {
    let filtered = [...collectibles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (statusFilter === 'found') {
      filtered = filtered.filter((item) => item.is_found);
    } else if (statusFilter === 'not_found') {
      filtered = filtered.filter((item) => !item.is_found);
    }

    return filtered;
  }, [collectibles, searchQuery, selectedCategory, statusFilter]);

  const totalPages = Math.ceil(filteredCollectibles.length / itemsPerPage);
  const paginatedCollectibles = filteredCollectibles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const foundCount = collectibles.filter((c) => c.is_found).length;
  const totalCount = collectibles.length;
  const completionPercentage = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0;

  if (loading) {
    return <CollectiblesLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collectibles"
        description="Find every hidden item in the game"
        icon={<Package className="h-6 w-6" />}
      />

      {/* Progress Overview */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Collection Progress</h2>
            <Badge variant="success">
              {foundCount} / {totalCount} Found
            </Badge>
          </div>
          <GradientProgress
            value={foundCount}
            max={totalCount}
            showPercentage
            height="lg"
            gradientFrom="from-vice-pink"
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
              placeholder="Search collectibles..."
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
              {COLLECTIBLE_CATEGORIES.map((category) => (
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
              <SelectItem value="found">Found</SelectItem>
              <SelectItem value="not_found">Not Found</SelectItem>
            </SelectContent>
          </Select>
        </FilterBar>
      </motion.div>

      {/* Collectibles Grid */}
      {paginatedCollectibles.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCollectibles.map((collectible, index) => (
              <motion.div
                key={collectible.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CollectibleCard collectible={collectible} />
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
          icon={<Package className="h-8 w-8" />}
          title="No collectibles found"
          description="Try adjusting your filters or search query"
        />
      )}
    </div>
  );
}

function CollectibleCard({ collectible }: { collectible: any }) {
  return (
    <GlassCard hover className="p-4">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-semibold">{collectible.name}</h3>
        {collectible.is_found ? (
          <CheckCircle2 className="h-5 w-5 text-vice-success" />
        ) : (
          <Package className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
        {collectible.description}
      </p>
      <div className="mb-3">
        <Badge variant="secondary">{collectible.category}</Badge>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {collectible.location}
        </span>
        <span className="flex items-center gap-1 font-semibold text-vice-success">
          <DollarSign className="h-4 w-4" />
          {formatCurrency(collectible.reward)}
        </span>
      </div>
    </GlassCard>
  );
}

function CollectiblesLoading() {
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