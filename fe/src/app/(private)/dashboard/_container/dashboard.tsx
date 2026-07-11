"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import DashboardSection from "../_section/DashboardSection";

export default function DashboardContainer() {
  const router = useRouter();
  const api = useApi();

  const { data: user } = api.auth.getMe;
  const { data: categoriesData, isLoading: isCategoriesLoading } = api.categories.getCategories;
  const { data: catalogData, isLoading: isCatalogLoading } = api.catalog.getCatalogItems;

  const categories = categoriesData?.data || [];
  const catalogItems = catalogData?.data || [];
  const isLoading = isCategoriesLoading || isCatalogLoading;

  const handleLogout = () => {
    // Clear session cookies or local storage and redirect to login
    if (typeof document !== "undefined") {
      document.cookie = "etno_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
