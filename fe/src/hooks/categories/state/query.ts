import { useQuery } from "@tanstack/react-query";
import { Api } from "@/services/props.service";
import { queryKey } from "@/configs/query-key";

export function useGetCategoriesQuery(enabled = true) {
  return useQuery({
    queryKey: queryKey.categories.list(),
    queryFn: () => Api.Category.GetCategories(),
    enabled,
  });
}
