"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import DashboardSection from "@/components/page/dashboard/DashboardSection";
import MainLayout from "@/core/layouts/main.layout";

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
    api.auth.mutate.logout.mutate();
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
