import { BaseRepository } from './base-repository';
import type { Activity } from '@/types';

export class ActivityRepository extends BaseRepository<Activity> {
  constructor() {
    super('activities');
  }

  async getRecentActivities(
    userId: string,
    limit = 20
  ): Promise<Activity[]> {
    const client = await this.getClient();
    if (!client) return [];

    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent activities:', error);
      return [];
    }

    return data as Activity[];
  }

  async logActivity(
    userId: string,
    type: string,
    description: string,
    metadata?: Record<string, any>
  ): Promise<Activity | null> {
    return this.create({
      user_id: userId,
      type,
      description,
      metadata,
    } as Partial<Activity>);
  }
}