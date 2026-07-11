export class ApiError extends Error {
  public status: number;
  public errors?: Record<string, string[]> | { field: string; message: string }[] | null;

  constructor(
    message: string,
    status = 500,
    errors?: Record<string, string[]> | { field: string; message: string }[] | null
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export interface ApiSuccessResponse<T = any> {
  success?: boolean;
  data: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]> | { field: string; message: string }[] | null;
  status?: number;
  code?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
