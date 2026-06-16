import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the homepage itself to avoid redirect loops
  if (pathname === "/") return NextResponse.next();

  // Allow API routes to keep working
  if (pathname.startsWith("/api/")) return NextResponse.next();

  // Allow Next.js internal assets (_next, favicon, etc.)
  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/public/")
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the custom homepage
  return NextResponse.redirect(new URL("/", request.url));
}

// Apply to all routes except static files and Next.js internals
export const config = {
  matcher: "/((?!_next|api|favicon\\.ico|images|public).*)",
};
