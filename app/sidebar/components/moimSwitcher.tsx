"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/animate-ui/radix/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../components/animate-ui/radix/sidebar";

interface MoimSwitcherProps {
  user: Session["user"] | undefined;
  moims: {
    name: string;
    icon: JSX.Element;
    count: number;
  }[];
}

export function MoimSwitcher({ user, moims }: MoimSwitcherProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const router = useRouter();

  const [activeMoim, setActiveMoim] = React.useState(moims[0]);

  if (!activeMoim) {
    return null;
  }

  if (!user)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            tooltip="홈"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <div
              className="relative shrink-0 border-2 aspect-square size-8 rounded-md overflow-hidden"
              onClick={() => {
                setOpenMobile(false);
                router.push("/");
              }}
            >
              <Image
                src="/images/moidot/logo.png"
                alt="icon"
                priority
                fill
                sizes="20vw"
                className="object-contain mobile"
              />
            </div>
            <Link href="/" className="font-semibold whitespace-nowrap">
              모이닷
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip="홈"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div
            onClick={() => {
              setOpenMobile(false);
              router.push("/");
            }}
            className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer [&>*]:size-4 hover:[&>*]:animate-jello"
          >
            {activeMoim.icon}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex-1 flex items-center">
                <div className="grid text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeMoim.name}
                  </span>
                  <span className="truncate text-xs">{activeMoim.count}명</span>
                </div>
                <ChevronsUpDown className="size-4 ml-auto" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                모임
              </DropdownMenuLabel>
              {moims.map((moim) => (
                <DropdownMenuItem
                  key={moim.name}
                  onClick={() => {
                    setActiveMoim(moim);
                    setOpenMobile(false);
                    router.push("/");
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border [&>*]:size-4">
                    {moim.icon}
                  </div>
                  {moim.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  모임 추가
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
