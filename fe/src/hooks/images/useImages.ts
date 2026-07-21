import {
  useAddCatalogImagesMutation,
  useDeleteImageMutation,
  useReorderImagesMutation,
  useSetPrimaryImageMutation,
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
