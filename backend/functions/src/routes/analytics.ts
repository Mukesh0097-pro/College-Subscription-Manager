import { Router, Response } from "express";
import { db, COLLECTIONS } from "../config/firebase";
import { AuthRequest, ApiResponse, Subscription, AnalyticsSummary, Category } from "../types";

const router = Router();

const CATEGORIES: Category[] = [
  "entertainment",
  "productivity",
  "fitness",
  "utilities",
  "education",
  "other",
];

// Calculate monthly equivalent spend
const getMonthlyEquivalent = (amount: number, cycle: string): number => {
  switch (cycle) {
    case "yearly":
      return amount / 12;
    case "weekly":
      return amount * 4;
    case "monthly":
    default:
      return amount;
  }
};

// GET analytics summary
router.get("/summary", async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const snapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where("userId", "==", req.userId)
      .get();

    const subscriptions: Subscription[] = snapshot.docs.map(
      (doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Subscription[];

    const now = new Date();
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Initialize category totals
    const byCategory: AnalyticsSummary["byCategory"] = {} as AnalyticsSummary["byCategory"];
    CATEGORIES.forEach((cat) => {
      byCategory[cat] = { count: 0, spend: 0 };
    });

    let totalSubscriptions = 0;
    let activeSubscriptions = 0;
    let monthlySpend = 0;
    let upcomingRenewals = 0;

    subscriptions.forEach((sub) => {
      totalSubscriptions++;

      const isActive = sub.status === "active" || sub.status === "trial";
      if (isActive) {
        activeSubscriptions++;
        const monthlyAmount = getMonthlyEquivalent(sub.amount, sub.billingCycle);
        monthlySpend += monthlyAmount;
      }

      // Count upcoming renewals (next 7 days)
      const renewalDate = new Date(sub.nextRenewalDate);
      if (isActive && renewalDate >= now && renewalDate <= sevenDaysLater) {
        upcomingRenewals++;
      }

      // Category breakdown (only active)
      if (isActive && byCategory[sub.category]) {
        byCategory[sub.category].count++;
        byCategory[sub.category].spend += getMonthlyEquivalent(
          sub.amount,
          sub.billingCycle
        );
      }
    });

    // Round spend values
    monthlySpend = Math.round(monthlySpend * 100) / 100;
    CATEGORIES.forEach((cat) => {
      byCategory[cat].spend = Math.round(byCategory[cat].spend * 100) / 100;
    });

    const summary: AnalyticsSummary = {
      totalSubscriptions,
      activeSubscriptions,
      monthlySpend,
      upcomingRenewals,
      byCategory,
    };

    res.json({ success: true, data: summary });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      success: false,
      error: { code: "ANALYTICS_ERROR", message: "Failed to fetch analytics" },
    });
  }
});

export default router;
