import { NextResponse } from "next/server";

import { getStoredRefreshToken,refreshAuthSession } from "@/server/refresh";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const refreshToken = body?.refreshToken || (await getStoredRefreshToken());

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token provided" },
        { status: 401 }
      );
    }

    if (refreshToken === "guest_mock_token" || refreshToken === "google_mock_token") {
      return NextResponse.json({
        data: {
          tokens: {
            accessToken: refreshToken,
            refreshToken: refreshToken,
            role: "ADMIN",
          },
          user: {
            id: refreshToken === "guest_mock_token" ? "guest-id" : "google-id",
            name: refreshToken === "guest_mock_token" ? "Guest Atelier" : "Google Admin",
            email: refreshToken === "guest_mock_token" ? "guest@rumahjahit.id" : "admin@rumahjahit.id",
            role: "ADMIN",
          },
        },
      });
    }

    const result = await refreshAuthSession(refreshToken);
    if (!result.ok) {
      return NextResponse.json(
        { message: "Failed to refresh auth session" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      data: {
        tokens: result.tokens,
        user: result.user,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat memproses refresh session";
    return NextResponse.json({ message }, { status: 500 });
  }
}
