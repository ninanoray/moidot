"use client";

import Link from "next/link";

const FooterNavigation = () => {
  return (
    <div className="md:sr-only relative bottom-0 shrink-0 w-full h-10 flex items-center justify-evenly bg-card">
      <Link href="/">홈</Link>
      <a href="/dotmap">닷맵</a>
    </div>
  );
};

export default FooterNavigation;
