'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameData } from '@/hooks/use-game-data';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { FilterBar } from '@/components/ui/filter-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Map, MapPin, Navigation, Layers, Target, Package, Trophy, Car, Building2, Star } from 'lucide-react';
import { gameDataProvider } from '@/lib/game-data';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const markerTypes = {
  mission: { icon: Target, color: 'text-vice-violet', label: 'Mission' },
  collectible: { icon: Package, color: 'text-vice-pink', label: 'Collectible' },
  challenge: { icon: Trophy, color: 'text-vice-orange', label: 'Challenge' },
  vehicle: { icon: Car, color: 'text-vice-magenta', label: 'Vehicle' },
  business: { icon: Building2, color: 'text-vice-success', label: 'Business' },
  special: { icon: Star, color: 'text-vice-coral', label: 'Special' },
};

export default function MapPage() {
  const { loading, error, refresh } = useGameData();
  const [mapLocations, setMapLocations] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapError, setMapError] = useState(false);

  useMemo(() => {
    gameDataProvider.getMapLocations().then(setMapLocations).catch(() => setMapError(true));
  }, []);

  const filteredLocations = useMemo(() => {
    if (selectedType === 'all') return mapLocations;
    return mapLocations.filter((loc) => loc.type === selectedType);
  }, [mapLocations, selectedType]);

  if (loading) {
    return <MapLoading />;
  }

  if (error || mapError) {
    return <ErrorState onRetry={refresh} />;
  }

  const hasMapProvider = process.env.NEXT_PUBLIC_MAP_PROVIDER && process.env.NEXT_PUBLIC_MAP_TOKEN;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interactive Map"
        description="Explore every location in the game"
        icon={<Map className="h-6 w-6" />}
        actions={
          <Button variant="outline">
            <Navigation className="mr-2 h-4 w-4" />
            Center Map
          </Button>
        }
      />

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <FilterBar>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {Object.entries(markerTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="secondary">
            {filteredLocations.length} Locations
          </Badge>
        </FilterBar>
      </motion.div>

      {/* Map Container */}
      <motion.div {...fadeInUp}>
        {hasMapProvider ? (
          <InteractiveMap locations={filteredLocations} />
        ) : (
          <FallbackMap locations={filteredLocations} onSelect={setSelectedLocation} />
        )}
      </motion.div>

      {/* Location List */}
      <motion.div {...fadeInUp}>
        <GlassCard className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Locations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map((location) => {
              const markerType = markerTypes[location.type];
              const Icon = markerType?.icon || MapPin;
              const iconColor = markerType?.color || 'text-muted-foreground';

              return (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className="flex items-center gap-3 rounded-lg bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  <div className="flex-1">
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {location.type}
                    </p>
                  </div>
                  {location.is_completed && (
                    <Badge variant="success">Done</Badge>
                  )}
                </button>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function InteractiveMap({ locations }: { locations: any[] }) {
  // This would integrate with Mapbox or another map provider
  // For now, we show a placeholder that would be replaced with actual map integration
  return (
    <GlassCard className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-vice-grid opacity-20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Map className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <p className="text-lg font-semibold">Map Provider Integration</p>
          <p className="text-muted-foreground">
            Configure a map provider to enable interactive maps
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function FallbackMap({ locations, onSelect }: { locations: any[]; onSelect: (loc: any) => void }) {
  return (
    <GlassCard className="relative h-[600px] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-vice-grid opacity-20" />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-vice-background/50" />
      
      {/* Map markers */}
      {locations.map((location, index) => {
        const markerType = markerTypes[location.type];
        const Icon = markerType?.icon || MapPin;
        const iconColor = markerType?.color || 'text-muted-foreground';
        
        // Calculate position based on coordinates (simplified for fallback)
        const x = ((location.coordinates.lng + 80.25) / 0.2) * 100;
        const y = ((location.coordinates.lat - 25.7) / 0.15) * 100;
        
        return (
          <button
            key={location.id}
            onClick={() => onSelect(location)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="relative">
              <Icon className={`h-8 w-8 ${iconColor} ${location.is_completed ? 'opacity-50' : ''}`} />
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-vice-pink" />
            </div>
          </button>
        );
      })}
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon">
          <Layers className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Map legend */}
      <div className="absolute left-4 top-4 rounded-lg bg-white/5 p-3 backdrop-blur-sm">
        <p className="mb-2 text-sm font-semibold">Legend</p>
        <div className="space-y-1">
          {Object.entries(markerTypes).map(([key, value]) => {
            const Icon = value.icon;
            return (
              <div key={key} className="flex items-center gap-2 text-sm">
                <Icon className={`h-4 w-4 ${value.color}`} />
                <span>{value.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Demo notice */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-white/5 p-3 text-sm text-muted-foreground backdrop-blur-sm">
        Fallback map mode - Configure a map provider for interactive maps
      </div>
    </GlassCard>
  );
}

function MapLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-[600px]" />
      <Skeleton className="h-48" />
    </div>
  );
}