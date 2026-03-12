import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getAdminOtpCookieName,
  getAdminSessionCookieName,
  getSessionTtlSeconds,
  verifyOtpToken,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const otp = String(body?.otp || "").trim();

    if (!email || !otp) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Email and OTP are required." } },
        { status: 400 }
      );
    }

    const otpToken = request.cookies.get(getAdminOtpCookieName())?.value;
    const valid = verifyOtpToken(otpToken, email, otp);

    if (!valid) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Invalid or expired OTP." } },
        { status: 403 }
      );
    }

    const sessionToken = createAdminSessionToken(email);
    const response = NextResponse.json({ data: { authenticated: true, email } });

    response.cookies.set({
      name: getAdminSessionCookieName(),
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getSessionTtlSeconds(),
      path: "/",
    });

    response.cookies.set({
      name: getAdminOtpCookieName(),
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/auth/verify-otp failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to verify OTP." } },
      { status: 500 }
    );
  }
}
