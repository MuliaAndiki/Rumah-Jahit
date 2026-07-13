import { useMutation } from '@tanstack/react-query';
import {
  Api,
  LoginPayload,
  RegisterPayload,
  StandardResponse,
  AdminUser,
} from '@/services/props.service';
import type { UpdateProfilePayload } from '@/services/props.service';
import { queryKey } from '@/configs/query-key';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { saveTokens } from '@/server/auth-cookies';
import { savePwaAuthSession } from '@/utils/pwa-auth.storage';
import { useRouter } from 'next/navigation';

export function useLoginMutation() {
  const ns = useAppNameSpace();

  return useMutation<
    StandardResponse<{ token: string; refreshToken?: string; user: AdminUser }>,
    Error,
    LoginPayload
  >({
    mutationFn: (payload) => Api.Auth.Login(payload),
    onSuccess: async (res) => {
      if (res.data?.token) {
        const accessToken = res.data.token;
        const refreshToken = res.data.refreshToken || res.data.token;
        const role = res.data.user?.role || 'ADMIN';

        try {
          await saveTokens({
            accessToken,
            refreshToken,
            role,
          });
        } catch (e) {
          console.error('Gagal menyimpan cookies login:', e);
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', accessToken);
          document.cookie = `rjahit_session=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
          document.cookie = `rjahit_refres=${refreshToken}; path=/; max-age=2592000; SameSite=Lax`;
          if (role) document.cookie = `rjahit_role=${role}; path=/; max-age=2592000; SameSite=Lax`;
        }

        savePwaAuthSession({
          accessToken,
          refreshToken,
          user: res.data.user,
          role,
        });
      }

      ns.alert.toast({
        title: 'Login Berhasil',
        message: res.message || 'Selamat datang kembali',
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: 'Login Gagal',
        message: err.message || 'Email atau password salah',
        icon: 'error',
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
        title: 'Registrasi Berhasil',
        message: res.message || 'Akun admin berhasil dibuat',
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: 'Registrasi Gagal',
        message: err.message || 'Terjadi kesalahan saat mendaftar',
        icon: 'error',
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
        title: 'Profil Diperbarui',
        message: res.message || 'Data profil admin berhasil disimpan',
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: 'Gagal Memperbarui Profil',
        message: err.message || 'Terjadi kesalahan',
        icon: 'error',
      });
    },
  });
}

//  logout
export function useLogoutMutation() {
  const ns = useAppNameSpace();
  const router = useRouter()

  return useMutation<StandardResponse<null>, Error, void>({
    mutationFn: () => Api.Auth.Logout(),
    onSuccess: (res) => {
      ns.alert.toast({
        title: 'Logout Berhasil',
        message: res.message || 'Selamat tinggal',
        icon: 'success',
      });
      router.push('/home')
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.authRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: 'Logout Gagal',
        message: err.message || 'Terjadi kesalahan saat logout',
        icon: 'error',
      });
    },
  });
}