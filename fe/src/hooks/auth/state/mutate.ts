import { useMutation } from "@tanstack/react-query";
import { Api, LoginPayload, RegisterPayload, StandardResponse, AdminUser } from "@/services/props.service";
import type { UpdateProfilePayload } from "@/services/props.service";
import { queryKey } from "@/configs/query-key";
import { useAppNameSpace } from "@/hooks/useAppNameSpace";

export function useLoginMutation() {
  const ns = useAppNameSpace();

  return useMutation<
    StandardResponse<{ token: string; user: AdminUser }>,
    Error,
    LoginPayload
  >({
    mutationFn: (payload) => Api.Auth.Login(payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Login Berhasil",
        message: res.message || "Selamat datang kembali",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Login Gagal",
        message: err.message || "Email atau password salah",
        icon: "error",
      });
    },
  });
}

export function useRegisterMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<AdminUser>, Error, RegisterPayload>({
    mutationFn: (payload) => Api.Auth.Register(payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Registrasi Berhasil",
        message: res.message || "Akun admin berhasil dibuat",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Registrasi Gagal",
        message: err.message || "Terjadi kesalahan saat mendaftar",
        icon: "error",
      });
    },
  });
}

export function useUpdateProfileMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<AdminUser>, Error, UpdateProfilePayload>({
    mutationFn: (payload) => Api.Auth.UpdateProfile(payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Profil Diperbarui",
        message: res.message || "Data profil admin berhasil disimpan",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Memperbarui Profil",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

