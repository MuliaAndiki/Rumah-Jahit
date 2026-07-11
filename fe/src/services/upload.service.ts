import type { CloudinarySignedUploadConfig, CloudinaryUploadType } from "@/lib/cloudinary/sign-upload";

export interface UploadedCloudinaryFile {
  imageUrl: string;
  cloudinaryPublicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

class UploadService {
  /**
   * Mengunggah file langsung dari browser (Frontend) ke Cloudinary
   * setelah meminta konfigurasi tanda tangan (signature) dari /api/upload-sign.
   */
  public async uploadDirectToCloudinary(
    file: File,
    type: CloudinaryUploadType = "image"
  ): Promise<UploadedCloudinaryFile> {
    const res = await fetch("/api/upload-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson?.message || "Gagal mengambil konfigurasi tanda tangan unggahan Cloudinary.");
    }

    const config: CloudinarySignedUploadConfig = await res.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", config.apiKey);
    formData.append("timestamp", String(config.timestamp));
    formData.append("signature", config.signature);
    formData.append("folder", config.folder);

    const uploadRes = await fetch(config.uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      const errJson = await uploadRes.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || "Gagal mengunggah file langsung ke Cloudinary.");
    }

    const data = await uploadRes.json();

    return {
      imageUrl: data.secure_url || data.url,
      cloudinaryPublicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
    };
  }
}

export default new UploadService();
