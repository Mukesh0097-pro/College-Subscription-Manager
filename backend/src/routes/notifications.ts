import { Router, Response } from 'express';
import { db, COLLECTIONS } from '../config/firebase';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();

// All notification routes require authentication
router.use(authMiddleware);

// GET /api/notifications - Get all notifications for user
router.get(
  '/',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { unreadOnly = 'false', limit = 50 } = req.query;

    let query = db
      .collection(COLLECTIONS.NOTIFICATIONS)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(Number(limit));

    if (unreadOnly === 'true') {
      query = query.where('read', '==', false);
    }

    const snapshot = await query.get();

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    logger.info(`Retrieved ${notifications.length} notifications for user ${userId}`);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  })
);

// POST /api/notifications - Create notification (typically for testing)
router.post(
  '/',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { title, message, type = 'info' } = req.body;

    if (!title || !message) {
      throw new AppError('Title and message are required', 400, 'VALIDATION_ERROR');
    }

    const notificationData = {
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection(COLLECTIONS.NOTIFICATIONS).add(notificationData);

    logger.info(`Created notification ${docRef.id} for user ${userId}`);

    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...notificationData },
    });
  })
);

// PUT /api/notifications/:id/read - Mark notification as read
router.put(
  '/:id/read',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { id } = req.params;

    const docRef = db.collection(COLLECTIONS.NOTIFICATIONS).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Notification not found', 404, 'NOT_FOUND');
    }

    const data = doc.data();
    if (data?.userId !== userId) {
      throw new AppError('Access denied to this notification', 403, 'FORBIDDEN');
    }

    await docRef.update({
      read: true,
      readAt: new Date().toISOString(),
    });

    logger.info(`Marked notification ${id} as read for user ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
    });
  })
);

// PUT /api/notifications/read-all - Mark all notifications as read
router.put(
  '/read-all',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    const snapshot = await db
      .collection(COLLECTIONS.NOTIFICATIONS)
      .where('userId', '==', userId)
      .where('read', '==', false)
      .get();

    const batch = db.batch();
    const now = new Date().toISOString();

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { read: true, readAt: now });
    });

    await batch.commit();

    logger.info(`Marked ${snapshot.size} notifications as read for user ${userId}`);

    res.status(200).json({
      success: true,
      message: `${snapshot.size} notifications marked as read`,
    });
  })
);

// DELETE /api/notifications/:id - Delete notification
router.delete(
  '/:id',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;
    const { id } = req.params;

    const docRef = db.collection(COLLECTIONS.NOTIFICATIONS).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Notification not found', 404, 'NOT_FOUND');
    }

    const data = doc.data();
    if (data?.userId !== userId) {
      throw new AppError('Access denied to this notification', 403, 'FORBIDDEN');
    }

    await docRef.delete();

    logger.info(`Deleted notification ${id} for user ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  })
);

export default router;
