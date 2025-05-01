import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("user");

  const protectedPaths = ["/blogs", "/article"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/blogs/:path*", "/article/:path*"],
};
