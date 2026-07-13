"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PushNotificationPromptClient } from "@/components/pwa/PushNotificationPromptClient";
import {
  clearPwaAuthSession,
  loadPwaAuthSession,
  syncPwaAuthFromRefreshResponse,
} from "@/utils/pwa-auth.storage";

async function restoreAuthSession() {
  const stored = loadPwaAuthSession();
  const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const hasCookie = typeof document !== "undefined" && document.cookie.includes("rjahit_session=");

  if (stored?.accessToken || localToken || hasCookie) {
    if (stored?.refreshToken && !stored?.accessToken) {
      // only refresh if we have refresh token but no active access token
    } else {
      return true;
    }
  }

  const response = await fetch("/auth/api/refresh", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      stored?.refreshToken ? { refreshToken: stored.refreshToken } : {},
    ),
  });

  if (!response.ok) {
    if (stored?.accessToken || localToken || hasCookie) {
      return true;
    }
    clearPwaAuthSession();
    return false;
  }

  const json = (await response.json().catch(() => null)) as {
    data?: unknown;
  } | null;

  syncPwaAuthFromRefreshResponse(json?.data, stored);
  return true;
}

export default function PrivateProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapSession() {
      try {
        const ok = await restoreAuthSession();
        if (cancelled) return;

        setIsAuthenticated(ok);
        setIsReady(true);

        if (!ok) {
          router.replace("/login");
        }
      } catch {
        if (!cancelled) {
          setIsAuthenticated(false);
          setIsReady(true);
          router.replace("/login");
        }
      }
    }

    void bootstrapSession();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <>
      {isReady && isAuthenticated ? children : null}
      <PushNotificationPromptClient />
    </>
  );
}
