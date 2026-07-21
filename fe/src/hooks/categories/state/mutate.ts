import { useMutation } from "@tanstack/react-query";

import { queryKey } from "@/configs/query-key";
import { useAppNameSpace } from "@/hooks/useAppNameSpace";
import { Api, CategoryItem,CategoryPayload, StandardResponse } from "@/services/props.service";

export function useCreateCategoryMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<CategoryItem>, Error, CategoryPayload>({
    mutationFn: (payload) => Api.Category.CreateCategory(payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Kategori Dibuat",
        message: res.message || "Kategori baru berhasil ditambahkan",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.categoriesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Membuat Kategori",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useUpdateCategoryMutation() {
  const ns = useAppNameSpace();

  return useMutation<
    StandardResponse<CategoryItem>,
    Error,
    { id: number; payload: CategoryPayload }
  >({
    mutationFn: ({ id, payload }) => Api.Category.UpdateCategory(id, payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Kategori Diperbarui",
        message: res.message || "Kategori berhasil diperbarui",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.categoriesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Memperbarui Kategori",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useDeleteCategoryMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<null>, Error, number>({
    mutationFn: (id) => Api.Category.DeleteCategory(id),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Kategori Dihapus",
        message: res.message || "Kategori berhasil dihapus",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.categoriesRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Menghapus Kategori",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}
