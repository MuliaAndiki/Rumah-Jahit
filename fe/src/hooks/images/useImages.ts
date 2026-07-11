import {
  useAddCatalogImagesMutation,
  useDeleteImageMutation,
  useSetPrimaryImageMutation,
  useReorderImagesMutation,
} from "./state/mutate";

export function useImages() {
  const addCatalogImages = useAddCatalogImagesMutation();
  const deleteImage = useDeleteImageMutation();
  const setPrimaryImage = useSetPrimaryImageMutation();
  const reorderImages = useReorderImagesMutation();

  return {
    addCatalogImages,
    deleteImage,
    setPrimaryImage,
    reorderImages,
  };
}
