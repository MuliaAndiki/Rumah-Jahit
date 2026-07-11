import { CATEGORY_ENDPOINTS } from "../endpoints/category.endpoints";
import { ClientGetResponse, ClientPostResponse, ClientPutResponse, ClientDelResponse } from "./http";
import { toServiceResponse, StandardResponse } from "./service-response";
import type { CategoryItem, CategoryPayload } from "./props.service";

class CategoryService {
  public async GetCategories(): Promise<StandardResponse<CategoryItem[]>> {
    const res = await ClientGetResponse<CategoryItem[]>(CATEGORY_ENDPOINTS.LIST);
    return toServiceResponse(res, {
      message: "Daftar kategori berhasil diambil",
      statusCode: 200,
    });
  }

  public async CreateCategory(payload: CategoryPayload): Promise<StandardResponse<CategoryItem>> {
    const res = await ClientPostResponse<CategoryItem>(CATEGORY_ENDPOINTS.CREATE, payload);
    return toServiceResponse(res, {
      message: "Kategori berhasil dibuat",
      statusCode: 201,
    });
  }

  public async UpdateCategory(id: number, payload: CategoryPayload): Promise<StandardResponse<CategoryItem>> {
    const res = await ClientPutResponse<CategoryItem>(CATEGORY_ENDPOINTS.UPDATE(id), payload);
    return toServiceResponse(res, {
      message: "Kategori berhasil diperbarui",
      statusCode: 200,
    });
  }

  public async DeleteCategory(id: number): Promise<StandardResponse<null>> {
    const res = await ClientDelResponse<null>(CATEGORY_ENDPOINTS.DELETE(id));
    return toServiceResponse(res, {
      message: "Kategori berhasil dihapus",
      statusCode: 200,
    });
  }
}

export default new CategoryService();
