import { SidebarProvider } from "@/components/ui/sidebar";
import { Home } from "./components/home";

const home = () => {
  return (
    <SidebarProvider>
      <Home />
    </SidebarProvider>
  );
};

export default home;
