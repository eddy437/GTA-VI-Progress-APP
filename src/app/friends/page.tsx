'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UserPlus, Search, MessageSquare, UserCheck } from 'lucide-react';
import { getInitials } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Demo friends data
const demoFriends = [
  { id: '1', username: 'NightRider', level: 32, status: 'online' },
  { id: '2', username: 'ViceQueen', level: 28, status: 'offline' },
  { id: '3', username: 'ShadowStrike', level: 35, status: 'online' },
  { id: '4', username: 'TurboBoost', level: 24, status: 'away' },
  { id: '5', username: 'MiamiHeat', level: 30, status: 'online' },
];

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState(demoFriends);

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineCount = friends.filter((f) => f.status === 'online').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Friends"
        description={`${onlineCount} friends online`}
        icon={<Users className="h-6 w-6" />}
        actions={
          <Button className="vice-gradient-bg hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Friend
          </Button>
        }
      />

      {/* Search */}
      <motion.div {...fadeInUp}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </motion.div>

      {/* Friends List */}
      {filteredFriends.length > 0 ? (
        <div className="space-y-4">
          {filteredFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard hover className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{getInitials(friend.username)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{friend.username}</h3>
                    <p className="text-sm text-muted-foreground">Level {friend.level}</p>
                  </div>
                  <Badge
                    variant={
                      friend.status === 'online' ? 'success' :
                      friend.status === 'away' ? 'warning' : 'secondary'
                    }
                  >
                    {friend.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No friends found"
          description="Try adjusting your search query or add new friends"
          action={
            <Button className="vice-gradient-bg hover:opacity-90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Friend
            </Button>
          }
        />
      )}
    </div>
  );
}