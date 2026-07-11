export const IMAGE_ENDPOINTS = {
  ADD: (itemId: string) => `/api/admin/catalog/${itemId}/images`,
  DELETE: (imageId: string) => `/api/admin/images/${imageId}`,
  SET_PRIMARY: (imageId: string) => `/api/admin/images/${imageId}/set-primary`,
  REORDER: "/api/admin/images/reorder",
} as const;
