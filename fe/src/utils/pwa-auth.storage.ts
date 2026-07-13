"use client";

import type { AdminUser } from "@/services/props.service";

const PWA_AUTH_KEY = "rjahit_pwa_auth_session";

export interface PwaAuthSession {
  accessToken?: string;
  refreshToken?: string;
  user?: AdminUser | Record<string, any> | null;
  role?: string;
}

export function savePwaAuthSession(session: PwaAuthSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PWA_AUTH_KEY, JSON.stringify(session));
  } catch (err) {
    console.error("[PWAAuth] Failed to save session:", err);
  }
}

export function loadPwaAuthSession(): PwaAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PWA_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PwaAuthSession;
  } catch (err) {
    console.error("[PWAAuth] Failed to load session:", err);
    return null;
  }
}

export function clearPwaAuthSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PWA_AUTH_KEY);
  } catch (err) {
    console.error("[PWAAuth] Failed to clear session:", err);
  }
}

export function syncPwaAuthFromRefreshResponse(
  data: any,
  oldSession: PwaAuthSession | null
): void {
  if (!data || typeof window === "undefined") return;

  const accessToken =
    data?.tokens?.accessToken || data?.accessToken || oldSession?.accessToken;
  const refreshToken =
    data?.tokens?.refreshToken ||
    data?.refreshToken ||
    oldSession?.refreshToken;
  const user = data?.user || oldSession?.user || null;
  const role =
    data?.tokens?.role ||
    data?.role ||
    oldSession?.role ||
    user?.role ||
    "ADMIN";

  if (accessToken && refreshToken) {
    savePwaAuthSession({
      accessToken,
      refreshToken,
      user,
      role,
    });
  }
}
