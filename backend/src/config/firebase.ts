import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

let firebaseApp: admin.app.App;

try {
  // Try to initialize with service account from environment
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    logger.info('Firebase initialized with environment credentials');
  } else {
    // Fallback to default credentials
    firebaseApp = admin.initializeApp();
    logger.info('Firebase initialized with default credentials');
  }
} catch (error) {
  logger.error('Failed to initialize Firebase:', error);
  throw error;
}

export const db = admin.firestore();
export const auth = admin.auth();

export const COLLECTIONS = {
  USERS: 'users',
  SUBSCRIPTIONS: 'subscriptions',
  EVENTS: 'events',
  TICKETS: 'tickets',
  NOTIFICATIONS: 'notifications',
} as const;

export default firebaseApp;
