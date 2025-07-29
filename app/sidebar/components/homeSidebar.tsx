"use client";

import { MoimSwitcher } from "@/app/sidebar/components/moimSwitcher";
import { NavDule } from "@/app/sidebar/components/navDule";
import { NavMenu } from "@/app/sidebar/components/navMenu";
import { NavUser } from "@/app/sidebar/components/navUser";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../../../components/animate-ui/radix/sidebar";
import ThemeSwitch from "../../../components/theme/themeSwitch";

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
        url: "/dotmap",
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

  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="select-none" {...props}>
      <SidebarHeader>
        <MoimSwitcher moims={data.moims} />
      </SidebarHeader>
      <SidebarContent onClick={toggleSidebar}>
        <NavDule dules={data.navDule} />
        <NavMenu menu={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitch className="mx-2 group-data-[collapsible=icon]:m-0!" />
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
