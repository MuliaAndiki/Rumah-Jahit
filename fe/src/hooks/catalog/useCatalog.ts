import { useCreateCatalogItemMutation, useDeleteCatalogItemMutation,useUpdateCatalogItemMutation } from "./state/mutate";
import { useGetCatalogItemByIdQuery,useGetCatalogItemsQuery } from "./state/query";

export function useCatalog(
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string | number;
    isPublished?: string;
    isFeatured?: string;
  },
  id?: string,
  options?: { enabledList?: boolean; enabledDetail?: boolean }
) {
  const getCatalogItems = useGetCatalogItemsQuery(params, options?.enabledList ?? true);
  const getCatalogItemById = useGetCatalogItemByIdQuery(id, options?.enabledDetail ?? true);
  const createCatalogItem = useCreateCatalogItemMutation();
  const updateCatalogItem = useUpdateCatalogItemMutation();
  const deleteCatalogItem = useDeleteCatalogItemMutation();

  return {
    getCatalogItems,
    getCatalogItemById,
    createCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
  };
}
