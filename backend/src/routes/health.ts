import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';
import { logger } from '../utils/logger';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Check database connection
    const startTime = Date.now();
    await db.collection('_health').limit(1).get();
    const dbLatency = Date.now() - startTime;

    const healthData = {
      success: true,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'subtrack-backend',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'connected',
        latency: `${dbLatency}ms`,
      },
    };

    logger.info('Health check successful');
    res.status(200).json(healthData);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      success: false,
      timestamp: new Date().toISOString(),
      service: 'subtrack-backend',
      database: {
        status: 'disconnected',
      },
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Service is temporarily unavailable',
      },
    });
  }
});

export default router;
