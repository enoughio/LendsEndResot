import { NextResponse } from "next/server";
import crypto from "node:crypto";
import prisma from "@/lib/prisma";

const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_OTP_COOKIE = "admin_otp_token";
const OTP_TTL_SECONDS = 10 * 60;
const SESSION_TTL_SECONDS = 12 * 60 * 60;

type SignedPayload = {
  email: string;
  role: "ADMIN";
  exp: number;
  otp?: string;
};

function getAuthSecret() {
  return process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_API_KEY || "dev-admin-secret";
}

function signPayload(payload: SignedPayload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getAuthSecret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyPayload(token: string | undefined | null): SignedPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = crypto.createHmac("sha256", getAuthSecret()).update(encoded).digest("base64url");
  if (expected !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SignedPayload;
    if (!payload?.email || payload?.role !== "ADMIN" || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createOtpToken(email: string, otp: string) {
  return signPayload({
    email,
    otp,
    role: "ADMIN",
    exp: Date.now() + OTP_TTL_SECONDS * 1000,
  });
}

export function createAdminSessionToken(email: string) {
  return signPayload({
    email,
    role: "ADMIN",
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  });
}

export function verifyOtpToken(token: string | undefined | null, email: string, otp: string) {
  const payload = verifyPayload(token);
  return Boolean(payload && payload.email === email && payload.otp === otp);
}

export function verifyAdminSessionToken(token: string | undefined | null) {
  return verifyPayload(token);
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export function getAdminOtpCookieName() {
  return ADMIN_OTP_COOKIE;
}

export function getOtpTtlSeconds() {
  return OTP_TTL_SECONDS;
}

export function getSessionTtlSeconds() {
  return SESSION_TTL_SECONDS;
}

export async function isAdminEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email, role: "ADMIN" },
    select: { id: true },
  });
  return Boolean(user);
}

export function ensureAdmin(request: Request): NextResponse | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionPair = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const sessionToken = sessionPair ? decodeURIComponent(sessionPair.split("=").slice(1).join("=")) : null;

  if (verifyAdminSessionToken(sessionToken)) {
    return null;
  }

  const configuredKey = process.env.ADMIN_API_KEY;

  // If no key is configured, keep routes usable in local development.
  if (!configuredKey) return null;

  const requestKey = request.headers.get("x-admin-key");
  if (!requestKey || requestKey !== configuredKey) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Admin access required." } },
      { status: 403 }
    );
  }

  return null;
}
