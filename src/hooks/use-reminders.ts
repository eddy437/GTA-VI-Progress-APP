'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEMO_MODE } from '@/lib/constants';
import { ReminderSchema, type ReminderInput } from '@/lib/validations';

interface Reminder {
  id: string;
  title: string;
  description?: string;
  linked_entity?: string;
  entity_type?: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'pending' | 'completed' | 'snoozed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReminders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (DEMO_MODE) {
        // Return mock reminders
        setReminders([
          {
            id: 'reminder-1',
            title: 'The Assassination',
            description: 'Complete this mission',
            scheduled_date: new Date().toISOString(),
            scheduled_time: '20:00',
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'reminder-2',
            title: 'Find Hidden Packages',
            description: 'Collect 5 hidden packages',
            scheduled_date: new Date(Date.now() + 86400000).toISOString(),
            scheduled_time: '18:00',
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      } else {
        const response = await fetch('/api/reminders');
        const data = await response.json();

        if (data.success) {
          setReminders(data.data);
        } else {
          throw new Error(data.error?.message || 'Failed to fetch reminders');
        }
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const createReminder = async (input: ReminderInput) => {
    try {
      const validation = ReminderSchema.parse(input);

      if (DEMO_MODE) {
        const newReminder: Reminder = {
          id: `reminder-${Date.now()}`,
          ...validation,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setReminders((prev) => [...prev, newReminder]);
        return newReminder;
      }

      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation),
      });

      const data = await response.json();

      if (data.success) {
        setReminders((prev) => [...prev, data.data]);
        return data.data;
      } else {
        throw new Error(data.error?.message || 'Failed to create reminder');
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    try {
      if (DEMO_MODE) {
        setReminders((prev) =>
          prev.map((reminder) =>
            reminder.id === id ? { ...reminder, ...updates } : reminder
          )
        );
        return;
      }

      const response = await fetch(`/api/reminders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        setReminders((prev) =>
          prev.map((reminder) =>
            reminder.id === id ? data.data : reminder
          )
        );
      } else {
        throw new Error(data.error?.message || 'Failed to update reminder');
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      if (DEMO_MODE) {
        setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
        return;
      }

      const response = await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
      } else {
        throw new Error(data.error?.message || 'Failed to delete reminder');
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    reminders,
    loading,
    error,
    refresh: fetchReminders,
    createReminder,
    updateReminder,
    deleteReminder,
  };
}