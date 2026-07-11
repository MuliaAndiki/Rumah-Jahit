export const CATALOG_ENDPOINTS = {
  LIST: "/api/admin/catalog",
  DETAIL: (id: string) => `/api/admin/catalog/${id}`,
  CREATE: "/api/admin/catalog",
  UPDATE: (id: string) => `/api/admin/catalog/${id}`,
  DELETE: (id: string) => `/api/admin/catalog/${id}`,
} as const;
