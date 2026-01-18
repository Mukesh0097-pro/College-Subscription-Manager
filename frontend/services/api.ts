// For Vercel, API routes are at /api/* relative to origin
// For local dev with Firebase, use full URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    // Get token from Clerk - you'll need to integrate with useAuth() hook
    // This is a placeholder - in components, use the hook directly
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Failed to connect to server',
        },
      };
    }
  }

  // Health check (no auth required)
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/api/health');
  }

  // Subscriptions API
  async getSubscriptions(token: string): Promise<ApiResponse> {
    return this.request('/api/subscriptions', {}, token);
  }

  async getSubscription(id: string, token: string): Promise<ApiResponse> {
    return this.request(`/api/subscriptions/${id}`, {}, token);
  }

  async createSubscription(data: CreateSubscriptionData, token: string): Promise<ApiResponse> {
    return this.request('/api/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  async updateSubscription(id: string, data: Partial<CreateSubscriptionData>, token: string): Promise<ApiResponse> {
    return this.request(`/api/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }

  async deleteSubscription(id: string, token: string): Promise<ApiResponse> {
    return this.request(`/api/subscriptions/${id}`, {
      method: 'DELETE',
    }, token);
  }

  // Analytics API
  async getAnalyticsSummary(token: string): Promise<ApiResponse> {
    return this.request('/api/analytics', {}, token);
  }
}

// Types
export interface CreateSubscriptionData {
  name: string;
  provider?: string;
  category: 'entertainment' | 'productivity' | 'fitness' | 'utilities' | 'education' | 'other';
  amount: number;
  currency?: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  nextRenewalDate: string;
  status?: 'active' | 'trial' | 'cancelled';
  reminderEnabled?: boolean;
  reminderDaysBefore?: number;
  notes?: string;
}

export interface Subscription extends CreateSubscriptionData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlySpend: number;
  upcomingRenewals: number;
  byCategory: Record<string, { count: number; spend: number }>;
}

export const api = new ApiService();
export default api;
