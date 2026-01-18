import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/backend';
import { logger } from '../utils/logger';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing or invalid authorization header',
        },
      });
      return;
    }

    const token = authHeader.substring(7);

    try {
      // Verify the session token with Clerk
      const session = await clerkClient.sessions.getSession(token);

      if (!session || !session.userId) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid session token',
          },
        });
        return;
      }

      // Get user details
      const user = await clerkClient.users.getUser(session.userId);
      
      req.userId = user.id;
      req.userEmail = user.emailAddresses[0]?.emailAddress;

      logger.debug(`User authenticated: ${req.userId}`);
      next();
    } catch (clerkError) {
      logger.error('Clerk verification error:', clerkError);
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Failed to verify authentication',
        },
      });
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Authentication error',
      },
    });
  }
};
