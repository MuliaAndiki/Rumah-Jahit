import { useQueryClient } from "@tanstack/react-query";
import { useAlert } from "@/hooks/useAlert/costum-alert";

export function useAppNameSpace() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return {
    queryClient,
    alert,
  };
}
