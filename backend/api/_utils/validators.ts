import { z } from 'zod';

const categoryEnum = z.enum([
  'entertainment',
  'productivity',
  'fitness',
  'utilities',
  'education',
  'other',
]);

const billingCycleEnum = z.enum(['monthly', 'yearly', 'weekly']);
const statusEnum = z.enum(['active', 'trial', 'cancelled']);

export const createSubscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  provider: z.string().max(100).optional(),
  category: categoryEnum,
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('INR'),
  billingCycle: billingCycleEnum,
  nextRenewalDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  status: statusEnum.default('active'),
  reminderEnabled: z.boolean().default(true),
  reminderDaysBefore: z.number().int().min(0).max(30).default(3),
  notes: z.string().max(500).optional(),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial();
