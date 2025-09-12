"use client";

import Ripple from "@/components/animate-ui/effects/motion-ripple";
import { Menu, PageRoutesItem } from "@/constants/pageRoutes";
import { cn } from "@/lib/utils";
import { Home, UserCircle2 } from "lucide-react";
import { NavUser } from "../navUser";

interface FooterProps {
  className?: string | undefined;
}
const Footer = ({ className }: FooterProps) => {
  const pageRouteHome = { title: "홈", url: "/", icon: <Home /> };
  const menu = [pageRouteHome, ...Menu[0].pages] as PageRoutesItem[];

  return (
    <footer
      className={cn(
        "mobile fixed bottom-0 w-full h-13 px-3 flex items-center justify-between bg-background/30 backdrop-blur-md text-[10px] text-foreground/65 font-light [&_svg]:size-5 [&_svg]:stroke-1",
        className
      )}
    >
      {menu.map((page) => {
        return (
          <Ripple
            key={page.title}
            className="mx-2 flex-1 rounded-full active:scale-90 transition-transform duration-200"
          >
            <a href={page.url} className="flex-center flex-col gap-px">
              {page.icon}
              {page.title}
            </a>
          </Ripple>
        );
      })}
      <NavUser>
        <Ripple className="mx-2 flex-1 rounded-full active:scale-90 transition-transform duration-200">
          <div className="flex-center flex-col gap-px">
            <UserCircle2 />
            사용자
          </div>
        </Ripple>
      </NavUser>
    </footer>
  );
};

export default Footer;
