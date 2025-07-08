import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname); // SSR 환경에서 pathname 가져오기

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("next-auth.session-token")?.value; // session ID

  const currentPath = request.nextUrl.pathname;
  const url = request.nextUrl.clone();

  if (currentPath.startsWith("/login")) {
    // 로그인 상태인데 로그인 페이지 진입시 홈으로 리다이렉트
    if (sessionId) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    // 로그아웃 상태인데 다른 페이지 진입시 로그인 페이지로 리다이렉트
    if (!sessionId) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|image|assets|manifest).*)",
  ],
};
