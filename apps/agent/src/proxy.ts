import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public assets
  if (pathname.startsWith("/_next") || pathname.includes(".") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirect to local agent login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role as string | undefined;

  // Enforce AGENT or ADMIN role for the entire agent app
  if (role !== "AGENT" && role !== "ADMIN") {
    // If signed in as something else, still redirect to agent login for re-auth or show error
    return NextResponse.redirect(new URL("/login?error=Unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login (The login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ],
};
