import { describe, it, expect } from 'vitest';
import {
  LoginSchema,
  RegisterSchema,
  ReminderSchema,
  SearchQuerySchema,
  AIRecommendationRequestSchema,
} from '@/lib/validations';

describe('Login Validation', () => {
  it('should validate correct login data', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
    };
    expect(() => LoginSchema.parse(data)).not.toThrow();
  });

  it('should reject invalid email', () => {
    const data = {
      email: 'invalid-email',
      password: 'password123',
    };
    expect(() => LoginSchema.parse(data)).toThrow();
  });

  it('should reject short password', () => {
    const data = {
      email: 'test@example.com',
      password: 'short',
    };
    expect(() => LoginSchema.parse(data)).toThrow();
  });
});

describe('Register Validation', () => {
  it('should validate correct registration data', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
      username: 'TestUser',
    };
    expect(() => RegisterSchema.parse(data)).not.toThrow();
  });

  it('should reject invalid username', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
      username: 'ab', // Too short
    };
    expect(() => RegisterSchema.parse(data)).toThrow();
  });

  it('should reject username with special characters', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
      username: 'Test@User',
    };
    expect(() => RegisterSchema.parse(data)).toThrow();
  });
});

describe('Reminder Validation', () => {
  it('should validate correct reminder data', () => {
    const data = {
      title: 'Test Reminder',
      scheduled_date: new Date().toISOString(),
      scheduled_time: '14:30',
      status: 'pending',
    };
    expect(() => ReminderSchema.parse(data)).not.toThrow();
  });

  it('should reject empty title', () => {
    const data = {
      title: '',
      scheduled_date: new Date().toISOString(),
      scheduled_time: '14:30',
    };
    expect(() => ReminderSchema.parse(data)).toThrow();
  });

  it('should reject invalid time format', () => {
    const data = {
      title: 'Test Reminder',
      scheduled_date: new Date().toISOString(),
      scheduled_time: '25:00', // Invalid hour
    };
    expect(() => ReminderSchema.parse(data)).toThrow();
  });
});

describe('Search Query Validation', () => {
  it('should validate search query', () => {
    const data = { query: 'test' };
    expect(() => SearchQuerySchema.parse(data)).not.toThrow();
  });

  it('should reject empty query', () => {
    const data = { query: '' };
    expect(() => SearchQuerySchema.parse(data)).toThrow();
  });
});

describe('AI Recommendation Request Validation', () => {
  it('should validate correct input', () => {
    const data = {
      overallProgress: 67,
      unfinishedMissions: 5,
      nearbyCollectibles: 3,
      recentActivities: ['Completed mission'],
      level: 27,
    };
    expect(() => AIRecommendationRequestSchema.parse(data)).not.toThrow();
  });

  it('should reject negative progress', () => {
    const data = {
      overallProgress: -10,
      unfinishedMissions: 5,
      nearbyCollectibles: 3,
      recentActivities: [],
      level: 27,
    };
    expect(() => AIRecommendationRequestSchema.parse(data)).toThrow();
  });

  it('should reject progress over 100', () => {
    const data = {
      overallProgress: 150,
      unfinishedMissions: 5,
      nearbyCollectibles: 3,
      recentActivities: [],
      level: 27,
    };
    expect(() => AIRecommendationRequestSchema.parse(data)).toThrow();
  });
});