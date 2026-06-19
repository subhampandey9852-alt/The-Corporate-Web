import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard routes
  if (pathname === "/admin/dashboard" || pathname.startsWith("/admin/dashboard/")) {
    // Redirect to login page if no token exists
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
