import { useGetCategoriesQuery } from "./state/query";
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "./state/mutate";

export function useCategories(options?: { enabled?: boolean }) {
  const getCategories = useGetCategoriesQuery(options?.enabled ?? true);
  const createCategory = useCreateCategoryMutation();
  const updateCategory = useUpdateCategoryMutation();
  const deleteCategory = useDeleteCategoryMutation();

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
