import { BaseRepository } from './base-repository';
import type { Notification } from '@/types';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super('notifications');
  }

  async findUnreadNotifications(userId: string): Promise<Notification[]> {
    const client = await this.getClient();
    if (!client) return [];

    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching unread notifications:', error);
      return [];
    }

    return data as Notification[];
  }

  async markAsRead(id: string): Promise<Notification | null> {
    return this.update(id, {
      is_read: true,
      updated_at: new Date().toISOString(),
    } as Partial<Notification>);
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    const client = await this.getClient();
    if (!client) return false;

    const { error } = await client
      .from(this.tableName)
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }

    return true;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const client = await this.getClient();
    if (!client) return 0;

    const { count, error } = await client
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }

    return count || 0;
  }
}