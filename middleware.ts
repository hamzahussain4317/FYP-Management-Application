import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/supervisor") && role !== "supervisor") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/supervisor/:path*"],
};
