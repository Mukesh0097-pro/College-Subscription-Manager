export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Workshop' | 'Social' | 'Academic' | 'Career' | 'Networking';
  image: string;
  price: number;
  isFree: boolean;
  isGoldOnly: boolean;
  seatsTotal: number;
  seatsBooked: number;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  membershipTier: 'Free' | 'Silver' | 'Gold';
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  status: 'Valid' | 'Used' | 'Cancelled';
  bookingDate: string;
}