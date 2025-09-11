"use server";

import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import LayoutContainerProvider from "./layoutContainerProvider";

const LayoutContainer = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") ?? "/";

  const disabled = pathname.startsWith("/login");

  const session = await getServerSession(authOptions);

  return (
    <LayoutContainerProvider session={session} disableHeadernFooter={disabled}>
      {children}
    </LayoutContainerProvider>
  );
};

export default LayoutContainer;
