import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { HomeSidebar } from "@/app/sidebar/components/homeSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/animate-ui/radix/sidebar";
import { getServerSession } from "next-auth/next";
import { cookies, headers } from "next/headers";

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
      <SidebarProvider defaultOpen={defaultOpen} className="mscreen">
        <HomeSidebar session={session} />
        <SidebarInset>
          {/* <SidebarTrigger className="absolute z-1" /> */}
          {children}
        </SidebarInset>
      </SidebarProvider>
    );
  } else {
    return <>{children}</>;
  }
}
