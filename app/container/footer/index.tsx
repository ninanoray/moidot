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
        "shrink-0 w-full h-fit flex items-center justify-evenly bg-background text-[10px] text-foreground/65 font-light [&_svg]:size-5 [&_svg]:stroke-1 [&>*]:p-1 [&>*]:sab",
        className
      )}
    >
      <Link href="/" className="flex-center flex-col gap-px">
        <Home />홈
      </Link>
      {Menu[0].pages.map((page) => {
        return (
          <a
            key={page.title}
            href={page.url}
            className="flex-center flex-col gap-px"
          >
            {page.icon}
            {page.title}
          </a>
        );
      })}
      <NavUser>
        <div className="flex-center flex-col gap-px">
          <UserCircle2 />
          사용자
        </div>
      </NavUser>
    </footer>
  );
};

export default Footer;
