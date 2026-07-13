"use client";

import * as React from "react";
import { useApi } from "@/hooks/useApi";
import CategoriesSection from "@/components/page/categories/CategoriesSection";
import type { CategoryItem } from "@/services/props.service";

export default function CategoriesContainer() {
  const api = useApi();

  const { data: categoriesRes, isLoading } = api.categories.getCategories;
  const categories = categoriesRes?.data || [];

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<CategoryItem | null>(null);
  const [formName, setFormName] = React.useState("");
  const [formSlug, setFormSlug] = React.useState("");
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const createMutation = api.categories.createCategory;
  const updateMutation = api.categories.updateCategory;
  const deleteMutation = api.categories.deleteCategory;

  const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CategoryItem) => {
    setEditingCategory(item);
    setFormName(item.name);
    setFormSlug(item.slug);
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateMutation.mutate(
        { id: editingCategory.id, payload: { name: formName, slug: formSlug } },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      createMutation.mutate(
        { name: formName, slug: formSlug },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    }
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    deleteMutation.mutate(deleteTargetId, {
      onSuccess: () => {
        setDeleteTargetId(null);
      },
    });
  };

  return (
    <CategoriesSection
      state={{
        categories,
        isLoading,
        searchQuery,
        setSearchQuery,
        isModalOpen,
        setIsModalOpen,
        editingCategory,
        formName,
        setFormName,
        formSlug,
        setFormSlug,
        deleteTargetId,
        setDeleteTargetId,
        isPending,
      }}
      service={{
        onOpenCreate: handleOpenCreate,
        onOpenEdit: handleOpenEdit,
        onSubmitForm: handleSubmitForm,
        onConfirmDelete: handleConfirmDelete,
      }}
    />
  );
}
