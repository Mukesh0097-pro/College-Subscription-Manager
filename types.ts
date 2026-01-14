export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface Subscription {
  id: string;
  name: string;
  renewalDate: string;
  billingCycle: string;
  provider: string;
  category: 'Entertainment' | 'Productivity' | 'Fitness' | 'Utilities' | 'Other';
  logo: string;
  price: number;
  isFree: boolean;
  isProOnly: boolean;
  status: 'Active' | 'Trial' | 'Cancelled' | 'Paused';
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  membershipTier: 'Free' | 'Pro';
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  status: 'Valid' | 'Used' | 'Cancelled';
  bookingDate: string;
}