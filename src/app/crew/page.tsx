'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users2, Crown, Shield, Swords, Plus } from 'lucide-react';
import { getInitials } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Demo crew data
const demoCrews = [
  { id: '1', name: 'Vice Kings', members: 25, rank: 1, description: 'The most powerful crew in Vice City' },
  { id: '2', name: 'Skyline', members: 15, rank: 2, description: 'Racing specialists' },
  { id: '3', name: 'Los Santos Legends', members: 30, rank: 3, description: 'Experienced veterans' },
  { id: '4', name: 'Night Owls', members: 10, rank: 4, description: 'Night operation experts' },
  { id: '5', name: 'Shadow Syndicate', members: 12, rank: 5, description: 'Stealth specialists' },
];

const demoMembers = [
  { id: '1', username: 'ViceLegend', role: 'Leader', level: 27 },
  { id: '2', username: 'NightRider', role: 'Officer', level: 32 },
  { id: '3', username: 'ViceQueen', role: 'Member', level: 28 },
  { id: '4', username: 'ShadowStrike', role: 'Member', level: 35 },
];

export default function CrewPage() {
  const [selectedCrew, setSelectedCrew] = useState(demoCrews[0]);

  const roleIcons = {
    Leader: Crown,
    Officer: Shield,
    Member: Swords,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crew"
        description="Join forces with other players"
        icon={<Users2 className="h-6 w-6" />}
        actions={
          <Button className="vice-gradient-bg hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Create Crew
          </Button>
        }
      />

      {/* Crew List */}
      <motion.div {...fadeInUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demoCrews.map((crew) => (
          <GlassCard
            key={crew.id}
            hover
            className={`p-6 cursor-pointer ${selectedCrew?.id === crew.id ? 'border-vice-magenta/30' : ''}`}
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{crew.name}</h3>
                <p className="text-sm text-muted-foreground">{crew.description}</p>
              </div>
              <Badge variant="secondary">Rank #{crew.rank}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {crew.members} members
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCrew(crew)}
              >
                View
              </Button>
            </div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Selected Crew Members */}
      {selectedCrew && (
        <motion.div {...fadeInUp}>
          <GlassCard className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {selectedCrew.name} - Members
              </h2>
              <Badge variant="success">
                {selectedCrew.members} Active
              </Badge>
            </div>
            <div className="space-y-3">
              {demoMembers.map((member) => {
                const RoleIcon = roleIcons[member.role as keyof typeof roleIcons] || Swords;
                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 rounded-lg bg-white/5 p-3"
                  >
                    <Avatar>
                      <AvatarFallback>{getInitials(member.username)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.username}</p>
                      <p className="text-sm text-muted-foreground">Level {member.level}</p>
                    </div>
                    <Badge variant="secondary">
                      <RoleIcon className="mr-1 h-3 w-3" />
                      {member.role}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}