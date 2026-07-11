import { IMAGE_ENDPOINTS } from "../endpoints/image.endpoints";
import { ClientPostResponse, ClientDelResponse, ClientPatchResponse } from "./http";
import { toServiceResponse, StandardResponse } from "./service-response";
import type { CatalogImageItem, CatalogImagePayload, ReorderImagePayload } from "./props.service";

class ImageService {
  public async AddCatalogImages(
    itemId: string,
    payload: CatalogImagePayload[] | { images: CatalogImagePayload[] }
  ): Promise<StandardResponse<CatalogImageItem[]>> {
    const res = await ClientPostResponse<CatalogImageItem[]>(IMAGE_ENDPOINTS.ADD(itemId), payload);
    return toServiceResponse(res, {
      message: "Gambar berhasil ditambahkan",
      statusCode: 201,
    });
  }

  public async DeleteImage(imageId: string): Promise<StandardResponse<null>> {
    const res = await ClientDelResponse<null>(IMAGE_ENDPOINTS.DELETE(imageId));
    return toServiceResponse(res, {
      message: "Gambar berhasil dihapus",
      statusCode: 200,
    });
  }

  public async SetPrimaryImage(imageId: string): Promise<StandardResponse<CatalogImageItem[]>> {
    const res = await ClientPatchResponse<CatalogImageItem[]>(IMAGE_ENDPOINTS.SET_PRIMARY(imageId));
    return toServiceResponse(res, {
      message: "Gambar utama berhasil diperbarui",
      statusCode: 200,
    });
  }

  public async ReorderImages(
    payload: ReorderImagePayload[] | { items: ReorderImagePayload[] }
  ): Promise<StandardResponse<null>> {
    const res = await ClientPatchResponse<null>(IMAGE_ENDPOINTS.REORDER, payload);
    return toServiceResponse(res, {
      message: "Urutan gambar berhasil disimpan",
      statusCode: 200,
    });
  }
}

export default new ImageService();
