import { NextResponse } from "next/server";
import {
  getCloudinarySignedUploadConfig,
  type CloudinaryUploadType,
} from "@/lib/cloudinary/sign-upload";

export const runtime = "nodejs";

function parseUploadType(searchParams: URLSearchParams): CloudinaryUploadType {
  return searchParams.get("type") === "audio" ? "audio" : "image";
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          message:
            "Unggah file langsung ke Cloudinary dari browser. File tidak boleh dikirim ke server Vercel.",
        },
        { status: 413 }
      );
    }

    const { searchParams } = new URL(request.url);
    const body = (await request.json().catch(() => ({}))) as {
      type?: unknown;
    };
    const uploadType =
      body.type === "audio" || body.type === "image"
        ? body.type
        : parseUploadType(searchParams);

    const config = getCloudinarySignedUploadConfig(uploadType);

    return NextResponse.json(config);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat menyiapkan unggahan";

    return NextResponse.json({ message }, { status: 500 });
  }
}
