"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import DashboardSection from "../_section/DashboardSection";
import { clearTokens } from "@/server/auth-cookies";
import { clearPwaAuthSession } from "@/utils/pwa-auth.storage";
import { APP_SESSION_COOKIE_KEY, APP_SESSION_COOKIE_REFRESH, APP_SESSION_COOKIE_ROLE } from "@/configs/cookies.config";

export default function DashboardContainer() {
  const router = useRouter();
  const api = useApi();

  const { data: user } = api.auth.getMe;
  const { data: categoriesData, isLoading: isCategoriesLoading } = api.categories.getCategories;
  const { data: catalogData, isLoading: isCatalogLoading } = api.catalog.getCatalogItems;

  const categories = categoriesData?.data || [];
  const catalogItems = catalogData?.data || [];
  const isLoading = isCategoriesLoading || isCatalogLoading;

  const handleLogout = async () => {
    try {
      await clearTokens();
    } catch (e) {
      console.error(e);
    }
    clearPwaAuthSession();
    if (typeof document !== "undefined") {
      document.cookie = `${APP_SESSION_COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${APP_SESSION_COOKIE_REFRESH}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${APP_SESSION_COOKIE_ROLE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    router.push("/login");
  };

  return (
    <DashboardSection
      state={{
        user: user?.data,
        categories,
        catalogItems,
        isLoading,
      }}
      service={{
        onLogout: handleLogout,
      }}
    />
  );
}
