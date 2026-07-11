import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";

// Ensure env variables are loaded from src/.env or root .env if not yet loaded
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "rumahjahit_cloud",
  api_key: process.env.CLOUDINARY_API_KEY || "123456789012345",
  api_secret: process.env.CLOUDINARY_API_SECRET || "dummy_secret_key",
});

/**
 * Deletes an image from Cloudinary using its public ID.
 * @param cloudinaryPublicId - The public ID of the image stored in Cloudinary
 * @returns Promise<boolean> indicating whether deletion succeeded or was handled gracefully
 */
export async function deleteFromCloudinary(cloudinaryPublicId?: string | null): Promise<boolean> {
  if (!cloudinaryPublicId) {
    console.warn("[Cloudinary] No cloudinaryPublicId provided for deletion.");
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(cloudinaryPublicId);
    console.log(`[Cloudinary] Destroy result for "${cloudinaryPublicId}":`, result);
    // Cloudinary uploader.destroy returns { result: 'ok' | 'not found' | ... }
    return result.result === "ok" || result.result === "not found";
  } catch (error) {
    console.error(`[Cloudinary] Failed to destroy image "${cloudinaryPublicId}":`, error);
    // Return false, but callers can still proceed or handle error depending on requirements
    return false;
  }
}

export default cloudinary;
