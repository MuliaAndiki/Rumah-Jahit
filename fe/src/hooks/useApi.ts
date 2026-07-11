import { useAuth } from "./auth/useAuth";
import { useCategories } from "./categories/useCategories";
import { useCatalog } from "./catalog/useCatalog";
import { useImages } from "./images/useImages";

export function useApi(options?: {
  catalogParams?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string | number;
    isPublished?: string;
    isFeatured?: string;
  };
  catalogItemId?: string;
  enabledGetMe?: boolean;
  enabledCategories?: boolean;
  enabledCatalogList?: boolean;
  enabledCatalogDetail?: boolean;
}) {
  return {
    auth: useAuth({ enabledGetMe: options?.enabledGetMe }),
    categories: useCategories({ enabled: options?.enabledCategories }),
    catalog: useCatalog(options?.catalogParams, options?.catalogItemId, {
      enabledList: options?.enabledCatalogList,
      enabledDetail: options?.enabledCatalogDetail,
    }),
    images: useImages(),
  };
}
