import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");
  const isAllowedOrigin = origin === "http://localhost:3001";

  // 1. Handle preflight early for allowed origins
  if (isAllowedOrigin && pathname.startsWith("/api/auth/session") && req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  // 2. Public / Pass-through routes (with CORS injection for session)
  const isPublicAsset = pathname.startsWith("/_next") || pathname.includes(".") || pathname === "/favicon.ico" || pathname === "/next.svg" || pathname === "/vercel.svg";
  const isAuthRoute = pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/signup" || pathname === "/agent-login" || pathname === "/";

  if (isPublicAsset || isAuthRoute) {
    const response = NextResponse.next();
    if (isAllowedOrigin && pathname.startsWith("/api/auth/session")) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return response;
  }

  // 3. Protected routes: Verify token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Determine where to redirect based on path
    const loginUrl = pathname.startsWith("/agent") 
      ? new URL("/agent-login", req.url)
      : new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string | undefined;

  // 4. Role-based restrictions
  
  // Customer dashboard only for USER/ADMIN
  if (pathname.startsWith("/dashboard")) {
    if (role !== "USER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Agent dashboard area (if any exists in web app)
  if (pathname.startsWith("/agent")) {
    if (role !== "AGENT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/agent/:path*", 
    "/api/auth/session",
    "/((?!api|_next|static|login|signup|agent-login|favicon.ico).*)",
  ],
};