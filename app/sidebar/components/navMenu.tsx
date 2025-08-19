"use client";

import { Session } from "next-auth";
import { JSX } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/animate-ui/radix/sidebar";

interface NavMenuProps {
  user: Session["user"] | undefined;
  menu: {
    name: string;
    url: string;
    icon: JSX.Element;
  }[];
}

export function NavMenu({ user, menu }: NavMenuProps) {
  const publicMenu = ["닷맵"];
  const hasAuth = (menu: string) => (!!user ? true : publicMenu.includes(menu));

  return (
    <SidebarGroup
      onClick={(e) => {
        e.stopPropagation(); // 중복 클릭 방지
      }}
    >
      <SidebarGroupLabel>메뉴</SidebarGroupLabel>
      <SidebarMenu>
        {menu.map((item) => {
          if (hasAuth(item.name))
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
