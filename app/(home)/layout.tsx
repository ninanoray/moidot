import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeSidebar } from "./components/homeSidebar";

export default function home({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <HomeSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
