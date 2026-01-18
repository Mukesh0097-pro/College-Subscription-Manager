import { z } from 'zod';

export const createSubscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters (e.g., USD)').default('USD'),
  billingCycle: z.enum(['monthly', 'annual', 'weekly', 'quarterly']),
  category: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  nextBillingDate: z.string().datetime().optional(),
  reminderDays: z.number().int().min(0).max(90).optional().default(7),
  autoRenew: z.boolean().optional().default(true),
});

export const updateSubscriptionSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  amount: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
  billingCycle: z.enum(['monthly', 'annual', 'weekly', 'quarterly']).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  nextBillingDate: z.string().datetime().optional(),
  status: z.enum(['active', 'canceled', 'paused']).optional(),
  reminderDays: z.number().int().min(0).max(90).optional(),
  autoRenew: z.boolean().optional(),
  canceledAt: z.string().datetime().optional(),
});

export type CreateSubscription = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscription = z.infer<typeof updateSubscriptionSchema>;
