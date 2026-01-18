import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import { authMiddleware } from "./middleware/auth";
import healthRouter from "./routes/health";
import subscriptionsRouter from "./routes/subscriptions";
import analyticsRouter from "./routes/analytics";

// Initialize Express
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Public routes
app.use("/health", healthRouter);

// Protected routes
app.use("/api/subscriptions", authMiddleware, subscriptionsRouter);
app.use("/api/analytics", authMiddleware, analyticsRouter);

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Endpoint not found" },
  });
});

// Export Cloud Function
export const api = functions.https.onRequest(app);
