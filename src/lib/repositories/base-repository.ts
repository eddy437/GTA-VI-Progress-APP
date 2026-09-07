import { createClient } from '@/lib/supabase/server';
import { DEMO_MODE } from '@/lib/constants';

export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async getClient() {
    if (DEMO_MODE) {
      return null;
    }
    return await createClient();
  }

  protected async getUserId(): Promise<string | null> {
    const client = await this.getClient();
    if (!client) return null;

    const {
      data: { user },
    } = await client.auth.getUser();
    return user?.id || null;
  }

  async findById(id: string): Promise<T | null> {
    const client = await this.getClient();
    if (!client) return null;

    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching ${this.tableName}:`, error);
      return null;
    }

    return data as T;
  }

  async findAll(userId?: string): Promise<T[]> {
    const client = await this.getClient();
    if (!client) return [];

    let query = client.from(this.tableName).select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${this.tableName}:`, error);
      return [];
    }

    return data as T[];
  }

  async create(data: Partial<T>): Promise<T | null> {
    const client = await this.getClient();
    if (!client) return null;

    const userId = await this.getUserId();
    if (userId) {
      data = { ...data, user_id: userId };
    }

    const { data: created, error } = await client
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      return null;
    }

    return created as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const client = await this.getClient();
    if (!client) return null;

    const { data: updated, error } = await client
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      return null;
    }

    return updated as T;
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.getClient();
    if (!client) return false;

    const { error } = await client.from(this.tableName).delete().eq('id', id);

    if (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      return false;
    }

    return true;
  }
}