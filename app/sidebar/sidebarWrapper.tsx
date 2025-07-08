"use server";

import { HomeSidebar } from "@/components/sidebar/homeSidebar";
import { getServerSession } from "next-auth/next";
import { cookies, headers } from "next/headers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");

  if (pathname && !pathname.startsWith("/login")) {
    // 쿠키에서 사이드바 열림/닫힘 상태 가져오기
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    // SSR 환경에서 NextAuth Session 정보 가져오기
    const session = await getServerSession(authOptions);

    return (
      <SidebarProvider defaultOpen={defaultOpen} className="min-h-dvh">
        <HomeSidebar session={session} />
        <SidebarInset>
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </SidebarProvider>
    );
  } else {
    return <>{children}</>;
  }
}
