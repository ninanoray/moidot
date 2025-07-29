"use client";

import { JSX } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/animate-ui/radix/sidebar";

export function NavMenu({
  menu,
}: {
  menu: {
    name: string;
    url: string;
    icon: JSX.Element;
  }[];
}) {
  return (
    <SidebarGroup
      onClick={(e) => {
        e.stopPropagation(); // 중복 클릭 방지
      }}
    >
      <SidebarGroupLabel>메뉴</SidebarGroupLabel>
      <SidebarMenu>
        {menu.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <a href={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
