"use client";

import * as React from "react";
import { useApi } from "@/hooks/useApi";
import PublicCatalogSection from "../_section/PublicCatalogSection";

export default function PublicCatalogContainer() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const api = useApi({
    catalogParams: {
      isPublished: "true",
      search: searchQuery || undefined,
      categoryId: selectedCategory || undefined,
      limit: 50,
    },
    enabledCatalogList: true,
    enabledCategories: true,
  });

  const { data: catalogRes, isLoading: isCatalogLoading } = api.catalog.getCatalogItems;
  const { data: categoriesRes, isLoading: isCategoriesLoading } = api.categories.getCategories;

  const items = catalogRes?.data || [];
  const categories = categoriesRes?.data || [];
  const isLoading = isCatalogLoading || isCategoriesLoading;

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <PublicCatalogSection
      state={{
        items,
        categories,
        selectedCategory,
        searchQuery,
        isLoading,
      }}
      service={{
        onSelectCategory: handleSelectCategory,
        onSearchChange: handleSearchChange,
      }}
    />
  );
}
