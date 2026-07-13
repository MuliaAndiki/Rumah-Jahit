import { useGetMeQuery } from './state/query';
import { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation } from './state/mutate';

export function useAuth(options?: { enabledGetMe?: boolean }) {
  const login = useLoginMutation();
  const register = useRegisterMutation();
  const updateProfile = useUpdateProfileMutation();
  const logout = useLogoutMutation();
  const getMe = useGetMeQuery(options?.enabledGetMe ?? true);

  return {
    login,
    register,
    updateProfile,
    logout,
    getMe,
    mutate: {
      login,
      register,
      updateProfile,
      logout,
    },
    query: {
      me: getMe,
      getMe,
    },
  };
}
