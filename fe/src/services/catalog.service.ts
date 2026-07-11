import { CATALOG_ENDPOINTS } from "../endpoints/catalog.endpoints";
import { ClientGetResponse, ClientPostResponse, ClientPutResponse, ClientDelResponse } from "./http";
import { toServiceResponse, StandardResponse } from "./service-response";
import type { CatalogItemData, CatalogItemPayload } from "./props.service";

class CatalogService {
  public async GetCatalogItems(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string | number;
    isPublished?: string;
    isFeatured?: string;
  }): Promise<StandardResponse<CatalogItemData[]>> {
    const queryParts = [];
    if (params) {
      if (params.page !== undefined) queryParts.push(`page=${params.page}`);
      if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
      if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (params.categoryId !== undefined) queryParts.push(`categoryId=${params.categoryId}`);
      if (params.isPublished !== undefined) queryParts.push(`isPublished=${params.isPublished}`);
      if (params.isFeatured !== undefined) queryParts.push(`isFeatured=${params.isFeatured}`);
    }
    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
    const res = await ClientGetResponse<CatalogItemData[]>(`${CATALOG_ENDPOINTS.LIST}${queryStr}`);
    return toServiceResponse(res, {
      message: "Daftar katalog berhasil diambil",
      statusCode: 200,
    });
  }

  public async GetCatalogItemById(id: string): Promise<StandardResponse<CatalogItemData>> {
    const res = await ClientGetResponse<CatalogItemData>(CATALOG_ENDPOINTS.DETAIL(id));
    return toServiceResponse(res, {
      message: "Detail katalog berhasil diambil",
      statusCode: 200,
    });
  }

  public async CreateCatalogItem(payload: CatalogItemPayload): Promise<StandardResponse<CatalogItemData>> {
    const res = await ClientPostResponse<CatalogItemData>(CATALOG_ENDPOINTS.CREATE, payload);
    return toServiceResponse(res, {
      message: "Item katalog berhasil dibuat",
      statusCode: 201,
    });
  }

  public async UpdateCatalogItem(id: string, payload: CatalogItemPayload): Promise<StandardResponse<CatalogItemData>> {
    const res = await ClientPutResponse<CatalogItemData>(CATALOG_ENDPOINTS.UPDATE(id), payload);
    return toServiceResponse(res, {
      message: "Item katalog berhasil diperbarui",
      statusCode: 200,
    });
  }

  public async DeleteCatalogItem(id: string): Promise<StandardResponse<null>> {
    const res = await ClientDelResponse<null>(CATALOG_ENDPOINTS.DELETE(id));
    return toServiceResponse(res, {
      message: "Item katalog berhasil dihapus",
      statusCode: 200,
    });
  }
}

export default new CatalogService();
