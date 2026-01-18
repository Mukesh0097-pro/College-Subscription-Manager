import { Router, Response } from "express";
import { db, COLLECTIONS } from "../config/firebase";
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from "../validators/subscription";
import { AuthRequest, ApiResponse, Subscription } from "../types";

const router = Router();

// GET all subscriptions for user
router.get("/", async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const snapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where("userId", "==", req.userId)
      .orderBy("createdAt", "desc")
      .get();

    const subscriptions: Subscription[] = snapshot.docs.map(
      (doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Subscription[];

    res.json({ success: true, data: subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: "Failed to fetch subscriptions" },
    });
  }
});

// GET single subscription
router.get("/:id", async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const doc = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .doc(req.params.id)
      .get();

    if (!doc.exists) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Subscription not found" },
      });
      return;
    }

    const data = doc.data() as Subscription;

    // Ensure user owns this subscription
    if (data.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Access denied" },
      });
      return;
    }

    res.json({ success: true, data: { ...data, id: doc.id } });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: "Failed to fetch subscription" },
    });
  }
});

// POST create subscription
router.post("/", async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const validation = createSubscriptionSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: validation.error.errors[0].message,
        },
      });
      return;
    }

    const now = new Date().toISOString();
    const subscriptionData = {
      ...validation.data,
      userId: req.userId,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .add(subscriptionData);

    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...subscriptionData },
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({
      success: false,
      error: { code: "CREATE_ERROR", message: "Failed to create subscription" },
    });
  }
});

// PUT update subscription
router.put("/:id", async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const docRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Subscription not found" },
      });
      return;
    }

    const existingData = doc.data() as Subscription;

    if (existingData.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Access denied" },
      });
      return;
    }

    const validation = updateSubscriptionSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: validation.error.errors[0].message,
        },
      });
      return;
    }

    const updateData = {
      ...validation.data,
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(updateData);

    res.json({
      success: true,
      data: { ...existingData, ...updateData, id: doc.id },
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({
      success: false,
      error: { code: "UPDATE_ERROR", message: "Failed to update subscription" },
    });
  }
});

// DELETE subscription
router.delete("/:id", async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const docRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Subscription not found" },
      });
      return;
    }

    const data = doc.data() as Subscription;

    if (data.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Access denied" },
      });
      return;
    }

    await docRef.delete();

    res.json({ success: true, data: { id: req.params.id, deleted: true } });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({
      success: false,
      error: { code: "DELETE_ERROR", message: "Failed to delete subscription" },
    });
  }
});

export default router;
