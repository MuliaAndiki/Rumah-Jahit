import { useQuery } from "@tanstack/react-query";

import { queryKey } from "@/configs/query-key";
import { Api } from "@/services/props.service";

export function useGetCategoriesQuery(enabled = true) {
  return useQuery({
    queryKey: queryKey.categories.list(),
    queryFn: () => Api.Category.GetCategories(),
    enabled,
  });
}
