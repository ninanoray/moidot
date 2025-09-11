"use client";

import { Menu } from "@/constants/pageRoutes";
import { cn } from "@/lib/utils";
import { Home, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { NavUser } from "../navUser";

interface FooterProps {
  className?: string | undefined;
}
const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "shrink-0 md:hidden w-full h-10 p-1 sab flex items-center justify-evenly bg-background text-foreground/50 [&_svg]:size-5",
        className
      )}
    >
      <Link href="/" className="text-xs flex-center flex-col">
        <Home />홈
      </Link>
      {Menu[0].pages.map((page) => {
        return (
          <a
            key={page.title}
            href={page.url}
            className="text-xs flex-center flex-col gap-px"
          >
            {page.icon}
            {page.title}
          </a>
        );
      })}
      <NavUser>
        <div className="text-xs flex-center flex-col gap-px">
          <UserCircle2 />
          사용자
        </div>
      </NavUser>
    </footer>
  );
};

export default Footer;
