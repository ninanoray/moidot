"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../animate-ui/radix/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../animate-ui/radix/sidebar";

export function NavDule({
  dules,
}: {
  dules: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    dots?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>줄</SidebarGroupLabel>
      <SidebarMenu>
        {dules.map((dule) => (
          <Collapsible
            key={dule.title}
            asChild
            defaultOpen={dule.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={dule.title}>
                  {dule.icon && <dule.icon />}
                  <span>{dule.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {dule.dots?.map((dot) => (
                    <SidebarMenuSubItem key={dot.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={dot.url}>
                          <span>{dot.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
