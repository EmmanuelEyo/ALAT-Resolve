import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public assets
  if (pathname.startsWith("/_next") || pathname.includes(".") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Verify token using shared secret
  // Note: getToken will look for the session cookie. Since both apps are now on the same domain,
  // the cookie set by the web app will be visible here.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || "http://localhost:3000";

  if (!token) {
    // Redirect to web app's agent login
    // We use the absolute URL for the login page to be safe
    return NextResponse.redirect(`${AUTH_BASE}/agent-login`);
  }

  const role = token.role as string | undefined;

  // Enforce AGENT or ADMIN role for the entire agent app
  if (role !== "AGENT" && role !== "ADMIN") {
    // If signed in as something else, still redirect to agent login for re-auth or show error
    return NextResponse.redirect(`${AUTH_BASE}/agent-login?error=Unauthorized`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
