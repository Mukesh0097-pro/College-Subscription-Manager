import { Router, Response } from 'express';
import { db, COLLECTIONS } from '../config/firebase';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { createSubscriptionSchema, updateSubscriptionSchema } from '../validators/subscription';
import { logger } from '../utils/logger';

const router = Router();

// All subscription routes require authentication
router.use(authMiddleware);

// GET /api/subscriptions - List all user subscriptions
router.get(
  '/',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { status, limit = 50, page = 1 } = req.query;

    let query = db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc');

    // Filter by status if provided
    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit))
      .get();

    const subscriptions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get total count for pagination
    const totalSnapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where('userId', '==', userId)
      .count()
      .get();

    logger.info(`Retrieved ${subscriptions.length} subscriptions for user ${userId}`);

    res.status(200).json({
      success: true,
      data: {
        subscriptions,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: totalSnapshot.data().count,
          totalPages: Math.ceil(totalSnapshot.data().count / Number(limit)),
        },
      },
    });
  })
);

// GET /api/subscriptions/:id - Get single subscription
router.get(
  '/:id',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { id } = req.params;

    const doc = await db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(id).get();

    if (!doc.exists) {
      throw new AppError('Subscription not found', 404, 'NOT_FOUND');
    }

    const data = doc.data();
    if (data?.userId !== userId) {
      throw new AppError('Access denied to this subscription', 403, 'FORBIDDEN');
    }

    logger.info(`Retrieved subscription ${id} for user ${userId}`);

    res.status(200).json({
      success: true,
      data: { id: doc.id, ...data },
    });
  })
);

// POST /api/subscriptions - Create new subscription
router.post(
  '/',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId, userEmail } = req;
    const validation = createSubscriptionSchema.safeParse(req.body);

    if (!validation.success) {
      throw new AppError(
        validation.error.errors[0].message,
        400,
        'VALIDATION_ERROR'
      );
    }

    const now = new Date().toISOString();
    const subscriptionData = {
      ...validation.data,
      userId,
      userEmail,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection(COLLECTIONS.SUBSCRIPTIONS).add(subscriptionData);

    logger.info(`Created subscription ${docRef.id} for user ${userId}`);

    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...subscriptionData },
    });
  })
);

// PUT /api/subscriptions/:id - Update subscription
router.put(
  '/:id',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { id } = req.params;

    const docRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Subscription not found', 404, 'NOT_FOUND');
    }

    const existingData = doc.data();
    if (existingData?.userId !== userId) {
      throw new AppError('Access denied to this subscription', 403, 'FORBIDDEN');
    }

    const validation = updateSubscriptionSchema.safeParse(req.body);

    if (!validation.success) {
      throw new AppError(
        validation.error.errors[0].message,
        400,
        'VALIDATION_ERROR'
      );
    }

    const updateData = {
      ...validation.data,
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(updateData);

    logger.info(`Updated subscription ${id} for user ${userId}`);

    res.status(200).json({
      success: true,
      data: { id, ...existingData, ...updateData },
    });
  })
);

// DELETE /api/subscriptions/:id - Delete subscription
router.delete(
  '/:id',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { id } = req.params;

    const docRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Subscription not found', 404, 'NOT_FOUND');
    }

    const data = doc.data();
    if (data?.userId !== userId) {
      throw new AppError('Access denied to this subscription', 403, 'FORBIDDEN');
    }

    await docRef.delete();

    logger.info(`Deleted subscription ${id} for user ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully',
    });
  })
);

export default router;
