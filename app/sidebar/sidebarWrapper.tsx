import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { HomeSidebar } from "@/app/sidebar/components/homeSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/animate-ui/radix/sidebar";
import { getServerSession } from "next-auth/next";
import { cookies, headers } from "next/headers";
import FooterNavigation from "./components/footerNavigation";

export async function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") ?? "/";

  // 쿠키에서 사이드바 상태 가져오기
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // 세션 가져오기
  const session = await getServerSession(authOptions);

  // 로그인 페이지에서는 SidebarWrapper 감싸지 않음
  // if (pathname.startsWith("/login")) return <>{children}</>;
  if (!session)
    return (
      <div className="flex size-full mscreen p-0">
        <div className="flex-1 flex flex-col">
          {children}
          {!pathname.startsWith("/login") && <FooterNavigation />}
        </div>
      </div>
    );

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      disableSwipe={true}
      className="mscreen"
    >
      <HomeSidebar session={session} />
      <SidebarInset>
        {children}
        <FooterNavigation>
          <SidebarTrigger />
        </FooterNavigation>
      </SidebarInset>
    </SidebarProvider>
  );
}
