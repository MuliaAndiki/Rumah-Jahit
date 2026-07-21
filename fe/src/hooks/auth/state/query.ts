import { useQuery } from "@tanstack/react-query";

import { queryKey } from "@/configs/query-key";
import { Api } from "@/services/props.service";

export function useGetMeQuery(enabled = true) {
  return useQuery({
    queryKey: queryKey.auth.me(),
    queryFn: () => Api.Auth.GetMe(),
    enabled,
    retry: false,
  });
}
