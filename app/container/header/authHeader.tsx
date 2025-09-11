"use client";

import { Menu } from "@/constants/pageRoutes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLayoutContainer } from "../layoutContainerProvider";
import { NavUser } from "./navUser";

const AuthHeader = () => {
  const { scrollY } = useLayoutContainer();

  const router = useRouter();

  return (
    <div className="px-3 flex justify-between items-center">
      <h1
        onClick={() => router.push("/")}
        className={cn(
          scrollY > 0 ? "text-primary-foreground dark:text-card-foreground" : ""
        )}
      >
        MOIDOT
      </h1>
      <nav className="flex-center gap-10">
        <ol className="flex gap-4">
          {Menu[0].pages.map((page) => {
            return (
              <li key={page.title}>
                <a href={page.url}>{page.title}</a>
              </li>
            );
          })}
        </ol>
        <NavUser />
      </nav>
    </div>
  );
};

export default AuthHeader;
