import { useMutation } from "@tanstack/react-query";
import { Api, CatalogItemPayload, StandardResponse, CatalogItemData } from "@/services/props.service";
import { queryKey } from "@/configs/query-key";
import { useAppNameSpace } from "@/hooks/useAppNameSpace";

export function useCreateCatalogItemMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<CatalogItemData>, Error, CatalogItemPayload>({
    mutationFn: (payload) => Api.Catalog.CreateCatalogItem(payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Item Katalog Dibuat",
        message: res.message || "Item katalog baru berhasil ditambahkan",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.categoriesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Membuat Item",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useUpdateCatalogItemMutation() {
  const ns = useAppNameSpace();

  return useMutation<
    StandardResponse<CatalogItemData>,
    Error,
    { id: string; payload: CatalogItemPayload }
  >({
    mutationFn: ({ id, payload }) => Api.Catalog.UpdateCatalogItem(id, payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Item Katalog Diperbarui",
        message: res.message || "Item katalog berhasil diperbarui",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.categoriesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Memperbarui Item",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useDeleteCatalogItemMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<null>, Error, string>({
    mutationFn: (id) => Api.Catalog.DeleteCatalogItem(id),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Item Katalog Dihapus",
        message: res.message || "Item katalog dan gambar terkait berhasil dihapus",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.categoriesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Menghapus Item",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}
