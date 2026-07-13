import { useAuth } from './auth/useAuth';
import { useCatalog } from './catalog/useCatalog';
import { useCategories } from './categories/useCategories';
import { useImages } from './images/useImages';

export interface UseApiOptions {
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
  enabledCatalogList?: boolean;
  enabledCatalogDetail?: boolean;
  enabledCategories?: boolean;
}

export function useApi(options?: UseApiOptions) {
  return {
    auth: useAuth({
      enabledGetMe: options?.enabledGetMe,
    }),
    catalog: useCatalog(options?.catalogParams, options?.catalogItemId, {
      enabledList: options?.enabledCatalogList,
      enabledDetail: options?.enabledCatalogDetail,
    }),
    categories: useCategories({
      enabled: options?.enabledCategories,
    }),
    images: useImages(),
  };
}
