"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { Api } from "@/services/props.service";
import CatalogDetailSection from "@/components/page/catalog/CatalogDetailSection";

export default function CatalogDetailContainer() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "";

  const api = useApi({ catalogItemId: id });
  const { data: itemRes, isLoading: isItemLoading } = api.catalog.getCatalogItemById;
  const { data: categoriesRes, isLoading: isCategoriesLoading } = api.categories.getCategories;

  const item = itemRes?.data || null;
  const categories = categoriesRes?.data || [];
  const isLoading = isItemLoading || isCategoriesLoading;

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formPriceStart, setFormPriceStart] = React.useState("");
  const [formEstimatedTime, setFormEstimatedTime] = React.useState("");
  const [formCategoryId, setFormCategoryId] = React.useState("");
  const [formIsFeatured, setFormIsFeatured] = React.useState(false);
  const [formIsPublished, setFormIsPublished] = React.useState(true);

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgressText, setUploadProgressText] = React.useState("");
  const [deleteImageId, setDeleteImageId] = React.useState<string | null>(null);

  const updateMutation = api.catalog.updateCatalogItem;
  const addImagesMutation = api.images.addCatalogImages;
  const setPrimaryMutation = api.images.setPrimaryImage;
  const deleteImageMutation = api.images.deleteImage;

  const isPending =
    updateMutation.isPending ||
    addImagesMutation.isPending ||
    setPrimaryMutation.isPending ||
    deleteImageMutation.isPending;

  React.useEffect(() => {
    if (item) {
      setFormTitle(item.title);
      setFormDescription(item.description || "");
      setFormPriceStart(item.priceStart ? String(item.priceStart) : "");
      setFormEstimatedTime(item.estimatedTime || "");
      setFormCategoryId(item.categoryId ? String(item.categoryId) : "");
      setFormIsFeatured(Boolean(item.isFeatured));
      setFormIsPublished(Boolean(item.isPublished));
    }
  }, [item]);

  const handleUpdateMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      payload: {
        title: formTitle,
        description: formDescription || null,
        priceStart: formPriceStart ? Number(formPriceStart) : null,
        estimatedTime: formEstimatedTime || null,
        categoryId: formCategoryId ? Number(formCategoryId) : null,
        isFeatured: formIsFeatured,
        isPublished: formIsPublished,
      },
    });
  };

  const handleUploadPanelImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      setUploadProgressText("Mengunggah Foto Panel Utama ke Cloudinary...");
      const uploaded = await Api.Upload.uploadDirectToCloudinary(file);

      setUploadProgressText("Menyimpan Foto Panel Utama ke database...");
      await addImagesMutation.mutateAsync({
        itemId: id,
        payload: [
          {
            imageUrl: uploaded.imageUrl,
            cloudinaryPublicId: uploaded.cloudinaryPublicId,
            isPrimary: true,
            displayOrder: 1,
          },
        ],
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan saat mengunggah foto panel");
    } finally {
      setIsUploading(false);
      setUploadProgressText("");
      if (e.target) e.target.value = "";
    }
  };

  const handleUploadOtherImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const payloads = [];
      const currentCount = item?.images?.length || 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Mengunggah foto detail (${i + 1}/${files.length}) ke Cloudinary...`);
        const uploaded = await Api.Upload.uploadDirectToCloudinary(file);
        payloads.push({
          imageUrl: uploaded.imageUrl,
          cloudinaryPublicId: uploaded.cloudinaryPublicId,
          isPrimary: false,
          displayOrder: currentCount + i + 1,
        });
      }

      setUploadProgressText("Menyimpan galeri foto ke database...");
      await addImagesMutation.mutateAsync({
        itemId: id,
        payload: payloads,
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan saat mengunggah foto detail");
    } finally {
      setIsUploading(false);
      setUploadProgressText("");
      if (e.target) e.target.value = "";
    }
  };

  const handleSetPrimary = (imageId: string) => {
    setPrimaryMutation.mutate(imageId);
  };

  const handleConfirmDeleteImage = () => {
    if (!deleteImageId) return;
    deleteImageMutation.mutate(deleteImageId, {
      onSuccess: () => {
        setDeleteImageId(null);
      },
    });
  };

  return (
    <CatalogDetailSection
      state={{
        item,
        categories,
        isLoading,
        isUploading,
        uploadProgressText,
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
        deleteImageId,
        setDeleteImageId,
        isPending,
      }}
      service={{
        onUpdateMetadata: handleUpdateMetadata,
        onUploadPanelImage: handleUploadPanelImage,
        onUploadOtherImages: handleUploadOtherImages,
        onSetPrimary: handleSetPrimary,
        onConfirmDeleteImage: handleConfirmDeleteImage,
      }}
    />
  );
}
