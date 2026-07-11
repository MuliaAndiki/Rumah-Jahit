import authService, { type UpdateProfilePayload } from "./auth.service";
import categoryService from "./category.service";
import catalogService from "./catalog.service";
import imageService from "./image.service";
import uploadService from "./upload.service";
import { WrapApi, StandardResponse } from "./service-response";

export type { StandardResponse, UpdateProfilePayload };

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
  _count?: {
    catalogItems: number;
  };
}

export interface CatalogImageItem {
  id: string;
  catalogItemId: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  isPrimary: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface CatalogItemData {
  id: string;
  categoryId?: number | null;
  category?: CategoryItem | null;
  title: string;
  slug: string;
  description?: string | null;
  priceStart?: number | string | null;
  estimatedTime?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  images?: CatalogImageItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}

export interface CategoryPayload {
  name?: string;
  slug?: string;
}

export interface CatalogItemPayload {
  title?: string;
  description?: string | null;
  priceStart?: number | string | null;
  estimatedTime?: string | null;
  isFeatured?: boolean;
  isPublished?: boolean;
  categoryId?: number | string | null;
  slug?: string;
  images?: {
    imageUrl: string;
    cloudinaryPublicId: string;
    isPrimary?: boolean;
    displayOrder?: number;
  }[];
}

export interface CatalogImagePayload {
  imageUrl: string;
  cloudinaryPublicId: string;
  isPrimary?: boolean;
  displayOrder?: number;
}

export interface ReorderImagePayload {
  id: string;
  displayOrder: number;
}

class ApiServicePackage {
  static Auth = WrapApi(authService);
  static Category = WrapApi(categoryService);
  static Catalog = WrapApi(catalogService);
  static Image = WrapApi(imageService);
  static Upload = WrapApi(uploadService);
}

// Compatibility wrapper for direct apiService method calls
class ApiInstance {
  public async login(payload: LoginPayload) {
    return ApiServicePackage.Auth.Login(payload);
  }
  public async register(payload: RegisterPayload) {
    return ApiServicePackage.Auth.Register(payload);
  }
  public async getMe() {
    return ApiServicePackage.Auth.GetMe();
  }
  public async updateProfile(payload: UpdateProfilePayload) {
    return ApiServicePackage.Auth.UpdateProfile(payload);
  }
  public async getCategories() {
    return ApiServicePackage.Category.GetCategories();
  }
  public async createCategory(payload: CategoryPayload) {
    return ApiServicePackage.Category.CreateCategory(payload);
  }
  public async updateCategory(id: number, payload: CategoryPayload) {
    return ApiServicePackage.Category.UpdateCategory(id, payload);
  }
  public async deleteCategory(id: number) {
    return ApiServicePackage.Category.DeleteCategory(id);
  }
  public async getCatalogItems(params?: any) {
    return ApiServicePackage.Catalog.GetCatalogItems(params);
  }
  public async getCatalogItemById(id: string) {
    return ApiServicePackage.Catalog.GetCatalogItemById(id);
  }
  public async createCatalogItem(payload: CatalogItemPayload) {
    return ApiServicePackage.Catalog.CreateCatalogItem(payload);
  }
  public async updateCatalogItem(id: string, payload: CatalogItemPayload) {
    return ApiServicePackage.Catalog.UpdateCatalogItem(id, payload);
  }
  public async deleteCatalogItem(id: string) {
    return ApiServicePackage.Catalog.DeleteCatalogItem(id);
  }
  public async addCatalogImages(itemId: string, payload: any) {
    return ApiServicePackage.Image.AddCatalogImages(itemId, payload);
  }
  public async deleteImage(imageId: string) {
    return ApiServicePackage.Image.DeleteImage(imageId);
  }
  public async setPrimaryImage(imageId: string) {
    return ApiServicePackage.Image.SetPrimaryImage(imageId);
  }
  public async reorderImages(payload: any) {
    return ApiServicePackage.Image.ReorderImages(payload);
  }
  public async uploadDirectToCloudinary(file: File, type?: any) {
    return ApiServicePackage.Upload.uploadDirectToCloudinary(file, type);
  }
}

export const Api = ApiServicePackage;
export const apiService = new ApiInstance();
export default ApiServicePackage;
