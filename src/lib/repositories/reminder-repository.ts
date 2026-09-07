import { BaseRepository } from './base-repository';
import type { Reminder } from '@/types';

export class ReminderRepository extends BaseRepository<Reminder> {
  constructor() {
    super('reminders');
  }

  async findPendingReminders(userId: string): Promise<Reminder[]> {
    const client = await this.getClient();
    if (!client) return [];

    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .order('scheduled_date', { ascending: true });

    if (error) {
      console.error('Error fetching pending reminders:', error);
      return [];
    }

    return data as Reminder[];
  }

  async findUpcomingReminders(
    userId: string,
    hours = 24
  ): Promise<Reminder[]> {
    const client = await this.getClient();
    if (!client) return [];

    const now = new Date();
    const future = new Date(now.getTime() + hours * 3600000);

    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .gte('scheduled_date', now.toISOString())
      .lte('scheduled_date', future.toISOString())
      .order('scheduled_date', { ascending: true });

    if (error) {
      console.error('Error fetching upcoming reminders:', error);
      return [];
    }

    return data as Reminder[];
  }

  async completeReminder(id: string): Promise<Reminder | null> {
    return this.update(id, {
      status: 'completed',
      updated_at: new Date().toISOString(),
    } as Partial<Reminder>);
  }

  async snoozeReminder(
    id: string,
    hours = 1
  ): Promise<Reminder | null> {
    const reminder = await this.findById(id);
    if (!reminder) return null;

    const newDate = new Date(
      new Date(reminder.scheduled_date).getTime() + hours * 3600000
    );

    return this.update(id, {
      status: 'snoozed',
      scheduled_date: newDate.toISOString(),
      updated_at: new Date().toISOString(),
    } as Partial<Reminder>);
  }
}