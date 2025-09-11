"use client";

import Link from "next/link";
import { ReactNode } from "react";

const Footer = ({ children }: { children?: ReactNode }) => {
  return (
    <footer className="md:hidden w-full h-10 flex items-center justify-evenly bg-card">
      <Link href="/">홈</Link>
      <a href="/dotmap">닷맵</a>
      {children}
    </footer>
  );
};

export default Footer;
