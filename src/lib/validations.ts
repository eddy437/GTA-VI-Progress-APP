import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const UpdateProfileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional(),
  avatar: z.instanceof(File).optional(),
});

export const ReminderSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  linked_entity: z.string().optional(),
  entity_type: z.string().optional(),
  scheduled_date: z.string().datetime(),
  scheduled_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  status: z.enum(['pending', 'completed', 'snoozed', 'cancelled']).default('pending'),
});

export const SearchQuerySchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  types: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const AIRecommendationRequestSchema = z.object({
  overallProgress: z.number().min(0).max(100),
  unfinishedMissions: z.number().int().min(0),
  nearbyCollectibles: z.number().int().min(0),
  recentActivities: z.array(z.string()),
  level: z.number().int().positive(),
});

export const ExportDataRequestSchema = z.object({
  includeProfile: z.boolean().default(true),
  includeProgress: z.boolean().default(true),
  includeReminders: z.boolean().default(true),
  includeActivities: z.boolean().default(true),
  includePreferences: z.boolean().default(true),
});

export const NotificationPreferencesSchema = z.object({
  enableInAppNotifications: z.boolean(),
  enablePushNotifications: z.boolean(),
  enableReminders: z.boolean(),
  enableAchievements: z.boolean(),
  enableProgressUpdates: z.boolean(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type ReminderInput = z.infer<typeof ReminderSchema>;
export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;
export type AIRecommendationRequest = z.infer<typeof AIRecommendationRequestSchema>;
export type ExportDataRequest = z.infer<typeof ExportDataRequestSchema>;
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;