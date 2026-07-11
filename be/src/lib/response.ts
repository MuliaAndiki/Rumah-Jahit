import { Response } from "express";

export interface StandardResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Sends a standardized success response: { success: true, data: ..., message: "..." }
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Operation successful",
  statusCode = 200,
  pagination?: StandardResponse["pagination"]
): void {
  const responsePayload: StandardResponse<T> = {
    success: true,
    data,
    message,
  };

  if (pagination) {
    responsePayload.pagination = pagination;
  }

  res.status(statusCode).json(responsePayload);
}

/**
 * Sends a standardized error response: { success: false, error: "..." }
 */
export function sendError(
  res: Response,
  error: string | Error | any,
  statusCode = 500
): void {
  let errorMessage = "An unexpected error occurred.";
  if (typeof error === "string") {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error.message === "string") {
    errorMessage = error.message;
  }

  res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
}
