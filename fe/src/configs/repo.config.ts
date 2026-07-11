export const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export const api = "/api";
export const version = "";

export function joinUrl(...parts: string[]): string {
  return parts
    .map((part) => part.replace(/(^\/+|\/+$)/g, ""))
    .filter(Boolean)
    .join("/");
}
