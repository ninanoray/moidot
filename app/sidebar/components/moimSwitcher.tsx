"use client";

import { ChevronsUpDown, Icon, IconNode, LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
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

export function MoimSwitcher({
  moims,
}: {
  moims: {
    name: string;
    icon?: LucideIcon;
    iconNode?: IconNode;
    count: number;
  }[];
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const [activeMoim, setActiveMoim] = React.useState(moims[0]);

  if (!activeMoim) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeMoim.icon ? (
                  <activeMoim.icon className="size-4" />
                ) : (
                  activeMoim.iconNode && (
                    <Icon iconNode={activeMoim.iconNode} className="size-4" />
                  )
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeMoim.name}</span>
                <span className="truncate text-xs">{activeMoim.count}명</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
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
                  router.push("/");
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {moim.icon ? (
                    <moim.icon className="size-3.5 shrink-0" />
                  ) : (
                    moim.iconNode && (
                      <Icon
                        iconNode={moim.iconNode}
                        className="size-3.5 shrink-0"
                      />
                    )
                  )}
                </div>
                {moim.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">모임 추가</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
