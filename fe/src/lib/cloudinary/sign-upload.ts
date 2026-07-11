import crypto from "crypto";

export type CloudinaryUploadType = "image" | "audio" | "video" | "raw" | "auto";

export interface CloudinarySignedUploadConfig {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  uploadUrl: string;
}

export function getCloudinarySignedUploadConfig(
  uploadType: CloudinaryUploadType = "image",
  customFolder = "rumah_jahit/catalog"
): CloudinarySignedUploadConfig {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    "";
  const apiKey = process.env.CLOUDINARY_API_KEY || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Kredensial Cloudinary (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) belum dikonfigurasi di server environment."
    );
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = customFolder;

  // Cloudinary signature generation: alphabetically sorted parameters + apiSecret
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  const resourceType = uploadType === "audio" ? "video" : uploadType;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
    uploadUrl,
  };
}
