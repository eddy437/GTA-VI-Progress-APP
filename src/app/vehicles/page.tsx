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
import { Car, Search, CheckCircle2, Gauge, Zap, Cog, Disc } from 'lucide-react';
import { VEHICLE_CATEGORIES } from '@/lib/constants';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function VehiclesPage() {
  const { vehicles, loading, error, refresh } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((vehicle) => vehicle.category === selectedCategory);
    }

    if (statusFilter === 'owned') {
      filtered = filtered.filter((vehicle) => vehicle.is_owned);
    } else if (statusFilter === 'not_owned') {
      filtered = filtered.filter((vehicle) => !vehicle.is_owned);
    }

    return filtered;
  }, [vehicles, searchQuery, selectedCategory, statusFilter]);

  const ownedCount = vehicles.filter((v) => v.is_owned).length;
  const totalCount = vehicles.length;

  if (loading) {
    return <VehiclesLoading />;
  }

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicles"
        description="Build your ultimate garage"
        icon={<Car className="h-6 w-6" />}
      />

      {/* Ownership Overview */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Vehicle Collection</h2>
            <Badge variant="success">
              {ownedCount} / {totalCount} Owned
            </Badge>
          </div>
        </GlassCard>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <FilterBar>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
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
              {VEHICLE_CATEGORIES.map((category) => (
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
              <SelectItem value="owned">Owned</SelectItem>
              <SelectItem value="not_owned">Not Owned</SelectItem>
            </SelectContent>
          </Select>
        </FilterBar>
      </motion.div>

      {/* Vehicles Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Car className="h-8 w-8" />}
          title="No vehicles found"
          description="Try adjusting your filters or search query"
        />
      )}
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <GlassCard
      hover
      className={`p-4 ${!vehicle.is_owned ? 'opacity-75' : ''}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{vehicle.name}</h3>
          <p className="text-sm text-muted-foreground">{vehicle.category}</p>
        </div>
        {vehicle.is_owned ? (
          <CheckCircle2 className="h-5 w-5 text-vice-success" />
        ) : (
          <Car className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      {/* Performance Stats */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Gauge className="h-4 w-4" /> Speed
          </span>
          <span>{vehicle.performance.speed}/10</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Zap className="h-4 w-4" /> Acceleration
          </span>
          <span>{vehicle.performance.acceleration}/10</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Cog className="h-4 w-4" /> Handling
          </span>
          <span>{vehicle.performance.handling}/10</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Disc className="h-4 w-4" /> Braking
          </span>
          <span>{vehicle.performance.braking}/10</span>
        </div>
      </div>

      {vehicle.is_owned && vehicle.garage && (
        <p className="text-sm text-muted-foreground">
          Garage: {vehicle.garage}
        </p>
      )}
    </GlassCard>
  );
}

function VehiclesLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  );
}