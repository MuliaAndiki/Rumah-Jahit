import { useMutation } from "@tanstack/react-query";
import { Api, CatalogImagePayload, ReorderImagePayload, StandardResponse, CatalogImageItem } from "@/services/props.service";
import { queryKey } from "@/configs/query-key";
import { useAppNameSpace } from "@/hooks/useAppNameSpace";

export function useAddCatalogImagesMutation() {
  const ns = useAppNameSpace();

  return useMutation<
    StandardResponse<CatalogImageItem[]>,
    Error,
    { itemId: string; payload: CatalogImagePayload[] | { images: CatalogImagePayload[] } }
  >({
    mutationFn: ({ itemId, payload }) => Api.Image.AddCatalogImages(itemId, payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Gambar Ditambahkan",
        message: res.message || "Gambar baru berhasil ditambahkan ke item",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.imagesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Menambahkan Gambar",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useDeleteImageMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<null>, Error, string>({
    mutationFn: (imageId) => Api.Image.DeleteImage(imageId),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Gambar Dihapus",
        message: res.message || "Gambar berhasil dihapus dari Cloudinary dan database",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.imagesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Menghapus Gambar",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useSetPrimaryImageMutation() {
  const ns = useAppNameSpace();

  return useMutation<StandardResponse<CatalogImageItem[]>, Error, string>({
    mutationFn: (imageId) => Api.Image.SetPrimaryImage(imageId),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Gambar Utama Diubah",
        message: res.message || "Gambar utama berhasil diperbarui",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.imagesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Mengubah Gambar Utama",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}

export function useReorderImagesMutation() {
  const ns = useAppNameSpace();

  return useMutation<
    StandardResponse<null>,
    Error,
    ReorderImagePayload[] | { items: ReorderImagePayload[] }
  >({
    mutationFn: (payload) => Api.Image.ReorderImages(payload),
    onSuccess: (res) => {
      ns.alert.toast({
        title: "Urutan Gambar Disimpan",
        message: res.message || "Urutan slider gambar berhasil diperbarui",
        icon: "success",
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.catalogRoot(),
      });
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.imagesRoot(),
      });
    },
    onError: (err) => {
      ns.alert.toast({
        title: "Gagal Mengurutkan Gambar",
        message: err.message || "Terjadi kesalahan",
        icon: "error",
      });
    },
  });
}
