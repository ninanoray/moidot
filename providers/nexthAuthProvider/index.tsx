"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const NextAuthProvider = ({ children }: Props) => {
  const currentPath = usePathname();

  if (!currentPath.startsWith("/login"))
    return <SessionProvider>{children}</SessionProvider>;
  else return <>{children}</>;
};

export default NextAuthProvider;
