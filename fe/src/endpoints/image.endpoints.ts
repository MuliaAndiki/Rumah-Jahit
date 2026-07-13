export const IMAGE_ENDPOINTS = {
  CREATE: "/api/admin/images",
  ADD: (itemId: string) => `/api/admin/catalog/${itemId}/images`,
  GET_BY_CATALOG: (itemId: string) => `/api/admin/catalog/${itemId}/images`,
  GET_BY_ID: (imageId: string) => `/api/admin/images/${imageId}`,
  UPDATE: (imageId: string) => `/api/admin/images/${imageId}`,
  DELETE: (imageId: string) => `/api/admin/images/${imageId}`,
  SET_PRIMARY: (imageId: string) => `/api/admin/images/${imageId}/set-primary`,
  REORDER: "/api/admin/images/reorder",
} as const;
