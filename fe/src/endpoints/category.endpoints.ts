export const CATEGORY_ENDPOINTS = {
  LIST: "/api/admin/categories",
  CREATE: "/api/admin/categories",
  UPDATE: (id: number) => `/api/admin/categories/${id}`,
  DELETE: (id: number) => `/api/admin/categories/${id}`,
} as const;
