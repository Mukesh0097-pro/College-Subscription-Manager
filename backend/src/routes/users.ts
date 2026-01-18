import { Router, Response } from 'express';
import { db, COLLECTIONS, auth } from '../config/firebase';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// GET /api/users/me - Get current user profile
router.get(
  '/me',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    if (!userId) {
      throw new AppError('User ID not found', 401, 'UNAUTHORIZED');
    }

    const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();

    if (!userDoc.exists) {
      // Create user profile if it doesn't exist
      const newUserData = {
        userId,
        email: req.userEmail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          emailReminders: true,
        },
      };

      if (!userId) {
        throw new AppError('User ID not found', 401, 'UNAUTHORIZED');
      }
      await db.collection(COLLECTIONS.USERS).doc(userId).set(newUserData);

      logger.info(`Created new user profile for ${userId}`);

      return res.status(200).json({
        success: true,
        data: newUserData,
      });
    }

    logger.info(`Retrieved user profile for ${userId}`);

    res.status(200).json({
      success: true,
      data: { id: userDoc.id, ...userDoc.data() },
    });
  })
);

// PUT /api/users/me - Update current user profile
router.put(
  '/me',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    if (!userId) {
      throw new AppError('User ID not found', 401, 'UNAUTHORIZED');
    }
    const { preferences, displayName, avatar } = req.body;

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (preferences) updateData.preferences = preferences;
    if (displayName) updateData.displayName = displayName;
    if (avatar) updateData.avatar = avatar;

    const userRef = db.collection(COLLECTIONS.USERS).doc(userId);
    await userRef.update(updateData);

    const updatedDoc = await userRef.get();

    logger.info(`Updated user profile for ${userId}`);

    res.status(200).json({
      success: true,
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  })
);

// GET /api/users/stats - Get user statistics
router.get(
  '/stats',
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    if (!userId) {
      throw new AppError('User ID not found', 401, 'UNAUTHORIZED');
    }

    // Get subscription count
    const subsSnapshot = await db
      .collection(COLLECTIONS.SUBSCRIPTIONS)
      .where('userId', '==', userId)
      .count()
      .get();

    // Get notification count
    const notifSnapshot = await db
      .collection(COLLECTIONS.NOTIFICATIONS)
      .where('userId', '==', userId)
      .where('read', '==', false)
      .count()
      .get();

    const stats = {
      totalSubscriptions: subsSnapshot.data().count,
      unreadNotifications: notifSnapshot.data().count,
      accountCreated: (await db.collection(COLLECTIONS.USERS).doc(userId).get()).data()?.createdAt,
    };

    logger.info(`Retrieved user stats for ${userId}`);

    res.status(200).json({
      success: true,
      data: stats,
    });
  })
);

export default router;
