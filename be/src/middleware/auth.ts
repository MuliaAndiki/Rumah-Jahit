import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/auth.types";
import prisma from "../lib/prisma";
import { sendError } from "../lib/response";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware to verify JWT and ensure the admin user exists in DB.
 * Protected endpoints must use this middleware.
 */
export const verifyAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      sendError(res, "Access denied. No authentication token provided.", 401);
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      sendError(res, "Server configuration error.", 500);
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Verify that user still exists in DB
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true },
    });

    if (!adminUser) {
      sendError(res, "Admin account no longer exists.", 403);
      return;
    }

    req.user = {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      sendError(res, "Authentication token has expired.", 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      sendError(res, "Invalid authentication token.", 403);
    } else {
      console.error("JWT verification error:", error);
      sendError(res, "Token verification failed.", 500);
    }
  }
};

// Export verifyToken as alias for backward compatibility
export const verifyToken = verifyAdminToken;
