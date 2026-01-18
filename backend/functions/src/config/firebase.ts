import * as admin from "firebase-admin";
import * as path from "path";

// Use service account for local development
const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch {
  // In production (Cloud Functions), use default credentials
  admin.initializeApp();
}

export const db = admin.firestore();
export const COLLECTIONS = {
  SUBSCRIPTIONS: "subscriptions",
} as const;
