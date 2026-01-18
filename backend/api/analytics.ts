import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, COLLECTIONS } from './_utils/firebase';
import { verifyAuth, successResponse, errorResponse, setCorsHeaders } from './_utils/auth';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  category: string;
  status: 'active' | 'paused' | 'cancelled';
  startDate: string;
  nextBillingDate?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return errorResponse(res, 'METHOD_NOT_ALLOWED', 'Method not allowed', 405);
  }

  // Verify authentication
  const userId = await verifyAuth(req);
  if (!userId) {
    return errorResponse(res, 'UNAUTHORIZED', 'Missing or invalid authorization', 401);
  }

  try {
    const snapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where('userId', '==', userId)
      .get();

    const subscriptions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Subscription[];

    // Calculate analytics
    const activeSubscriptions = subscriptions.filter((s) => s.status === 'active');
    
    const calculateMonthlyAmount = (sub: Subscription): number => {
      switch (sub.billingCycle) {
        case 'weekly':
          return sub.amount * 4.33; // Average weeks per month
        case 'yearly':
          return sub.amount / 12;
        case 'monthly':
        default:
          return sub.amount;
      }
    };

    const monthlyTotal = activeSubscriptions.reduce(
      (sum, sub) => sum + calculateMonthlyAmount(sub),
      0
    );

    const yearlyTotal = monthlyTotal * 12;

    // Category breakdown
    const categoryBreakdown = activeSubscriptions.reduce((acc, sub) => {
      const category = sub.category || 'Other';
      if (!acc[category]) {
        acc[category] = { count: 0, monthlyTotal: 0 };
      }
      acc[category].count += 1;
      acc[category].monthlyTotal += calculateMonthlyAmount(sub);
      return acc;
    }, {} as Record<string, { count: number; monthlyTotal: number }>);

    // Upcoming renewals (next 30 days)
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const upcomingRenewals = activeSubscriptions
      .filter((sub) => {
        if (!sub.nextBillingDate) return false;
        const renewalDate = new Date(sub.nextBillingDate);
        return renewalDate >= now && renewalDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => {
        const dateA = new Date(a.nextBillingDate || 0);
        const dateB = new Date(b.nextBillingDate || 0);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 5)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        amount: sub.amount,
        nextBillingDate: sub.nextBillingDate,
      }));

    const analytics = {
      summary: {
        totalSubscriptions: subscriptions.length,
        activeSubscriptions: activeSubscriptions.length,
        pausedSubscriptions: subscriptions.filter((s) => s.status === 'paused').length,
        cancelledSubscriptions: subscriptions.filter((s) => s.status === 'cancelled').length,
        monthlyTotal: Math.round(monthlyTotal * 100) / 100,
        yearlyTotal: Math.round(yearlyTotal * 100) / 100,
      },
      categoryBreakdown,
      upcomingRenewals,
    };

    return successResponse(res, analytics);
  } catch (error) {
    console.error('Analytics Error:', error);
    return errorResponse(res, 'INTERNAL_ERROR', 'Internal server error', 500);
  }
}
