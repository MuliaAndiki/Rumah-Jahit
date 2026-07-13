import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { AppError } from "../lib/AppError";

class AuthService {
  public async LogoutService(resOrId: any, id?: string): Promise<any> {
    const userId = typeof resOrId === "string" ? resOrId : id;
    if (!userId) {
      throw new AppError("User ID not found", 404);
    }
    const query = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!query) {
      throw new AppError("user not found", 404);
    }
    return query;
  }

  public async logout(resOrId: any, id?: string): Promise<any> {
    return this.LogoutService(resOrId, id);
  }

  public async loginService(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("Server configuration error: JWT_SECRET is missing", 500);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    const refreshToken = jwt.sign(payload, secret, { expiresIn: "30d" });

    return {
      token,
      refreshToken,
      tokens: {
        accessToken: token,
        refreshToken: refreshToken,
        role: "ADMIN",
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "ADMIN",
        createdAt: user.createdAt,
      },
    };
  }

  public async login(email: string, password: string) {
    return this.loginService(email, password);
  }

  public async getProfileService(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("Admin account not found", 404);
    }

    return user;
  }

  public async getProfile(userId: string) {
    return this.getProfileService(userId);
  }

  public async updateProfileService(
    userId: string,
    data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("Admin user not found", 404);
    }

    const updateData: { name?: string; email?: string; passwordHash?: string } = {};

    if (data.name) updateData.name = data.name;
    if (data.email && data.email !== user.email) {
      const emailExists = await prisma.user.findUnique({ where: { email: data.email } });
      if (emailExists) {
        throw new AppError("Email is already in use by another account", 400);
      }
      updateData.email = data.email;
    }

    if (data.newPassword) {
      if (!data.currentPassword) {
        throw new AppError("Current password is required to set a new password", 400);
      }
      const isCurrentValid = await bcryptjs.compare(data.currentPassword, user.passwordHash);
      if (!isCurrentValid) {
        throw new AppError("Current password is incorrect", 401);
      }
      updateData.passwordHash = await bcryptjs.hash(data.newPassword, 10);
    }

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  public async updateProfile(
    userId: string,
    data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }
  ) {
    return this.updateProfileService(userId, data);
  }

  public async registerService(data: { name: string; email: string; password: string }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError("Email is already registered", 400);
    }

    const passwordHash = await bcryptjs.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  public async register(data: { name: string; email: string; password: string }) {
    return this.registerService(data);
  }

  public async refreshService(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("Server configuration error: JWT_SECRET is missing", 500);
    }

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, secret);
    } catch (err) {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const newAccessToken = jwt.sign(payload, secret, { expiresIn: "7d" });
    const newRefreshToken = jwt.sign(payload, secret, { expiresIn: "30d" });

    return {
      token: newAccessToken,
      refreshToken: newRefreshToken,
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        role: "ADMIN",
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "ADMIN",
      },
    };
  }

  public async refresh(refreshToken: string) {
    return this.refreshService(refreshToken);
  }
}

export default new AuthService();
