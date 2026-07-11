import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../lib/prisma";
import { sendSuccess, sendError } from "../lib/response";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email format").optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "New password must be at least 6 characters").optional(),
});

class AuthController {
  /**
   * POST /api/auth/login
   * Validate email/password with Bcrypt, return JWT token and admin profile.
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const { email, password } = validation.data;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        sendError(res, "Invalid email or password", 401);
        return;
      }

      const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        sendError(res, "Invalid email or password", 401);
        return;
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        sendError(res, "Server configuration error: JWT_SECRET is missing", 500);
        return;
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "7d" });

      sendSuccess(
        res,
        {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          },
        },
        "Login successful"
      );
    } catch (error) {
      console.error("Login Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * GET /api/auth/me
   * Verify JWT token (done by verifyAdminToken middleware) and return current admin user details.
   */
  public me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        sendError(res, "User not authenticated", 401);
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        sendError(res, "Admin account not found", 404);
        return;
      }

      sendSuccess(res, user, "Admin profile retrieved successfully");
    } catch (error) {
      console.error("Get Profile Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * PUT /api/auth/profile
   * Update admin user profile (name, email, and password via Bcrypt).
   */
  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        sendError(res, "User not authenticated", 401);
        return;
      }

      const validation = updateProfileSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const { name, email, currentPassword, newPassword } = validation.data;
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        sendError(res, "Admin user not found", 404);
        return;
      }

      const updateData: { name?: string; email?: string; passwordHash?: string } = {};

      if (name) updateData.name = name;
      if (email && email !== user.email) {
        const emailExists = await prisma.user.findUnique({ where: { email } });
        if (emailExists) {
          sendError(res, "Email is already in use by another account", 400);
          return;
        }
        updateData.email = email;
      }

      if (newPassword) {
        if (!currentPassword) {
          sendError(res, "Current password is required to set a new password", 400);
          return;
        }
        const isCurrentValid = await bcryptjs.compare(currentPassword, user.passwordHash);
        if (!isCurrentValid) {
          sendError(res, "Current password is incorrect", 401);
          return;
        }
        updateData.passwordHash = await bcryptjs.hash(newPassword, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      sendSuccess(res, updatedUser, "Profile updated successfully");
    } catch (error) {
      console.error("Update Profile Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * POST /api/auth/register
   * Helper endpoint to register a new admin user account.
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = registerSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const { name, email, password } = validation.data;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        sendError(res, "Email is already registered", 400);
        return;
      }

      const passwordHash = await bcryptjs.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      sendSuccess(res, newUser, "Admin account registered successfully", 201);
    } catch (error) {
      console.error("Register Error:", error);
      sendError(res, error, 500);
    }
  };
}

export default new AuthController();
