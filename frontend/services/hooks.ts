import { useAuth } from '@clerk/clerk-react';
import { useCallback, useState } from 'react';
import api, { CreateSubscriptionData, Subscription, AnalyticsSummary } from './api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useSubscriptions() {
  const { getToken } = useAuth();
  const [state, setState] = useState<ApiState<Subscription[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchSubscriptions = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      
      const response = await api.getSubscriptions(token);
      if (response.success) {
        setState({ data: response.data as Subscription[], loading: false, error: null });
      } else {
        setState({ data: null, loading: false, error: response.error?.message || 'Failed to fetch' });
      }
    } catch (err) {
      setState({ data: null, loading: false, error: 'Failed to fetch subscriptions' });
    }
  }, [getToken]);

  const createSubscription = useCallback(async (data: CreateSubscriptionData) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');
    
    const response = await api.createSubscription(data, token);
    if (response.success) {
      await fetchSubscriptions(); // Refresh list
      return response.data as Subscription;
    }
    throw new Error(response.error?.message || 'Failed to create');
  }, [getToken, fetchSubscriptions]);

  const updateSubscription = useCallback(async (id: string, data: Partial<CreateSubscriptionData>) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');
    
    const response = await api.updateSubscription(id, data, token);
    if (response.success) {
      await fetchSubscriptions(); // Refresh list
      return response.data as Subscription;
    }
    throw new Error(response.error?.message || 'Failed to update');
  }, [getToken, fetchSubscriptions]);

  const deleteSubscription = useCallback(async (id: string) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');
    
    const response = await api.deleteSubscription(id, token);
    if (response.success) {
      await fetchSubscriptions(); // Refresh list
      return true;
    }
    throw new Error(response.error?.message || 'Failed to delete');
  }, [getToken, fetchSubscriptions]);

  return {
    ...state,
    fetchSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  };
}

export function useAnalytics() {
  const { getToken } = useAuth();
  const [state, setState] = useState<ApiState<AnalyticsSummary>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchAnalytics = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      
      const response = await api.getAnalyticsSummary(token);
      if (response.success) {
        setState({ data: response.data as AnalyticsSummary, loading: false, error: null });
      } else {
        setState({ data: null, loading: false, error: response.error?.message || 'Failed to fetch' });
      }
    } catch (err) {
      setState({ data: null, loading: false, error: 'Failed to fetch analytics' });
    }
  }, [getToken]);

  return {
    ...state,
    fetchAnalytics,
  };
}
