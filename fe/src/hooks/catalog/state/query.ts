import { useQuery } from "@tanstack/react-query";
import { Api } from "@/services/props.service";
import { queryKey } from "@/configs/query-key";

export function useGetCatalogItemsQuery(
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string | number;
    isPublished?: string;
    isFeatured?: string;
  },
  enabled = true
) {
  return useQuery({
    queryKey: queryKey.catalog.list(params),
    queryFn: () => Api.Catalog.GetCatalogItems(params),
    enabled,
  });
}

export function useGetCatalogItemByIdQuery(id?: string, enabled = true) {
  return useQuery({
    queryKey: queryKey.catalog.detail(id || ""),
    queryFn: () => Api.Catalog.GetCatalogItemById(id!),
    enabled: Boolean(id) && enabled,
  });
}
