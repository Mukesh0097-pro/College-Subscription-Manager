import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, COLLECTIONS } from './_utils/firebase';
import { verifyAuth, successResponse, errorResponse, setCorsHeaders } from './_utils/auth';
import { createSubscriptionSchema, updateSubscriptionSchema } from './_utils/validators';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify authentication
  const userId = await verifyAuth(req);
  if (!userId) {
    return errorResponse(res, 'UNAUTHORIZED', 'Missing or invalid authorization', 401);
  }

  const { id } = req.query;

  try {
    // GET /api/subscriptions - List all
    if (req.method === 'GET' && !id) {
      const snapshot = await db
        .collection(COLLECTIONS.SUBSCRIPTIONS)
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const subscriptions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return successResponse(res, subscriptions);
    }

    // GET /api/subscriptions/:id - Get single
    if (req.method === 'GET' && id) {
      const doc = await db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(id as string).get();

      if (!doc.exists) {
        return errorResponse(res, 'NOT_FOUND', 'Subscription not found', 404);
      }

      const data = doc.data();
      if (data?.userId !== userId) {
        return errorResponse(res, 'FORBIDDEN', 'Access denied', 403);
      }

      return successResponse(res, { id: doc.id, ...data });
    }

    // POST /api/subscriptions - Create
    if (req.method === 'POST') {
      const validation = createSubscriptionSchema.safeParse(req.body);

      if (!validation.success) {
        return errorResponse(res, 'VALIDATION_ERROR', validation.error.errors[0].message, 400);
      }

      const now = new Date().toISOString();
      const subscriptionData = {
        ...validation.data,
        userId,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await db.collection(COLLECTIONS.SUBSCRIPTIONS).add(subscriptionData);

      return successResponse(res, { id: docRef.id, ...subscriptionData }, 201);
    }

    // PUT /api/subscriptions/:id - Update
    if (req.method === 'PUT' && id) {
      const docRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(id as string);
      const doc = await docRef.get();

      if (!doc.exists) {
        return errorResponse(res, 'NOT_FOUND', 'Subscription not found', 404);
      }

      const existingData = doc.data();
      if (existingData?.userId !== userId) {
        return errorResponse(res, 'FORBIDDEN', 'Access denied', 403);
      }

      const validation = updateSubscriptionSchema.safeParse(req.body);

      if (!validation.success) {
        return errorResponse(res, 'VALIDATION_ERROR', validation.error.errors[0].message, 400);
      }

      const updateData = {
        ...validation.data,
        updatedAt: new Date().toISOString(),
      };

      await docRef.update(updateData);

      return successResponse(res, { id: doc.id, ...existingData, ...updateData });
    }

    // DELETE /api/subscriptions/:id - Delete
    if (req.method === 'DELETE' && id) {
      const docRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(id as string);
      const doc = await docRef.get();

      if (!doc.exists) {
        return errorResponse(res, 'NOT_FOUND', 'Subscription not found', 404);
      }

      const data = doc.data();
      if (data?.userId !== userId) {
        return errorResponse(res, 'FORBIDDEN', 'Access denied', 403);
      }

      await docRef.delete();

      return successResponse(res, { id, deleted: true });
    }

    return errorResponse(res, 'METHOD_NOT_ALLOWED', 'Method not allowed', 405);
  } catch (error) {
    console.error('API Error:', error);
    return errorResponse(res, 'INTERNAL_ERROR', 'Internal server error', 500);
  }
}
