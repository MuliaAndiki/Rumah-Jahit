"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import CatalogSection from "@/components/page/catalog/CatalogSection";

export default function CatalogContainer() {
  const router = useRouter();
  const api = useApi();

  const { data: catalogRes, isLoading: isCatalogLoading } = api.catalog.getCatalogItems;
  const { data: categoriesRes, isLoading: isCategoriesLoading } = api.categories.getCategories;

  const catalogItems = catalogRes?.data || [];
  const categories = categoriesRes?.data || [];
  const isLoading = isCatalogLoading || isCategoriesLoading;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formPriceStart, setFormPriceStart] = React.useState("");
  const [formEstimatedTime, setFormEstimatedTime] = React.useState("");
  const [formCategoryId, setFormCategoryId] = React.useState("");
  const [formIsFeatured, setFormIsFeatured] = React.useState(false);
  const [formIsPublished, setFormIsPublished] = React.useState(true);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(null);

  const createMutation = api.catalog.createCatalogItem;
  const deleteMutation = api.catalog.deleteCatalogItem;
  const isPending = createMutation.isPending || deleteMutation.isPending;

  const handleOpenCreate = () => {
    setFormTitle("");
    setFormDescription("");
    setFormPriceStart("");
    setFormEstimatedTime("");
    setFormCategoryId(selectedCategory || "");
    setFormIsFeatured(false);
    setFormIsPublished(true);
    setIsModalOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      {
        title: formTitle,
        description: formDescription || null,
        priceStart: formPriceStart ? Number(formPriceStart) : null,
        estimatedTime: formEstimatedTime || null,
        categoryId: formCategoryId ? Number(formCategoryId) : null,
        isFeatured: formIsFeatured,
        isPublished: formIsPublished,
      },
      {
        onSuccess: (res) => {
          setIsModalOpen(false);
          if (res.data?.id) {
            router.push(`/catalog/${res.data.id}`);
          }
        },
      }
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    deleteMutation.mutate(deleteTargetId, {
      onSuccess: () => {
        setDeleteTargetId(null);
      },
    });
  };

  return (
    <CatalogSection
      state={{
        catalogItems,
        categories,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        formTitle,
        setFormTitle,
        formDescription,
        setFormDescription,
        formPriceStart,
        setFormPriceStart,
        formEstimatedTime,
        setFormEstimatedTime,
        formCategoryId,
        setFormCategoryId,
        formIsFeatured,
        setFormIsFeatured,
        formIsPublished,
        setFormIsPublished,
        deleteTargetId,
        setDeleteTargetId,
        isPending,
      }}
      service={{
        onOpenCreate: handleOpenCreate,
        onSubmitCreate: handleSubmitCreate,
        onConfirmDelete: handleConfirmDelete,
      }}
    />
  );
}
