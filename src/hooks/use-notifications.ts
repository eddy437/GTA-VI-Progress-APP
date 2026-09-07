'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEMO_MODE } from '@/lib/constants';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (DEMO_MODE) {
        const mockNotifications: Notification[] = [
          {
            id: 'notif-1',
            title: 'Reminder',
            message: 'The Assassination is still unfinished',
            type: 'reminder',
            is_read: false,
            created_at: new Date().toISOString(),
          },
          {
            id: 'notif-2',
            title: 'Collectibles',
            message: '3 collectibles remain near Vice Beach',
            type: 'progress',
            is_read: false,
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 'notif-3',
            title: 'Achievement Progress',
            message: "You're 2 challenges away from your next achievement",
            type: 'achievement',
            is_read: true,
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter((n) => !n.is_read).length);
      } else {
        const response = await fetch('/api/notifications');
        const data = await response.json();

        if (data.success) {
          setNotifications(data.data);
          setUnreadCount(data.data.filter((n: Notification) => !n.is_read).length);
        } else {
          throw new Error(data.error?.message || 'Failed to fetch notifications');
        }
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      if (DEMO_MODE) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, is_read: true }
              : notification
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
        return;
      }

      // In production, call the API
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, is_read: true }
              : notification
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      if (DEMO_MODE) {
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, is_read: true }))
        );
        setUnreadCount(0);
        return;
      }

      // In production, call the API
      const response = await fetch('/api/notifications/read-all', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, is_read: true }))
        );
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}