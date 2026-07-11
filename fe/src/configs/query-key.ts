export const queryKey = {
  authRoot: () => ["auth"] as const,
  auth: {
    me: () => ["auth", "me"] as const,
  },

  categoriesRoot: () => ["categories"] as const,
  categories: {
    list: () => ["categories", "list"] as const,
  },

  catalogRoot: () => ["catalog"] as const,
  catalog: {
    list: (filters?: Record<string, any>) => ["catalog", "list", filters ?? {}] as const,
    detail: (id: string) => ["catalog", "detail", id] as const,
  },

  imagesRoot: () => ["images"] as const,
} as const;
