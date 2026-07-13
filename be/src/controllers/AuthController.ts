import { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess, sendError } from "../lib/response";
import AuthService from "../service/AuthService";

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
   * Validate email/password with Zod and delegate to AuthService.
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const { email, password } = validation.data;
      const result = await AuthService.login(email, password);
      sendSuccess(res, result, "Login successful");
    } catch (error) {
      console.error("Login Error:", error);
      sendError(res, error);
    }
  };

  /**
   * GET /api/auth/me
   * Delegate profile retrieval to AuthService.
   */
  public me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        sendError(res, "User not authenticated", 401);
        return;
      }

      const user = await AuthService.getProfile(req.user.id);
      sendSuccess(res, user, "Admin profile retrieved successfully");
    } catch (error) {
      console.error("Get Profile Error:", error);
      sendError(res, error);
    }
  };

  /**
   * PUT /api/auth/profile
   * Delegate profile update to AuthService.
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

      const updatedUser = await AuthService.updateProfile(req.user.id, validation.data);
      sendSuccess(res, updatedUser, "Profile updated successfully");
    } catch (error) {
      console.error("Update Profile Error:", error);
      sendError(res, error);
    }
  };

  /**
   * POST /api/auth/register
   * Delegate registration logic to AuthService.
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = registerSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const newUser = await AuthService.register(validation.data);
      sendSuccess(res, newUser, "Admin account registered successfully", 201);
    } catch (error) {
      console.error("Register Error:", error);
      sendError(res, error);
    }
  };

  /**
   * POST /api/auth/refresh
   * Delegate refresh token verification and re-issuance to AuthService.
   */
  public refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refresh(refreshToken);
      sendSuccess(res, result, "Token refreshed successfully");
    } catch (error) {
      console.error("Refresh Token Error:", error);
      sendError(res, error);
    }
  };

  /**
   * POST /api/auth/logout
   * Delegate logout verification/logic to AuthService.
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = req.user;
      if (!users?.id) {
        sendError(res, "Users not found", 404);
        return;
      }

      const result = await AuthService.logout(users.id);
      sendSuccess(res, result, "Logout successful");
    } catch (error) {
      console.error("Logout Error:", error);
      sendError(res, error);
    }
  };
}

export default new AuthController();
