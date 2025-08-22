import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PublicPages } from "./constants";

export async function middleware(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-current-path", request.nextUrl.pathname); // SSR 환경에서 pathname 가져오기

  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 1. 로그인 페이지 접근
  if (pathname.startsWith("/login")) {
    if (token) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next({ headers: reqHeaders });
  }
  // 2. 퍼블릭 페이지는 로그인 없어도 허용
  if (PublicPages.includes(pathname)) {
    return NextResponse.next({ headers: reqHeaders });
  }
  // 3. 그 외 모든 페이지 → 로그인 필요
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next({ headers: reqHeaders });
}

export const config = {
  matcher: [
    "/((?!api|error/*|_next/static|_next/image|favicon.ico|image|assets|manifest|sitemap|robots.*\\.txt).*)",
  ],
};
