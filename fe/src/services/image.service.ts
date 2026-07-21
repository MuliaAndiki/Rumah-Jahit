import { IMAGE_ENDPOINTS } from "../endpoints/image.endpoints";
import { ClientDelResponse, ClientGetResponse, ClientPatchResponse, ClientPostResponse, ClientPutResponse } from "./http";
import type { CatalogImageItem, CatalogImagePayload, ReorderImagePayload } from "./props.service";
import { StandardResponse,toServiceResponse } from "./service-response";

class ImageService {
  public async CreateImage(
    payload: CatalogImagePayload & { catalogItemId: string }
  ): Promise<StandardResponse<CatalogImageItem>> {
    const res = await ClientPostResponse<CatalogImageItem>(IMAGE_ENDPOINTS.CREATE, payload);
    return toServiceResponse(res, {
      message: "Data gambar berhasil disimpan",
      statusCode: 201,
    });
  }

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

  public async GetImageById(imageId: string): Promise<StandardResponse<CatalogImageItem>> {
    const res = await ClientGetResponse<CatalogImageItem>(IMAGE_ENDPOINTS.GET_BY_ID(imageId));
    return toServiceResponse(res, {
      message: "Detail gambar berhasil diambil",
      statusCode: 200,
    });
  }

  public async GetImagesByCatalog(itemId: string): Promise<StandardResponse<CatalogImageItem[]>> {
    const res = await ClientGetResponse<CatalogImageItem[]>(IMAGE_ENDPOINTS.GET_BY_CATALOG(itemId));
    return toServiceResponse(res, {
      message: "Daftar gambar berhasil diambil",
      statusCode: 200,
    });
  }

  public async UpdateImage(
    imageId: string,
    payload: Partial<CatalogImagePayload & { catalogItemId: string }>
  ): Promise<StandardResponse<CatalogImageItem>> {
    const res = await ClientPutResponse<CatalogImageItem>(IMAGE_ENDPOINTS.UPDATE(imageId), payload);
    return toServiceResponse(res, {
      message: "Data gambar berhasil diperbarui",
      statusCode: 200,
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
