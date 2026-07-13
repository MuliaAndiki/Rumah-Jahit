"use client";

import * as React from "react";
import { useApi } from "@/hooks/useApi";
import HomeSection from "@/components/page/public/home/HomeSection";

export default function ContainerHome() {
  const api = useApi({
    catalogParams: {
      isFeatured: "true",
      isPublished: "true",
      limit: 6,
    },
    enabledCatalogList: true,
  });

  const { data: catalogRes, isLoading } = api.catalog.getCatalogItems;
  const featuredItems = catalogRes?.data || [];

  return <HomeSection state={{ featuredItems, isLoading }} />;
}
