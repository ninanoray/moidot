"use client";

import { HomeSidebar } from "@/app/(home)/components/sidebar/homeSidebar";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();

  if (currentPath.startsWith("login"))
    return (
      <SidebarProvider className="min-h-dvh">
        <HomeSidebar />
        <SidebarInset>
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </SidebarProvider>
    );
  else return <>{children}</>;
};

export default SidebarWrapper;
