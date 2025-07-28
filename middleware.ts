import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-current-path", request.nextUrl.pathname); // SSR 환경에서 pathname 가져오기

  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next({ headers: reqHeaders });
}

export const config = {
  matcher: [
    "/((?!api|error/*|_next/static|_next/image|favicon.ico|image|assets|manifest).*)",
  ],
};
