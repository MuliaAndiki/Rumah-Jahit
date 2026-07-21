"use client";

import * as React from "react";

import HomeSection from "@/components/page/public/home/HomeSection";
import { useApi } from "@/hooks/useApi";

export default function ContainerHome() {
  const api = useApi({
    catalogParams: {
      isFeatured: "true",
      isPublished: "true",
      limit: 6,
    },
    enabledCatalogList: true,
    enabledGetMe: false,
  });

  const { data: catalogRes, isLoading } = api.catalog.getCatalogItems;
  const featuredItems = catalogRes?.data || [];

  return <HomeSection state={{ featuredItems, isLoading }} />;
}
