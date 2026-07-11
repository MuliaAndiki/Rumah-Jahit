"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import PublicCatalogDetailSection from "../_section/PublicCatalogDetailSection";

export default function PublicCatalogDetailContainer() {
  const params = useParams();
  const slugOrId = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || "";

  const [activeImageIndex, setActiveImageIndex] = React.useState<number>(0);

  const api = useApi({
    catalogItemId: slugOrId,
    catalogParams: {
      isPublished: "true",
      limit: 4,
    },
    enabledCatalogDetail: true,
    enabledCatalogList: true,
  });

  const { data: itemRes, isLoading: isItemLoading } = api.catalog.getCatalogItemById;
  const { data: relatedRes, isLoading: isRelatedLoading } = api.catalog.getCatalogItems;

  const item = itemRes?.data || null;
  const allRelated = relatedRes?.data || [];

  // Filter out current item from related items
  const relatedItems = React.useMemo(() => {
    if (!item) return allRelated.slice(0, 4);
    return allRelated.filter((i) => i.id !== item.id && i.slug !== item.slug).slice(0, 4);
  }, [allRelated, item]);

  const isLoading = isItemLoading || isRelatedLoading;

  const handleSelectImage = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <PublicCatalogDetailSection
      state={{
        item,
        relatedItems,
        activeImageIndex,
        isLoading,
      }}
      service={{
        onSelectImage: handleSelectImage,
      }}
    />
  );
}
