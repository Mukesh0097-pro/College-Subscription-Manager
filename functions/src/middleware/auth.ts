import { Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";
import { AuthRequest, ApiResponse } from "../types";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Missing or invalid authorization header",
        },
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (!payload.sub) {
        res.status(401).json({
          success: false,
          error: {
            code: "INVALID_TOKEN",
            message: "Invalid token payload",
          },
        });
        return;
      }

      req.userId = payload.sub;
      next();
    } catch (verifyError) {
      res.status(401).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "Token verification failed",
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: "AUTH_ERROR",
        message: "Authentication error",
      },
    });
  }
};
