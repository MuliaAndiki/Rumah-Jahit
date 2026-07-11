import { ApiSuccessResponse } from "../types/api.types";

export interface StandardResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
  code: number;
  status: string;
  errors?: Record<string, string[]> | { field: string; message: string }[] | null;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function toServiceResponse<T>(
  res: ApiSuccessResponse<T>,
  options?: { message?: string; statusCode?: number }
): StandardResponse<T> {
  return {
    success: res.success ?? true,
    data: res.data ?? null,
    message: res.message || options?.message || "Success",
    code: res.code ?? res.status ?? options?.statusCode ?? 200,
    status: res.status ? String(res.status) : "OK",
    errors: res.errors ?? null,
    pagination: res.pagination,
  };
}

export function WrapApi<T>(service: T): T {
  return service;
}
