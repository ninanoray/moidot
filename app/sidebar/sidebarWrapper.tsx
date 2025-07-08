"use server";

import { HomeSidebar } from "@/components/sidebar/homeSidebar";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
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
  const fullUrl = headersList.get("x-current-path");

  if (fullUrl && !fullUrl.startsWith("/login")) {
    const session = await getServerSession(authOptions);

    return (
      <SidebarProvider className="min-h-dvh">
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
