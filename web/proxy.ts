import { NextRequest, NextResponse } from "next/server"
import { loginRedirectUrl } from "./lib/constants";

export async function proxy(req: NextRequest) {
  const parts = req.nextUrl.pathname.split('/').filter(Boolean);

  if (parts[0] !== 'dashboard') return NextResponse.next();

  const id = parts[1] ?? null;
  // Later on, if there are more rescourses past dashboard/id/foorbar
  // You can access foobar with parts[2], parts[n]

  const cookieHeader = req.headers.get("cookie") ?? "";
  if (!cookieHeader) return NextResponse.redirect(new URL(loginRedirectUrl, req.url));

  // Build absolute URL using forwarded headers from Nginx
  const xfProto = req.headers.get("x-forwarded-proto") || "http";
  const xfHost = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const origin = `${xfProto}://${xfHost}`;
  const url = new URL("/api/valSession", origin);

  const sessionRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader
    },
    body: JSON.stringify({ id }),
    cache: "no-store",
  })

  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL(loginRedirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };

