'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/page-header';
import { GlassCard } from '@/components/layout/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { useNotifications } from '@/hooks/use-notifications';
import { Bell, CheckCircle2, Clock, Trophy, TrendingUp, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const notificationIcons = {
  reminder: Clock,
  achievement: Trophy,
  progress: TrendingUp,
  system: Bell,
};

const notificationColors = {
  reminder: 'text-vice-orange',
  achievement: 'text-vice-pink',
  progress: 'text-vice-success',
  system: 'text-vice-violet',
};

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'unread') return !notification.is_read;
    if (filter === 'read') return notification.is_read;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description={`You have ${unreadCount} unread notifications`}
        icon={<Bell className="h-6 w-6" />}
        actions={
          unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )
        }
      />

      {/* Filters */}
      <motion.div {...fadeInUp}>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption)}
              className={filter === filterOption ? 'vice-gradient-bg' : ''}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              {filterOption === 'unread' && unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => {
            const Icon = notificationIcons[notification.type as keyof typeof notificationIcons] || Bell;
            const iconColor = notificationColors[notification.type as keyof typeof notificationColors] || 'text-muted-foreground';

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  hover
                  className={`p-4 ${!notification.is_read ? 'border-vice-magenta/30' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.is_read && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(notification.created_at)}
                        </span>
                        {!notification.is_read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="h-8 w-8" />}
          title="No notifications"
          description="You're all caught up!"
        />
      )}
    </div>
  );
}