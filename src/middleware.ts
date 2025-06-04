import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/auth/sign-in",
  "/auth/login-password",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/self-change-password",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("id_token")?.value;

  const currentPath = request.nextUrl.pathname;
  const isPublic = publicRoutes.includes(currentPath);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (token && currentPath === "/auth/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
