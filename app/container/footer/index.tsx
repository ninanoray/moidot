"use client";

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
        "mobile fixed bottom-0 z-10 w-full h-13 px-3 flex items-center justify-between bg-background/30 backdrop-blur-md text-[10px] text-foreground/65 font-light [&_svg]:size-5 [&_svg]:stroke-1",
        className
      )}
    >
      {menu.map((page) => {
        return (
          <a
            key={page.title}
            href={page.url}
            className="mx-1 size-full flex-center flex-col gap-px rounded-full active:scale-90 active:bg-foreground/10 transition-all duration-200"
          >
            {page.icon}
            {page.title}
          </a>
        );
      })}
      <NavUser>
        <div className="mx-1 size-full rounded-full flex-center flex-col gap-px">
          <UserCircle2 />
          사용자
        </div>
      </NavUser>
    </footer>
  );
};

export default Footer;
