import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getAdminSessionCookieName())?.value;
  const payload = verifyAdminSessionToken(token);

  if (!payload) {
    return NextResponse.json({ data: { authenticated: false } }, { status: 200 });
  }

  return NextResponse.json({
    data: {
      authenticated: true,
      email: payload.email,
      role: payload.role,
    },
  });
}
