import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  createOtpToken,
  getAdminOtpCookieName,
  getOtpTtlSeconds,
  isAdminEmail,
} from "@/lib/admin-auth";

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Email is required." } },
        { status: 400 }
      );
    }

    const isAllowed = await isAdminEmail(email);
    if (!isAllowed) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Admin account not found." } },
        { status: 403 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const fromEmail = process.env.SMTP_FROM || user;

    if (!host || !user || !pass || !fromEmail) {
      return NextResponse.json(
        { error: { code: "CONFIG_ERROR", message: "Email service is not configured." } },
        { status: 500 }
      );
    }

    const otp = generateOtp();
    const otpToken = createOtpToken(email, otp);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: "Admin login OTP",
      text: `Your admin login OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your admin login OTP is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p>`,
    });

    const response = NextResponse.json({ data: { sent: true } });
    response.cookies.set({
      name: getAdminOtpCookieName(),
      value: otpToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getOtpTtlSeconds(),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/auth/request-otp failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to send OTP." } },
      { status: 500 }
    );
  }
}
