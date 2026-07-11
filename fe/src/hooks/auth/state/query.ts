import { useQuery } from "@tanstack/react-query";
import { Api } from "@/services/props.service";
import { queryKey } from "@/configs/query-key";

export function useGetMeQuery(enabled = true) {
  return useQuery({
    queryKey: queryKey.auth.me(),
    queryFn: () => Api.Auth.GetMe(),
    enabled,
    retry: false,
  });
}
