import { useGetMeQuery } from "./state/query";
import { useLoginMutation, useRegisterMutation, useUpdateProfileMutation } from "./state/mutate";

export function useAuth(options?: { enabledGetMe?: boolean }) {
  const getMe = useGetMeQuery(options?.enabledGetMe ?? true);
  const login = useLoginMutation();
  const register = useRegisterMutation();
  const updateProfile = useUpdateProfileMutation();

  return {
    getMe,
    login,
    register,
    updateProfile,
  };
}
