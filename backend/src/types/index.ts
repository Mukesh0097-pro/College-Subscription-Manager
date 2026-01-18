export interface Subscription {
  id: string;
  userId: string;
  userEmail?: string;
  name: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'annual' | 'weekly' | 'quarterly';
  category?: string;
  description?: string;
  website?: string;
  status: 'active' | 'canceled' | 'paused';
  nextBillingDate?: string;
  reminderDays: number;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
  canceledAt?: string;
}

export interface User {
  id: string;
  userId: string;
  email?: string;
  displayName?: string;
  avatar?: string;
  preferences: {
    notifications: boolean;
    emailReminders: boolean;
    currency?: string;
    theme?: 'light' | 'dark';
  };
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  readAt?: string;
  actionUrl?: string;
}

export interface Analytics {
  totalSubscriptions: number;
  activeSubscriptions: number;
  inactiveSubscriptions: number;
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  estimatedAnnualCost: number;
  categoryBreakdown: Record<string, { count: number; totalSpend: number }>;
  upcomingRenewals: number;
  lastUpdated: string;
}
