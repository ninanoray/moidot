"use client";

import { MoimSwitcher } from "@/components/sidebar/moimSwitcher";
import { NavDule } from "@/components/sidebar/navDule";
import { NavProjects } from "@/components/sidebar/navMenu";
import { NavUser } from "@/components/sidebar/navUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cowHead } from "@lucide/lab";
import {
  BookOpen,
  Map,
  MapPin,
  Settings,
  SquareTerminal,
  User2,
} from "lucide-react";
import { Session } from "next-auth";
import * as React from "react";
import ThemeSwitch from "../theme/themeSwitch";

interface Props extends React.ComponentProps<typeof Sidebar> {
  session: Session | null;
}

export function HomeSidebar({ session, ...props }: Props) {
  // This is sample data.
  const data = {
    moims: [
      {
        name: "서초구 모임",
        icon: MapPin,
        count: 20,
      },
      {
        name: "97년생 모임",
        iconNode: cowHead,
        count: 10,
      },
    ],
    navDule: [
      {
        title: "첫번째 줄",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        dots: [
          {
            title: "첫번째 닷",
            url: "#",
          },
          {
            title: "두번째 닷",
            url: "#",
          },
          {
            title: "세번째 닷",
            url: "#",
          },
        ],
      },
      {
        title: "두번째 줄",
        url: "#",
        icon: BookOpen,
        dots: [
          {
            title: "첫번째 닷",
            url: "#",
          },
          {
            title: "두번째 닷",
            url: "#",
          },
        ],
      },
    ],
    menu: [
      {
        name: "닷맵",
        url: "#",
        icon: Map,
      },
      {
        name: "마이닷",
        url: "#",
        icon: User2,
      },
      {
        name: "설정",
        url: "#",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" className="select-none" {...props}>
      <SidebarHeader>
        <MoimSwitcher moims={data.moims} />
      </SidebarHeader>
      <SidebarContent>
        <NavDule dules={data.navDule} />
        <NavProjects menu={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitch className="mx-2 group-data-[collapsible=icon]:m-0!" />
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
