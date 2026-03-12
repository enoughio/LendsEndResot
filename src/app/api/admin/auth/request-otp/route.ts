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

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://landsend.bharatstorytellers.com"
  ).replace(/\/$/, "");
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
    const baseUrl = getBaseUrl();
    const logoUrl = `${baseUrl}/landsend.svg`;
    const termsUrl = `${baseUrl}/terms-and-conditions`;
    const privacyUrl = `${baseUrl}/privacy-policy`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Land's End Resort at Sumiran <${fromEmail}>`,
      replyTo: "landsend.sumiran@gmail.com",
      to: email,
      subject: "Your Admin Login OTP | Land's End Resort",
      text: `Admin sign-in verification code

Your OTP: ${otp}
This OTP expires in 10 minutes.

If you did not request this code, please ignore this email.

Land's End Resort at Sumiran
Support: landsend.sumiran@gmail.com | +91 8871317382
Terms: ${termsUrl}
Privacy: ${privacyUrl}`,
      html: `
        <div style="margin:0;padding:0;background:#f3f7f5;font-family:Arial,sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #d7e4dd;border-radius:14px;overflow:hidden;">
                  <tr>
                    <td style="padding:20px 24px;background:linear-gradient(135deg,#14532d 0%,#166534 100%);color:#ffffff;">
                      <img src="${logoUrl}" alt="Land's End Resort" width="120" style="display:block;height:auto;max-width:120px;margin-bottom:12px;" />
                      <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">Admin Authentication</p>
                      <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:700;">Your one-time passcode</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;">
                      <p style="margin:0 0 10px 0;font-size:14px;color:#334155;">Use this OTP to continue admin sign-in:</p>
                      <p style="margin:0 0 12px 0;padding:12px 16px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;font-size:28px;letter-spacing:0.18em;font-weight:700;color:#0f172a;text-align:center;">${otp}</p>
                      <p style="margin:0 0 14px 0;font-size:13px;color:#475569;">This code expires in 10 minutes.</p>
                      <p style="margin:0 0 12px 0;font-size:12px;color:#64748b;">If you did not request this code, you can safely ignore this email.</p>
                      <p style="margin:0;font-size:12px;color:#64748b;line-height:1.7;">
                        Support: landsend.sumiran@gmail.com | +91 8871317382<br />
                        <a href="${termsUrl}" style="color:#166534;text-decoration:none;">Terms &amp; Conditions</a> |
                        <a href="${privacyUrl}" style="color:#166534;text-decoration:none;"> Privacy Policy</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
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
