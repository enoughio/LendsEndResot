import { NextResponse } from "next/server";

export function ensureAdmin(request: Request): NextResponse | null {
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
