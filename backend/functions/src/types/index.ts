import { Request, ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface AuthRequest extends Request<ParamsDictionary, unknown, unknown, ParsedQs> {
  userId?: string;
}

export type Category = 
  | "entertainment" 
  | "productivity" 
  | "fitness" 
  | "utilities" 
  | "education" 
  | "other";

export type BillingCycle = "monthly" | "yearly" | "weekly";

export type SubscriptionStatus = "active" | "trial" | "cancelled";

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  provider?: string;
  category: Category;
  amount: number;
  currency: string;
  billingCycle: BillingCycle;
  nextRenewalDate: string;
  status: SubscriptionStatus;
  reminderEnabled: boolean;
  reminderDaysBefore: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlySpend: number;
  upcomingRenewals: number;
  byCategory: Record<Category, { count: number; spend: number }>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
