import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5001/rosy-dynamics-470712-r9/us-central1/api';

export const TestDatabase: React.FC = () => {
  const { getToken, isSignedIn } = useAuth();
  const [status, setStatus] = useState<string>('');
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Test creating a subscription
  const testCreateSubscription = async () => {
    setLoading(true);
    setStatus('Creating subscription...');
    
    try {
      const token = await getToken();
      
      const response = await fetch(`${API_BASE_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: 'Netflix',
          provider: 'Netflix Inc',
          category: 'entertainment',
          amount: 649,
          currency: 'INR',
          billingCycle: 'monthly',
          nextRenewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
          reminderEnabled: true,
          reminderDaysBefore: 3,
          notes: 'Test subscription',
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus(`✅ Created subscription: ${data.data.id}`);
        fetchSubscriptions(); // Refresh list
      } else {
        setStatus(`❌ Error: ${data.error?.message}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    }
    
    setLoading(false);
  };

  // Fetch all subscriptions
  const fetchSubscriptions = async () => {
    setLoading(true);
    
    try {
      const token = await getToken();
      
      const response = await fetch(`${API_BASE_URL}/api/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setSubscriptions(data.data || []);
        setStatus(`✅ Loaded ${data.data?.length || 0} subscriptions`);
      } else {
        setStatus(`❌ Error: ${data.error?.message}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    }
    
    setLoading(false);
  };

  // Test health endpoint
  const testHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setStatus(`✅ Health: ${JSON.stringify(data)}`);
    } catch (error) {
      setStatus(`❌ Health check failed: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchSubscriptions();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test</h1>
        <p className="text-red-500">Please sign in first to test the database.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧪 Database Test Page</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={testHealth}
          disabled={loading}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Test Health
        </button>
        <button
          onClick={fetchSubscriptions}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Fetch Subscriptions
        </button>
        <button
          onClick={testCreateSubscription}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Create Test Subscription
        </button>
      </div>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p className="font-mono text-sm">{status || 'Ready to test...'}</p>
      </div>

      {/* Subscriptions List */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b">
          <h2 className="font-semibold">Subscriptions in Database ({subscriptions.length})</h2>
        </div>
        
        {subscriptions.length === 0 ? (
          <p className="p-4 text-gray-500">No subscriptions found. Create one to test!</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm">Name</th>
                <th className="px-4 py-2 text-left text-sm">Category</th>
                <th className="px-4 py-2 text-left text-sm">Amount</th>
                <th className="px-4 py-2 text-left text-sm">Status</th>
                <th className="px-4 py-2 text-left text-sm">ID</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-t">
                  <td className="px-4 py-2">{sub.name}</td>
                  <td className="px-4 py-2">{sub.category}</td>
                  <td className="px-4 py-2">₹{sub.amount}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-gray-500">{sub.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
