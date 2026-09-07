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
import { Building2, Search, MapPin, DollarSign, TrendingUp, Wrench } from 'lucide-react';
import { BUSINESS_TYPES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function BusinessesPage() {
  const { businesses, loading, error, refresh } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBusinesses = useMemo(() => {
    let filtered = [...businesses];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(query) ||
          business.location.toLowerCase().includes(query)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((business) => business.type === selectedType);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((business) => business.status === statusFilter);
    }

    return filtered;
  }, [businesses, searchQuery, selectedType, statusFilter]);

  if (loading) {
    return <BusinessesLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Businesses"
        description="Build your criminal empire"
        icon={<Building2 className="h-6 w-6" />}
      />

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <FilterBar>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {BUSINESS_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="upgrading">Upgrading</SelectItem>
            </SelectContent>
          </Select>
        </FilterBar>
      </motion.div>

      {/* Businesses Grid */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BusinessCard business={business} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Building2 className="h-8 w-8" />}
          title="No businesses found"
          description="Try adjusting your filters or search query"
        />
      )}
    </div>
  );
}

function BusinessCard({ business }: { business: any }) {
  const statusColors: Record<string, string> = {
    active: 'bg-vice-success/20 text-vice-success',
    inactive: 'bg-gray-500/20 text-gray-400',
    upgrading: 'bg-vice-orange/20 text-vice-orange',
  };

  return (
    <GlassCard hover className="p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-lg font-semibold">{business.name}</h3>
          <p className="text-sm text-muted-foreground">{business.type}</p>
        </div>
        <Badge className={statusColors[business.status]}>
          {business.status}
        </Badge>
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {business.location}
          </span>
          <span className="flex items-center gap-1 font-semibold text-vice-success">
            <DollarSign className="h-4 w-4" />
            {formatCurrency(business.income)}/day
          </span>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span>{business.completion}%</span>
          </div>
          <GradientProgress
            value={business.completion}
            gradientFrom="from-vice-violet"
            gradientTo="to-vice-magenta"
          />
        </div>
      </div>

      {business.upgrades.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-muted-foreground">
            <Wrench className="mr-1 inline h-4 w-4" />
            Upgrades
          </p>
          <div className="flex flex-wrap gap-2">
            {business.upgrades.map((upgrade: string) => (
              <Badge key={upgrade} variant="secondary">
                {upgrade}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}

function BusinessesLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  );
}