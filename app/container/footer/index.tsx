"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface FooterProps {
  className?: string | undefined;
  children?: ReactNode;
}
const Footer = ({ className, children }: FooterProps) => {
  return (
    <footer
      className={cn(
        "shrink-0 md:hidden w-full h-10 flex items-center justify-evenly bg-card",
        className
      )}
    >
      <Link href="/">홈</Link>
      <a href="/dotmap">닷맵</a>
      {children}
    </footer>
  );
};

export default Footer;
