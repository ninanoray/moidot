"use client";

import Link from "next/link";

const FooterNavigation = () => {
  return (
    <div className="md:sr-only relative bottom-0 shrink-0 w-full h-10 flex items-center justify-evenly bg-card">
      <Link href="/">홈</Link>
      <Link href="/dotmap">닷맵</Link>
    </div>
  );
};

export default FooterNavigation;
