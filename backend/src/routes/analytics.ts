import { Router, Response } from 'express';
import { db, COLLECTIONS } from '../config/firebase';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();

// All analytics routes require authentication
router.use(authMiddleware);

// GET /api/analytics/summary - Get subscription analytics summary
router.get(
  '/summary',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    const subscriptionsSnapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where('userId', '==', userId)
      .get();

    const subscriptions = subscriptionsSnapshot.docs.map((doc) => doc.data());

    // Calculate analytics
    const totalSubscriptions = subscriptions.length;
    const activeSubscriptions = subscriptions.filter((s) => s.status === 'active').length;
    const totalMonthlySpend = subscriptions
      .filter((s) => s.status === 'active' && s.billingCycle === 'monthly')
      .reduce((sum, s) => sum + (s.amount || 0), 0);

    const totalAnnualSpend = subscriptions
      .filter((s) => s.status === 'active' && s.billingCycle === 'annual')
      .reduce((sum, s) => sum + (s.amount || 0), 0);

    // Calculate category breakdown
    const categoryBreakdown = subscriptions.reduce((acc: any, sub) => {
      const category = sub.category || 'Other';
      if (!acc[category]) {
        acc[category] = { count: 0, totalSpend: 0 };
      }
      acc[category].count++;
      if (sub.status === 'active') {
        acc[category].totalSpend += sub.amount || 0;
      }
      return acc;
    }, {});

    // Upcoming renewals (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingRenewals = subscriptions.filter((s) => {
      if (s.status !== 'active' || !s.nextBillingDate) return false;
      const renewalDate = new Date(s.nextBillingDate);
      return renewalDate <= thirtyDaysFromNow && renewalDate >= new Date();
    }).length;

    const analytics = {
      totalSubscriptions,
      activeSubscriptions,
      inactiveSubscriptions: totalSubscriptions - activeSubscriptions,
      totalMonthlySpend,
      totalAnnualSpend,
      estimatedAnnualCost: totalMonthlySpend * 12 + totalAnnualSpend,
      categoryBreakdown,
      upcomingRenewals,
      lastUpdated: new Date().toISOString(),
    };

    logger.info(`Generated analytics summary for user ${userId}`);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  })
);

// GET /api/analytics/spending-trends - Get spending trends over time
router.get(
  '/spending-trends',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { period = '6months' } = req.query;

    const subscriptionsSnapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where('userId', '==', userId)
      .get();

    const subscriptions = subscriptionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];

    // Calculate monthly spending for the past N months
    const months = period === '12months' ? 12 : 6;
    const trends = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM

      // Sum active subscriptions for this month
      const monthlyTotal = subscriptions
        .filter((s) => {
          const createdDate = new Date(s.createdAt);
          return (
            createdDate <= date &&
            (s.status === 'active' || 
             (s.canceledAt && new Date(s.canceledAt) > date))
          );
        })
        .reduce((sum, s) => {
          if (s.billingCycle === 'monthly') {
            return sum + (s.amount || 0);
          } else if (s.billingCycle === 'annual') {
            return sum + (s.amount || 0) / 12;
          }
          return sum;
        }, 0);

      trends.push({
        month: monthKey,
        total: Math.round(monthlyTotal * 100) / 100,
      });
    }

    logger.info(`Generated spending trends for user ${userId}`);

    res.status(200).json({
      success: true,
      data: { trends, period },
    });
  })
);

export default router;
