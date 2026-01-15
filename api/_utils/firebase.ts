import * as admin from 'firebase-admin';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  // For Vercel, use environment variables
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : undefined;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Fallback for local development
    admin.initializeApp();
  }
}

export const db = admin.firestore();
export const COLLECTIONS = {
  SUBSCRIPTIONS: 'subscriptions',
} as const;
